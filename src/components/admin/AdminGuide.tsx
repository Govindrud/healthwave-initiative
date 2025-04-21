
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, FileUp, Filter, BarChart, RefreshCcw } from 'lucide-react';

const AdminGuide: React.FC = () => {
  return (
    <Card className="mb-8 border-meant-100">
      <CardHeader className="bg-meant-50 border-b border-meant-100">
        <CardTitle className="text-meant-800">Excel Database Management Guide</CardTitle>
        <CardDescription>Learn how to manage your website data using Excel</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="export">
          <TabsList className="mb-6">
            <TabsTrigger value="export">Exporting Data</TabsTrigger>
            <TabsTrigger value="import">Importing Data</TabsTrigger>
            <TabsTrigger value="tips">Excel Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-meant-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Exporting Data to Excel</h3>
                  <p className="text-muted-foreground">Follow these steps to export your website data to Excel:</p>
                  <ol className="mt-2 space-y-2 list-decimal list-inside">
                    <li>Select the data type you want to export (Bookings, Inquiries, etc.)</li>
                    <li>Choose the date range (This Week, This Month, or All Data)</li>
                    <li>Click the Export button to download the CSV file</li>
                    <li>Open the CSV file with Excel or Google Sheets</li>
                    <li>Save the file as an Excel workbook (.xlsx) for better formatting</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-meant-50 p-4 rounded-md border border-meant-100 mt-4">
                <h4 className="font-medium mb-2">Pro Tip</h4>
                <p className="text-sm">Create a master Excel workbook with separate sheets for each data type. Copy the exported data into the appropriate sheet to maintain all your records in one file.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="import">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-meant-100 p-2 rounded-full">
                  <FileUp className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Managing Data in Excel</h3>
                  <p className="text-muted-foreground">Here's how to organize and update your data:</p>
                  <ol className="mt-2 space-y-2 list-decimal list-inside">
                    <li>Create a main Excel workbook with separate sheets for each data type</li>
                    <li>Set up columns with appropriate headers that match the exported data</li>
                    <li>Add color coding to highlight important statuses (e.g., pending payments)</li>
                    <li>Add filters to easily sort and find specific records</li>
                    <li>Create a "Notes" column to add any special instructions or information</li>
                  </ol>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Recommended Excel Template Structure:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Bookings Sheet:</strong> ID, Customer Name, Service, Date, Time, Amount, Status, Notes</li>
                      <li><strong>Inquiries Sheet:</strong> ID, Customer Name, Email, Phone, Date, Subject, Message, Responded</li>
                      <li><strong>Payments Sheet:</strong> ID, Booking ID, Customer Name, Date, Amount, Status, Method</li>
                      <li><strong>Events Sheet:</strong> ID, Title, Date, Time, Location, Capacity, Registered, Notes</li>
                      <li><strong>Webinars Sheet:</strong> ID, Title, Date, Time, Host, Registrations, Recording URL</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-5 w-5 text-meant-600" />
                  <h3 className="font-semibold">Using Excel Filters</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click on Data {'>>'} Filter to enable filtering. This allows you to quickly sort and find specific records based on any column value.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="h-5 w-5 text-meant-600" />
                  <h3 className="font-semibold">Creating Dashboards</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use Excel's PivotTables and Charts to create dashboards that show booking trends, payment summaries, and upcoming events at a glance.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCcw className="h-5 w-5 text-meant-600" />
                  <h3 className="font-semibold">Regular Updates</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set a regular schedule (daily or weekly) to export and update your Excel database to ensure you have the latest information.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="h-5 w-5 text-meant-600" />
                  <h3 className="font-semibold">Template Download</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You can create and save Excel templates with predefined columns, formulas, and formatting to streamline your data management process.
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-meant-50 rounded-md border border-meant-100">
              <h4 className="font-medium mb-2">Recommended Excel Functions</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>VLOOKUP:</strong> Connect data between different sheets (e.g., find customer details from bookings)</li>
                <li><strong>COUNTIFS:</strong> Count records that meet specific criteria (e.g., bookings for a particular service)</li>
                <li><strong>SUMIFS:</strong> Sum values that meet specific criteria (e.g., total revenue from a specific time period)</li>
                <li><strong>Conditional Formatting:</strong> Highlight important data (e.g., overdue payments, upcoming events)</li>
                <li><strong>Data Validation:</strong> Create dropdown lists for consistent data entry (e.g., status options)</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminGuide;
