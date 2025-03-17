
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Calendar, Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingsDashboard from "@/components/admin/BookingsDashboard";
import SalesDashboard from "@/components/admin/SalesDashboard";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("bookings");

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
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor booking appointments and sales performance
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
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from last month
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
              <div className="text-2xl font-bold">$12,428</div>
              <p className="text-xs text-muted-foreground">
                +18.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Session Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$128</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <BookingsDashboard />
          </TabsContent>
          <TabsContent value="sales">
            <SalesDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
