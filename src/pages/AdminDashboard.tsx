
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExcelExporter from '@/components/admin/ExcelExporter';
import AdminGuide from '@/components/admin/AdminGuide';
import { Download, HelpCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <MainLayout title="Admin Dashboard">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-meant-800">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage bookings, events, and customer inquiries</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-2 md:mt-0 flex gap-2 items-center"
            onClick={() => setShowGuide(!showGuide)}
          >
            <HelpCircle size={18} />
            {showGuide ? "Hide Guide" : "View Guide"}
          </Button>
        </div>
        
        {showGuide && <AdminGuide />}
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="inquiries">Customer Inquiries</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="events">Scheduled Events</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>View and export booking data</CardDescription>
              </CardHeader>
              <CardContent>
                <ExcelExporter 
                  dataType="bookings" 
                  title="Export Bookings to Excel"
                  description="Download all booking data as an Excel file"
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
                <ExcelExporter 
                  dataType="inquiries" 
                  title="Export Inquiries to Excel"
                  description="Download all customer inquiry data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>View and export payment data</CardDescription>
              </CardHeader>
              <CardContent>
                <ExcelExporter 
                  dataType="payments" 
                  title="Export Payments to Excel"
                  description="Download all payment data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Events</CardTitle>
                <CardDescription>View and export scheduled event data</CardDescription>
              </CardHeader>
              <CardContent>
                <ExcelExporter 
                  dataType="events" 
                  title="Export Events to Excel"
                  description="Download all scheduled event data as an Excel file"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webinars">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Management</CardTitle>
                <CardDescription>View and export webinar data</CardDescription>
              </CardHeader>
              <CardContent>
                <ExcelExporter 
                  dataType="webinars" 
                  title="Export Webinars to Excel"
                  description="Download all webinar data as an Excel file"
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
