
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, CalendarClock, MapPin, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import PaymentButton from "@/components/payment/PaymentButton";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/date-utils";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState({
    title: searchParams.get("title") || "Service Booking",
    amount: Number(searchParams.get("amount")) || 0,
    participants: Number(searchParams.get("participants")) || 1,
    duration: searchParams.get("duration") || "60 minutes",
    date: searchParams.get("date") || "To be scheduled",
    time: searchParams.get("time") || "",
    location: searchParams.get("location") || "Online",
    provider: searchParams.get("provider") || "",
    type: searchParams.get("type") || "service",
    serviceId: searchParams.get("service_id") || "",
    doctorId: searchParams.get("doctor_id") || "",
    name: user?.displayName || searchParams.get("name") || "",
    email: user?.email || searchParams.get("email") || "",
    phone: searchParams.get("phone") || ""
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false
  });

  useEffect(() => {
    document.title = "MeantToHelp | Booking Confirmation";
    
    // Log payment parameters for debugging
    console.log("Booking confirmation parameters:", {
      title: bookingDetails.title,
      amount: bookingDetails.amount,
      type: bookingDetails.type,
      user: user?.email
    });
    
    // Pre-fill user information if available
    if (user) {
      setBookingDetails(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleInputChange = (field: string, value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (field in errors) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const groupedDateTime = bookingDetails.date !== "To be scheduled" && bookingDetails.time
    ? `${formatDate(bookingDetails.date)} at ${bookingDetails.time}`
    : bookingDetails.date;
    
  const validateFields = () => {
    const newErrors = {
      name: !bookingDetails.name,
      email: !bookingDetails.email || !validateEmail(bookingDetails.email),
      phone: !bookingDetails.phone || bookingDetails.phone.length < 10
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  
  const handleSubmitBooking = () => {
    // Validate fields before proceeding to payment
    if (!validateFields()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    
    // Here you would typically create a booking in your backend
    console.log("Submitting booking:", bookingDetails);
    
    // For a real app, you'd make an API call here to create the booking
    // and then proceed to payment
    
    // Simulate successful booking creation
    toast.success("Booking details validated. Proceeding to payment.");
  };

  return (
    <MainLayout title="Booking Confirmation">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <Card className="p-6 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-meant-700">Booking Summary</h2>
            <p className="text-muted-foreground">Please review your booking details before payment</p>
          </div>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-medium mb-3">{bookingDetails.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedDateTime !== "To be scheduled" && (
                  <div className="flex items-center text-meant-600">
                    <CalendarClock className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{groupedDateTime}</span>
                  </div>
                )}
                
                <div className="flex items-center text-meant-600">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{bookingDetails.location}</span>
                </div>
                
                <div className="flex items-center text-meant-600">
                  <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{bookingDetails.duration}</span>
                </div>
                
                {bookingDetails.participants > 1 && (
                  <div className="flex items-center text-meant-600">
                    <Users className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{bookingDetails.participants} participants</span>
                  </div>
                )}
                
                {bookingDetails.provider && (
                  <div className="flex items-center text-meant-600">
                    <span className="font-medium">Provider:</span>
                    <span className="ml-2">{bookingDetails.provider}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium mb-3">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <input 
                    type="text"
                    className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                    value={bookingDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <input 
                    type="email"
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                    value={bookingDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Your email address"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">Valid email is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                  <input 
                    type="tel"
                    className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : ''}`}
                    value={bookingDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Your phone number"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">Valid phone number is required</p>}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Payment Details</h3>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>{bookingDetails.title}</span>
                  <span>₹{bookingDetails.amount}</span>
                </div>
                {bookingDetails.participants > 1 && (
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>{bookingDetails.participants} participants</span>
                    <span>₹{bookingDetails.amount} x {bookingDetails.participants}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{bookingDetails.amount * bookingDetails.participants}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <PaymentButton
              amount={bookingDetails.amount * bookingDetails.participants}
              title={bookingDetails.title}
              onBeforePayment={handleSubmitBooking}
              bookingDetails={{
                date: bookingDetails.date,
                time: bookingDetails.time,
                location: bookingDetails.location,
                duration: bookingDetails.duration,
                participants: bookingDetails.participants,
                type: bookingDetails.type,
                serviceId: bookingDetails.serviceId,
                doctorId: bookingDetails.doctorId,
                provider: bookingDetails.provider
              }}
              customerInfo={{
                name: bookingDetails.name,
                email: bookingDetails.email,
                phone: bookingDetails.phone
              }}
              className="w-full md:w-auto"
            />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BookingConfirmation;
