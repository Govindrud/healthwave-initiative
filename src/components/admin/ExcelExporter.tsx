
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import DatabaseService from '@/services/DatabaseService';

// Mock data for demonstration - in a real implementation,
// this would come from your API or local storage
const mockData = {
  bookings: [
    { id: 1, customerName: 'John Doe', service: 'Consultation', date: '2025-05-02', amount: 1500 },
    { id: 2, customerName: 'Jane Smith', service: 'Spiritual Session', date: '2025-05-05', amount: 2000 }
  ],
  inquiries: [
    { id: 1, customerName: 'Robert Johnson', email: 'robert@example.com', subject: 'Program Information', date: '2025-04-20' },
    { id: 2, customerName: 'Sarah Williams', email: 'sarah@example.com', subject: 'Webinar Registration', date: '2025-04-22' }
  ],
  payments: [
    { id: 'pmt_1', customerName: 'John Doe', amount: 1500, status: 'Completed', date: '2025-05-02' },
    { id: 'pmt_2', customerName: 'Jane Smith', amount: 2000, status: 'Completed', date: '2025-05-05' }
  ],
  events: [
    { id: 'evt_1', title: 'Meditation Workshop', date: '2025-06-15', capacity: 20, registered: 12, location: 'Main Center' },
    { id: 'evt_2', title: 'Yoga Retreat', date: '2025-07-10', capacity: 15, registered: 8, location: 'Garden Pavilion' }
  ],
  webinars: [
    { id: 'web_1', title: 'Mental Health Awareness', date: '2025-05-20', registrations: 45, host: 'Dr. Smith' },
    { id: 'web_2', title: 'Stress Management', date: '2025-06-05', registrations: 32, host: 'Dr. Johnson' }
  ],
  // Adding the new data types
  appointments: [
    { id: 'appt_1', customerName: 'John Doe', dateTime: '2025-05-15 10:00 AM', withPerson: 'Dr. Smith', status: 'Scheduled' },
    { id: 'appt_2', customerName: 'Jane Smith', dateTime: '2025-05-17 2:30 PM', withPerson: 'Dr. Johnson', status: 'Done' }
  ],
  plans: [
    { id: 'plan_1', name: 'Basic Plan', price: 999, duration: 1, features: 'Email support, Basic resources', active: 'Yes' },
    { id: 'plan_2', name: 'Premium Plan', price: 2999, duration: 3, features: '24/7 support, Advanced resources, Weekly calls', active: 'Yes' }
  ]
};

interface ExcelExporterProps {
  dataType: 'bookings' | 'inquiries' | 'payments' | 'events' | 'webinars' | 'appointments' | 'plans';
  title: string;
  description?: string;
}

const ExcelExporter: React.FC<ExcelExporterProps> = ({ dataType, title, description }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  // Function to convert JSON to CSV
  const convertToCSV = (objArray: any[]) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // Add headers
    const headers = Object.keys(array[0]);
    str += headers.join(',') + '\r\n';

    // Add values
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ',';
        // Handle commas and quotes in the data
        let value = array[i][index];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        line += value;
      }
      str += line + '\r\n';
    }
    return str;
  };

  // Function to export data to CSV
  const exportToCSV = async () => {
    setIsExporting(true);

    try {
      // In a real implementation, you would fetch data from your API or database
      // For now, we'll use the mock data
      const data = mockData[dataType];
      
      // Convert the data to CSV format
      const csv = convertToCSV(data);
      
      // Create a blob and download link
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set download attributes
      const date = format(new Date(), 'yyyy-MM-dd');
      link.setAttribute('href', url);
      link.setAttribute('download', `${dataType}-${date}.csv`);
      link.style.visibility = 'hidden';
      
      // Append to the document, trigger download, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully', {
        description: `The ${dataType} data has been exported as a CSV file.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', {
        description: 'There was a problem exporting your data.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Format date ranges for filtering options
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-meant-50 rounded-lg border border-meant-100">
        <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FileSpreadsheet className="h-8 w-8 mr-3 text-meant-600" />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
          </div>
          
          <div className="w-full md:w-auto grid grid-cols-1 md:flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => exportToCSV()}
              disabled={isExporting}
            >
              <Calendar className="h-4 w-4" />
              <span>This Week</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => exportToCSV()}
              disabled={isExporting}
            >
              <Calendar className="h-4 w-4" />
              <span>This Month</span>
            </Button>
            
            <Button 
              variant="default" 
              className="flex items-center gap-1 bg-meant-600 hover:bg-meant-700"
              onClick={() => exportToCSV()}
              disabled={isExporting}
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? 'Exporting...' : 'Export All'}</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <p className="text-center text-muted-foreground">
          {mockData[dataType].length} records available for export
        </p>
      </div>
    </div>
  );
};

export default ExcelExporter;
