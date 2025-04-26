
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, CalendarClock, MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/date-utils";
import { useAuth } from "@/hooks/useAuth";

interface PaymentDetails {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  location: string;
  provider: string;
  email: string;
  name: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would verify the payment with the server here
    // For now, we'll just simulate loading the payment details
    const paymentId = searchParams.get("payment_id");
    const sessionId = searchParams.get("session_id");
    
    if (!paymentId && !sessionId) {
      // If no payment ID is present, redirect to home
      navigate("/");
      return;
    }
    
    // Simulate loading payment details from server
    setTimeout(() => {
      // Mock data - in a real app, this would come from your API
      setPaymentDetails({
        id: paymentId || sessionId || "PAY-123456",
        title: searchParams.get("title") || "Service Booking",
        amount: Number(searchParams.get("amount")) || 1500,
        date: searchParams.get("date") || "2025-05-15",
        time: searchParams.get("time") || "14:30",
        location: searchParams.get("location") || "Online",
        provider: searchParams.get("provider") || "Dr. Sarah Johnson",
        email: user?.email || searchParams.get("email") || "",
        name: searchParams.get("name") || ""
      });
      setLoading(false);
    }, 1000);
    
    // Log analytics event for conversion tracking
    console.log("Payment success page viewed:", { paymentId, sessionId });
  }, [searchParams, navigate, user]);

  if (loading) {
    return (
      <MainLayout title="Processing Payment">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
              <Clock className="h-12 w-12 text-meant-600 animate-pulse mb-4" />
              <h1 className="text-2xl font-bold mb-2">Processing Your Payment</h1>
              <p className="text-center text-muted-foreground">
                Please wait while we verify your payment details...
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (!paymentDetails) {
    return (
      <MainLayout title="Payment Error">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Payment Verification Failed</h1>
              <p className="text-center text-muted-foreground mb-6">
                We couldn't verify your payment details. Please contact customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Return to Home
                </Button>
                <Button onClick={() => navigate("/services")}>
                  Browse Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Payment Successful">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto overflow-hidden">
          <div className="h-2 bg-green-500" />
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Thank you for your booking. Your transaction has been completed successfully.
              </p>
            </div>
            
            <div className="border rounded-md p-4 mb-6">
              <h3 className="font-medium text-lg mb-4">{paymentDetails.title}</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CalendarClock className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-muted-foreground">{formatDate(paymentDetails.date)} at {paymentDetails.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{paymentDetails.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Provider</p>
                    <p className="text-muted-foreground">{paymentDetails.provider}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>Booking Reference</span>
                <span className="font-medium">{paymentDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Amount Paid</span>
                <span className="font-medium">₹{paymentDetails.amount}</span>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">What's Next?</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>A confirmation email has been sent to {paymentDetails.email || "your email address"}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You'll receive a reminder 24 hours before your appointment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You can view and manage all your bookings in your account</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Return to Home
                </Button>
                
                <Button asChild>
                  <Link to="/my-bookings">View My Bookings</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;
