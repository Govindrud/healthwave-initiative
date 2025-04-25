
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSheetDB } from "@/hooks/useSheetDB";

const AppointmentsDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 7;
  
  const { getRecords, error } = useSheetDB();
  
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // We'll combine bookings from multiple sheets that represent appointments
        const bookings = await getRecords({ sheet: 'Bookings' });
        const doctorAppointments = await getRecords({ sheet: 'Appointments' });
        const spiritualBookings = await getRecords({ sheet: 'SpiritualBookings' });
        
        // Combine and normalize data
        const allAppointments = [
          ...(bookings || []).map(b => ({
            ...b,
            ServiceCategory: 'General'
          })),
          ...(doctorAppointments || []).map(a => ({
            ...a,
            ServiceCategory: 'Doctor'
          })),
          ...(spiritualBookings || []).map(s => ({
            ...s,
            ServiceCategory: 'Spiritual'
          }))
        ];
        
        setAppointments(allAppointments);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      (appointment.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (appointment.AppointmentID?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (appointment.BookingID?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      (appointment.ServiceType?.toLowerCase().includes(searchQuery.toLowerCase()) || '');
    
    const matchesService = 
      serviceFilter === "all" || 
      appointment.ServiceCategory?.toLowerCase() === serviceFilter.toLowerCase();
    
    return matchesSearch && matchesService;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const getServiceCategoryColor = (category: string = '') => {
    switch (category.toLowerCase()) {
      case "doctor":
        return "bg-indigo-100 text-indigo-800";
      case "spiritual":
        return "bg-purple-100 text-purple-800";
      case "general":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>All Appointments</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search appointments..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="spiritual">Spiritual</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading appointments data...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading appointments: {error}</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No appointments found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentAppointments.map((appointment, index) => (
                      <TableRow key={appointment.AppointmentID || appointment.BookingID || index}>
                        <TableCell className="font-medium">
                          {appointment.AppointmentID || appointment.BookingID || `APP-${index}`}
                        </TableCell>
                        <TableCell>{appointment.CustomerName || 'N/A'}</TableCell>
                        <TableCell>{appointment.ServiceType || appointment.Service || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={getServiceCategoryColor(appointment.ServiceCategory)}
                          >
                            {appointment.ServiceCategory || 'General'}
                          </Badge>
                        </TableCell>
                        <TableCell>{appointment.AppointmentDate || appointment.BookingDate || 'N/A'}</TableCell>
                        <TableCell>
                          {appointment.AppointmentTime || appointment.BookingTime || 'N/A'}
                          {appointment.Duration && (
                            <div className="text-xs text-muted-foreground">{appointment.Duration} min</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={getStatusColor(appointment.Status)}
                          >
                            {appointment.Status || 'Scheduled'}
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
                  Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredAppointments.length)}-{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span> of{" "}
                  <span className="font-medium">{filteredAppointments.length}</span> appointments
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

export default AppointmentsDashboard;
