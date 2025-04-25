import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Calendar, Users, DollarSign, TrendingUp, ArrowRight, LogOut, FileText, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingsDashboard from "@/components/admin/BookingsDashboard";
import SalesDashboard from "@/components/admin/SalesDashboard";
import AppointmentsDashboard from "@/components/admin/AppointmentsDashboard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSheetDB } from "@/hooks/useSheetDB";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("bookings");
  const [stats, setStats] = useState({
    bookings: 0,
    clients: 0,
    revenue: 0,
    appointments: 0
  });
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getRecords } = useSheetDB();
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bookings = await getRecords({ sheet: 'Bookings' });
        const payments = await getRecords({ sheet: 'Payments' });
        
        const uniqueClients = new Set(bookings?.map(b => b.CustomerEmail || b.CustomerName) || []);
        const totalRevenue = payments?.reduce((sum, payment) => sum + (parseFloat(payment.Amount) || 0), 0) || 0;
        
        setStats({
          bookings: bookings?.length || 0,
          clients: uniqueClients.size,
          revenue: totalRevenue,
          appointments: bookings?.filter(b => b.Status?.toLowerCase() === 'scheduled')?.length || 0
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="mr-4 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800">
            MeantToHelp Admin
          </h1>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <a
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Back to Website
            </a>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button variant="ghost" size="sm">
              <span className="sr-only">User menu</span>
              <Users className="h-4 w-4" />
              <span className="ml-2">Admin</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="container px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor bookings, appointments, services, and sales performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bookings}</div>
              <p className="text-xs text-muted-foreground">
                All services combined
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients}</div>
              <p className="text-xs text-muted-foreground">
                Unique customers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all services
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.appointments}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled sessions
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <BookingsDashboard />
          </TabsContent>
          <TabsContent value="sales">
            <SalesDashboard />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentsDashboard />
          </TabsContent>
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Manage all offered services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Add, edit, or remove services including therapy sessions, spiritual consultations, corporate services, and student psychologist sessions.</p>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Manage Services
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>Manage incoming inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">View and respond to customer inquiries, questions, and contact form submissions.</p>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  View Inquiries
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
