
import React, { useState, useEffect } from "react";
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
import { useSheetDB } from "@/hooks/useSheetDB";

const BookingsDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 7;
  
  const { getRecords, loading: sheetLoading, error } = useSheetDB();
  
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Fetch bookings from SheetDB
        const bookingsData = await getRecords({ sheet: 'Bookings' });
        setBookings(bookingsData || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  // Sample data for the bookings chart (this would ideally be calculated from real data)
  const bookingsData = [
    { day: "Mon", completed: 8, upcoming: 4, canceled: 2 },
    { day: "Tue", completed: 14, upcoming: 4, canceled: 1 },
    { day: "Wed", completed: 18, upcoming: 7, canceled: 3 },
    { day: "Thu", completed: 15, upcoming: 5, canceled: 2 },
    { day: "Fri", completed: 20, upcoming: 8, canceled: 1 },
    { day: "Sat", completed: 10, upcoming: 5, canceled: 0 },
    { day: "Sun", completed: 5, upcoming: 3, canceled: 0 },
  ];

  // Get bookings for current page with filtering
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      (booking.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (booking.BookingID?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (booking.ServiceType?.toLowerCase().includes(searchQuery.toLowerCase()) || '');
    
    const matchesStatus = 
      statusFilter === "all" || 
      booking.Status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status: string = '') => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateSummaryMetrics = () => {
    return [
      {
        title: "Total Bookings",
        value: bookings.length.toString(),
        icon: CalendarDays,
        color: "bg-blue-100 text-blue-800",
      },
      {
        title: "Active Clients",
        value: new Set(bookings.map(b => b.CustomerName)).size.toString(),
        icon: UserRound,
        color: "bg-green-100 text-green-800",
      },
      {
        title: "Avg. Session Time",
        value: "60 min", // Could be calculated from actual data
        icon: Clock,
        color: "bg-purple-100 text-purple-800",
      },
    ];
  };

  const summaryMetrics = calculateSummaryMetrics();

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
          <ChartContainer className="h-[300px]">
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
          <CardTitle>All Bookings</CardTitle>
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
          {loading ? (
            <div className="text-center py-8">Loading bookings data...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading bookings: {error}</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No bookings found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentBookings.map((booking) => (
                      <TableRow key={booking.BookingID || booking.id}>
                        <TableCell className="font-medium">{booking.BookingID || 'N/A'}</TableCell>
                        <TableCell>{booking.CustomerName || 'N/A'}</TableCell>
                        <TableCell>{booking.ServiceType || 'N/A'}</TableCell>
                        <TableCell>{booking.BookingDate || 'N/A'}</TableCell>
                        <TableCell>
                          {booking.BookingTime || 'N/A'}
                          {booking.Duration && (
                            <div className="text-xs text-muted-foreground">{booking.Duration} min</div>
                          )}
                        </TableCell>
                        <TableCell>{booking.Provider || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={getStatusColor(booking.Status)}
                          >
                            {booking.Status || 'Unknown'}
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
              
              <div className="flex items-center justify-between mt-4 space-x-2">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredBookings.length)}-{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> of{" "}
                  <span className="font-medium">{filteredBookings.length}</span> bookings
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsDashboard;
