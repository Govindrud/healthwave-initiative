
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react';

const MyBookings = () => {
  useEffect(() => {
    document.title = "My Bookings - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const bookings = [
    {
      id: 1,
      type: "Therapy Session",
      provider: "Dr. Sarah Johnson",
      date: "2024-06-15",
      time: "10:00 AM",
      duration: "60 minutes",
      status: "confirmed",
      mode: "video",
      location: "Online"
    },
    {
      id: 2,
      type: "Spiritual Consultation",
      provider: "Guru Ramesh",
      date: "2024-06-18",
      time: "3:00 PM",
      duration: "45 minutes",
      status: "pending",
      mode: "in-person",
      location: "Temple Complex, Delhi"
    },
    {
      id: 3,
      type: "Assessment",
      provider: "MeantToHelp Team",
      date: "2024-06-12",
      time: "2:00 PM",
      duration: "30 minutes",
      status: "completed",
      mode: "online",
      location: "Self-Assessment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout title="My Bookings - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-meant-800 mb-2">My Bookings</h1>
              <p className="text-muted-foreground">Manage your appointments and sessions</p>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-meant-800">{booking.type}</CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          <span>{booking.provider}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{booking.time} ({booking.duration})</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-muted-foreground">
                          {booking.mode === 'video' ? (
                            <Video className="h-4 w-4 mr-2" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-2" />
                          )}
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === 'confirmed' && (
                            <Button size="sm" className="bg-meant-600 hover:bg-meant-700">
                              Join Session
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {bookings.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start your mental health journey by booking your first session
                  </p>
                  <Button className="bg-meant-600 hover:bg-meant-700">
                    Browse Services
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookings;
