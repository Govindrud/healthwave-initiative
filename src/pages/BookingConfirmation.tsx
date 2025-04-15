
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, CalendarClock, MapPin, Users, Clock } from "lucide-react";
import { initiatePayment } from "@/utils/payments";
import { toast } from "sonner";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    title: searchParams.get("title") || "Service Booking",
    amount: Number(searchParams.get("amount")) || 0,
    participants: Number(searchParams.get("participants")) || 1,
    duration: searchParams.get("duration") || "60 minutes",
    date: searchParams.get("date") || "To be scheduled",
    time: searchParams.get("time") || "",
    location: searchParams.get("location") || "Online",
    type: searchParams.get("type") || "service",
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || ""
  });

  useEffect(() => {
    document.title = "MeantToHelp | Booking Confirmation";
  }, []);

  const handlePayment = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      toast.error("Please provide your contact information to proceed");
      return;
    }

    setIsLoading(true);
    
    // Generate a unique order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Format datetime for booking if date and time are provided
    let bookingDatetime = "";
    if (bookingDetails.date && bookingDetails.date !== "To be scheduled") {
      bookingDatetime = bookingDetails.time 
        ? `${bookingDetails.date} ${bookingDetails.time}` 
        : bookingDetails.date;
    }
    
    initiatePayment({
      amount: bookingDetails.amount,
      description: `Booking for ${bookingDetails.title}`,
      name: bookingDetails.name,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      orderId: orderId,
      bookingDatetime,
      successCallback: (response) => {
        setIsLoading(false);
        // Redirect to payment success page with relevant info
        navigate(`/payment-success?order_id=${orderId}&payment_id=${response.razorpay_payment_id}&title=${bookingDetails.title}&amount=${bookingDetails.amount}`);
      },
      errorCallback: (error) => {
        setIsLoading(false);
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
      }
    });
  };

  const groupedDateTime = bookingDetails.date !== "To be scheduled" && bookingDetails.time
    ? `${bookingDetails.date} at ${bookingDetails.time}`
    : bookingDetails.date;

  return (
    <MainLayout title="Booking Confirmation">
      <div className="max-w-3xl mx-auto p-4">
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
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium mb-3">Contact Information</h3>
              {(!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) ? (
                <div className="text-red-500 mb-2">
                  Please fill in your contact information to proceed with payment
                </div>
              ) : null}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <input 
                    type="email"
                    className="w-full p-2 border rounded-md"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                  <input 
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                    placeholder="Your phone number"
                    required
                  />
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
              disabled={isLoading}
            >
              Back
            </Button>
            <Button 
              onClick={handlePayment}
              className="bg-meant-600 hover:bg-meant-700 text-white w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BookingConfirmation;
