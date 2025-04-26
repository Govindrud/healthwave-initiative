
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatDate } from "@/utils/date-utils";
import { Edit, Search, Filter, TrashIcon, CheckCircle, XCircle } from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  provider: string;
  bookingDate: string;
  bookingTime: string;
  duration: string;
  status: string;
  amount: number;
  paymentStatus: string;
  notes?: string;
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real application, this would be an API call
        // For demo purposes, let's use dummy data
        const dummyData: Booking[] = [
          {
            id: "BOK-23456",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            customerPhone: "+91 9876543210",
            serviceType: "Doctor Consultation",
            provider: "Dr. Sarah Johnson",
            bookingDate: "2025-05-15",
            bookingTime: "14:30",
            duration: "30 minutes",
            status: "upcoming",
            amount: 1500,
            paymentStatus: "paid",
            notes: "First-time patient"
          },
          {
            id: "BOK-23457",
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            customerPhone: "+91 9876543211",
            serviceType: "Spiritual Counseling",
            provider: "Swami Dayananda",
            bookingDate: "2025-05-16",
            bookingTime: "10:00",
            duration: "60 minutes",
            status: "confirmed",
            amount: 2000,
            paymentStatus: "paid"
          },
          {
            id: "BOK-23458",
            customerName: "Robert Johnson",
            customerEmail: "robert@example.com",
            customerPhone: "+91 9876543212",
            serviceType: "Yoga Session",
            provider: "Yoga Instructor Priya",
            bookingDate: "2025-05-17",
            bookingTime: "08:00",
            duration: "45 minutes",
            status: "pending",
            amount: 800,
            paymentStatus: "pending"
          },
          {
            id: "BOK-23459",
            customerName: "Sarah Williams",
            customerEmail: "sarah@example.com",
            customerPhone: "+91 9876543213",
            serviceType: "Meditation Workshop",
            provider: "Mindfulness Center",
            bookingDate: "2025-05-20",
            bookingTime: "16:00",
            duration: "90 minutes",
            status: "upcoming",
            amount: 1200,
            paymentStatus: "paid"
          },
          {
            id: "BOK-23460",
            customerName: "Michael Brown",
            customerEmail: "michael@example.com",
            customerPhone: "+91 9876543214",
            serviceType: "Doctor Consultation",
            provider: "Dr. Rajesh Kumar",
            bookingDate: "2025-05-12",
            bookingTime: "11:30",
            duration: "30 minutes",
            status: "completed",
            amount: 1500,
            paymentStatus: "paid"
          },
          {
            id: "BOK-23461",
            customerName: "Emily Davis",
            customerEmail: "emily@example.com",
            customerPhone: "+91 9876543215",
            serviceType: "Addiction Counseling",
            provider: "Dr. James Wilson",
            bookingDate: "2025-05-19",
            bookingTime: "15:00",
            duration: "60 minutes",
            status: "upcoming",
            amount: 2500,
            paymentStatus: "paid"
          },
          {
            id: "BOK-23462",
            customerName: "David Miller",
            customerEmail: "david@example.com",
            customerPhone: "+91 9876543216",
            serviceType: "Spiritual Tour",
            provider: "Sacred Journeys",
            bookingDate: "2025-06-01",
            bookingTime: "09:00",
            duration: "5 hours",
            status: "confirmed",
            amount: 3000,
            paymentStatus: "paid"
          },
          {
            id: "BOK-23463",
            customerName: "Lisa Wilson",
            customerEmail: "lisa@example.com",
            customerPhone: "+91 9876543217",
            serviceType: "Doctor Consultation",
            provider: "Dr. Sarah Johnson",
            bookingDate: "2025-05-22",
            bookingTime: "10:30",
            duration: "30 minutes",
            status: "canceled",
            amount: 1500,
            paymentStatus: "refunded",
            notes: "Customer requested cancellation"
          }
        ];
        
        setBookings(dummyData);
        setFilteredBookings(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = bookings;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.customerName.toLowerCase().includes(query) || 
        booking.customerEmail.toLowerCase().includes(query) || 
        booking.id.toLowerCase().includes(query) ||
        booking.serviceType.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    setFilteredBookings(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, bookings]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentPageData = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking({...booking});
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteBooking = () => {
    if (!selectedBooking) return;
    
    // In a real app, we would call an API here
    const updatedBookings = bookings.filter(b => b.id !== selectedBooking.id);
    setBookings(updatedBookings);
    
    toast.success(`Booking ${selectedBooking.id} has been deleted`);
    setIsDeleteDialogOpen(false);
    setSelectedBooking(null);
  };
  
  const saveBookingChanges = () => {
    if (!selectedBooking) return;
    
    // In a real app, we would call an API here
    const updatedBookings = bookings.map(b => 
      b.id === selectedBooking.id ? selectedBooking : b
    );
    
    setBookings(updatedBookings);
    toast.success(`Booking ${selectedBooking.id} has been updated`);
    setIsEditDialogOpen(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="text-xl">All Bookings</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or booking ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found matching your search criteria
            </div>
          ) : (
            <>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPageData.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-xs text-muted-foreground">{booking.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.serviceType}</TableCell>
                        <TableCell>
                          <div>
                            <div>{formatDate(booking.bookingDate)}</div>
                            <div className="text-xs text-muted-foreground">{booking.bookingTime} ({booking.duration})</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.provider}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditBooking(booking)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteBooking(booking)}
                            >
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination controls */}
              <div className="flex items-center justify-between mt-4 space-x-2">
                <div className="text-sm text-muted-foreground">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBookings.length)}-
                  {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{" "}
                  {filteredBookings.length} bookings
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
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update the booking information for {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm" htmlFor="status">
                  Status
                </label>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value) => 
                    setSelectedBooking({...selectedBooking, status: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm" htmlFor="bookingDate">
                  Date
                </label>
                <Input
                  id="bookingDate"
                  type="date"
                  className="col-span-3"
                  value={selectedBooking.bookingDate}
                  onChange={(e) => 
                    setSelectedBooking({...selectedBooking, bookingDate: e.target.value})
                  }
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm" htmlFor="bookingTime">
                  Time
                </label>
                <Input
                  id="bookingTime"
                  className="col-span-3"
                  value={selectedBooking.bookingTime}
                  onChange={(e) => 
                    setSelectedBooking({...selectedBooking, bookingTime: e.target.value})
                  }
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm" htmlFor="notes">
                  Notes
                </label>
                <Input
                  id="notes"
                  className="col-span-3"
                  value={selectedBooking.notes || ""}
                  onChange={(e) => 
                    setSelectedBooking({...selectedBooking, notes: e.target.value})
                  }
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveBookingChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete booking {selectedBooking?.id} for {selectedBooking?.customerName}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeleteBooking}
            >
              Delete Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
