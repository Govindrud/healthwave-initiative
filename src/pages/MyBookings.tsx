
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/date-utils";

const MyBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;
      
      try {
        // In a real app, this would be an API call to fetch bookings
        // For demo purposes, we'll use mock data
        const mockData = [
          {
            id: "BOK123456",
            type: "Doctor Consultation",
            provider: "Dr. Sarah Johnson",
            status: "upcoming",
            date: "2025-05-15",
            time: "14:30",
            location: "Video Call",
            amount: 1500,
            paymentStatus: "paid",
            notes: "Please join 5 minutes before the scheduled time"
          },
          {
            id: "BOK123457",
            type: "Spiritual Counseling",
            provider: "Swami Dayananda",
            status: "completed",
            date: "2025-04-10",
            time: "11:00",
            location: "Temple Center",
            amount: 2000,
            paymentStatus: "paid",
            notes: "Thank you for your participation"
          },
          {
            id: "BOK123458",
            type: "Wellness Workshop",
            provider: "Mindfulness Center",
            status: "canceled",
            date: "2025-03-25",
            time: "16:00",
            location: "Community Hall",
            amount: 800,
            paymentStatus: "refunded",
            notes: "Canceled due to low attendance"
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setBookings(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load your booking history",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReschedule = (bookingId: string) => {
    toast({
      title: "Reschedule Request",
      description: `Your reschedule request for booking ${bookingId} has been submitted.`,
    });
  };

  const handleCancel = (bookingId: string) => {
    toast({
      title: "Cancellation Request",
      description: `Your cancellation request for booking ${bookingId} has been submitted.`,
    });
  };

  return (
    <MainLayout title="My Bookings">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-meant-800">My Bookings</h1>
        
        {!user ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-xl font-medium mb-4">Please log in to view your bookings</h2>
              <Button asChild>
                <a href="/login">Log In</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <BookingsList 
                bookings={bookings} 
                loading={loading}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            
            <TabsContent value="upcoming">
              <BookingsList 
                bookings={bookings.filter(b => b.status === "upcoming")} 
                loading={loading}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <BookingsList 
                bookings={bookings.filter(b => b.status === "completed")} 
                loading={loading}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            
            <TabsContent value="canceled">
              <BookingsList 
                bookings={bookings.filter(b => b.status === "canceled")} 
                loading={loading}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

interface BookingsListProps {
  bookings: any[];
  loading: boolean;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  getStatusColor: (status: string) => string;
}

const BookingsList: React.FC<BookingsListProps> = ({ 
  bookings, 
  loading, 
  onReschedule, 
  onCancel,
  getStatusColor 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="py-4">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">No bookings found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <div className={`h-2 ${
            booking.status === "upcoming" ? "bg-blue-500" : 
            booking.status === "completed" ? "bg-green-500" : 
            "bg-red-500"
          }`} />
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle>{booking.type}</CardTitle>
              <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
            </div>
            <Badge variant="outline" className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(booking.date)} at {booking.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>With {booking.provider}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Payment:</span> 
                  <span className="ml-2">
                    ₹{booking.amount} ({booking.paymentStatus})
                  </span>
                </div>
                
                {booking.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes:</span> 
                    <p className="text-muted-foreground">{booking.notes}</p>
                  </div>
                )}
                
                {booking.status === "upcoming" && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onReschedule(booking.id)}
                    >
                      Reschedule
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onCancel(booking.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyBookings;
