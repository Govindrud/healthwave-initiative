
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const BookingsDashboard: React.FC = () => {
  // Sample data for the bookings chart
  const bookingsData = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 18 },
    { day: "Wed", count: 25 },
    { day: "Thu", count: 20 },
    { day: "Fri", count: 28 },
    { day: "Sat", count: 15 },
    { day: "Sun", count: 8 },
  ];

  // Sample bookings data for the table
  const recentBookings = [
    {
      id: "B-1001",
      client: "Sarah Johnson",
      service: "Therapy Session",
      date: "2023-06-15",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: "B-1002",
      client: "Michael Chen",
      service: "Counseling",
      date: "2023-06-16",
      time: "2:00 PM",
      status: "Upcoming",
    },
    {
      id: "B-1003",
      client: "Jessica Lee",
      service: "Support Group",
      date: "2023-06-16",
      time: "4:15 PM",
      status: "Upcoming",
    },
    {
      id: "B-1004",
      client: "David Wilson",
      service: "Initial Consultation",
      date: "2023-06-17",
      time: "11:00 AM",
      status: "Upcoming",
    },
    {
      id: "B-1005",
      client: "Emma Rodriguez",
      service: "Therapy Session",
      date: "2023-06-15",
      time: "3:30 PM",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bookings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{ count: { color: "#7c3aed" } }}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Bookings</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="w-full bg-background pl-8"
            />
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.client}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <span className="sr-only">View details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end mt-4 space-x-2">
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
