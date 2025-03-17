
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Filter, CalendarDays, Download, Clock, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingsDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample data for the bookings chart
  const bookingsData = [
    { day: "Mon", completed: 8, upcoming: 4, canceled: 2 },
    { day: "Tue", completed: 14, upcoming: 4, canceled: 1 },
    { day: "Wed", completed: 18, upcoming: 7, canceled: 3 },
    { day: "Thu", completed: 15, upcoming: 5, canceled: 2 },
    { day: "Fri", completed: 20, upcoming: 8, canceled: 1 },
    { day: "Sat", completed: 10, upcoming: 5, canceled: 0 },
    { day: "Sun", completed: 5, upcoming: 3, canceled: 0 },
  ];

  // Enhanced bookings data for the table
  const recentBookings = [
    {
      id: "B-1001",
      client: "Sarah Johnson",
      service: "Therapy Session",
      date: "2023-06-15",
      time: "10:30 AM",
      duration: "60 min",
      status: "Completed",
      therapist: "Dr. Michael Brown",
    },
    {
      id: "B-1002",
      client: "Michael Chen",
      service: "Counseling",
      date: "2023-06-16",
      time: "2:00 PM",
      duration: "45 min",
      status: "Upcoming",
      therapist: "Dr. Lisa Wong",
    },
    {
      id: "B-1003",
      client: "Jessica Lee",
      service: "Support Group",
      date: "2023-06-16",
      time: "4:15 PM",
      duration: "90 min",
      status: "Upcoming",
      therapist: "Dr. Robert Garcia",
    },
    {
      id: "B-1004",
      client: "David Wilson",
      service: "Initial Consultation",
      date: "2023-06-17",
      time: "11:00 AM",
      duration: "45 min",
      status: "Upcoming",
      therapist: "Dr. Emily Parker",
    },
    {
      id: "B-1005",
      client: "Emma Rodriguez",
      service: "Therapy Session",
      date: "2023-06-15",
      time: "3:30 PM",
      duration: "60 min",
      status: "Completed",
      therapist: "Dr. Michael Brown",
    },
    {
      id: "B-1006",
      client: "James Taylor",
      service: "Anxiety Management",
      date: "2023-06-14",
      time: "1:00 PM",
      duration: "60 min",
      status: "Canceled",
      therapist: "Dr. Lisa Wong",
    },
    {
      id: "B-1007",
      client: "Olivia Martinez",
      service: "Depression Support",
      date: "2023-06-18",
      time: "9:30 AM",
      duration: "60 min",
      status: "Upcoming",
      therapist: "Dr. Emily Parker",
    },
  ];

  const filteredBookings = recentBookings.filter((booking) => {
    const matchesSearch = 
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Summary metrics
  const summaryMetrics = [
    {
      title: "Total Bookings",
      value: "243",
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Active Clients",
      value: "128",
      icon: UserRound,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Avg. Session Time",
      value: "52 min",
      icon: Clock,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center mr-4`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{ count: { color: "#7c3aed" } }}>
            {/* Wrap the children in a Fragment to fix the type error */}
            <>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="upcoming" name="Upcoming" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="canceled" name="Canceled" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Recent Bookings</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bookings..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No bookings found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>
                      {booking.time}
                      <div className="text-xs text-muted-foreground">{booking.duration}</div>
                    </TableCell>
                    <TableCell>{booking.therapist}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getStatusColor(booking.status)}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">View details</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end mt-4 space-x-2">
            <div className="text-sm text-muted-foreground mr-4">
              Showing <span className="font-medium">{filteredBookings.length}</span> of{" "}
              <span className="font-medium">{recentBookings.length}</span> bookings
            </div>
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsDashboard;
