import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExcelExporter from '@/components/admin/ExcelExporter';
import AdminGuide from '@/components/admin/AdminGuide';
import GoogleSheetBookings from '@/components/admin/GoogleSheetBookings';
import BookingForm from '@/components/admin/BookingForm';
import CustomerForm from '@/components/admin/CustomerForm';
import CustomersListing from '@/components/admin/CustomersListing';
import PaymentForm from '@/components/admin/PaymentForm';
import { Download, HelpCircle, DatabaseIcon, UserPlus, CalendarPlus, CreditCard, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataUpdated = () => {
    // This will trigger a refresh in components that depend on this value
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <MainLayout title="Admin Dashboard">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-meant-800">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage bookings, customers, payments and more using Google Sheets</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              className="flex gap-2 items-center"
              onClick={() => setShowGuide(!showGuide)}
            >
              <HelpCircle size={18} />
              {showGuide ? "Hide Guide" : "View Guide"}
            </Button>
            <Button 
              variant="outline" 
              className="flex gap-2 items-center"
              asChild
            >
              <a
                href="https://docs.google.com/spreadsheets/d/1_ERza0_tr3ZZ3k71QtpMbDmPz3BAsrCOko0TIsFUAHI/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DatabaseIcon size={18} />
                Open Google Sheet
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex gap-2 items-center"
              asChild
            >
              <Link to="/admin">
                <FileText size={18} />
                Admin Panel
              </Link>
            </Button>
          </div>
        </div>
        
        {showGuide && <AdminGuide />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add Customer
              </CardTitle>
              <CardDescription>Create a new customer record</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerForm onCustomerAdded={handleDataUpdated} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5" />
                New Booking
              </CardTitle>
              <CardDescription>Schedule a new booking</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm onBookingAdded={handleDataUpdated} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Record Payment
              </CardTitle>
              <CardDescription>Add a new payment record</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm onPaymentAdded={handleDataUpdated} />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <GoogleSheetBookings key={`bookings-${refreshTrigger}`} />
          </TabsContent>
          
          <TabsContent value="customers">
            <CustomersListing key={`customers-${refreshTrigger}`} />
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>View and export payment data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Payment records from Google Sheets will appear here.</p>
                <ExcelExporter 
                  dataType="payments" 
                  title="Export Payments to Excel"
                  description="Download all payment data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Appointments</CardTitle>
                <CardDescription>View and export scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Appointment records from Google Sheets will appear here.</p>
                <ExcelExporter 
                  dataType="appointments" 
                  title="Export Appointments to Excel"
                  description="Download all appointment data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>View and export customer inquiry data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Customer inquiries from Google Sheets will appear here.</p>
                <ExcelExporter 
                  dataType="inquiries" 
                  title="Export Inquiries to Excel"
                  description="Download all customer inquiry data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Service Plans</CardTitle>
                <CardDescription>View and export service plan data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Service plans from Google Sheets will appear here.</p>
                <ExcelExporter 
                  dataType="plans" 
                  title="Export Plans to Excel"
                  description="Download all service plan data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
