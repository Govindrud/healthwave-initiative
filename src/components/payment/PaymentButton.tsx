
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { initializeRazorpay, initiatePayment } from "@/utils/payments";
import { toast } from "sonner";

interface PaymentButtonProps {
  amount: number;
  title: string;
  buttonText?: string;
  className?: string;
  bookingDetails: {
    date?: string;
    time?: string;
    location?: string;
    duration?: string;
    participants?: number;
    type: string;
    serviceId?: string;
    doctorId?: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentButton = ({
  amount,
  title,
  buttonText = "Proceed to Payment",
  className = "",
  bookingDetails,
  customerInfo
}: PaymentButtonProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Preload the Razorpay script when component mounts
  useEffect(() => {
    initializeRazorpay(() => {
      setIsScriptLoaded(true);
      console.log("Razorpay script preloaded");
    });
  }, []);
  
  const handlePayment = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
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
        ? `${bookingDetails.date} at ${bookingDetails.time}` 
        : bookingDetails.date;
    }
    
    console.log("Initiating payment with customer info:", customerInfo);
    
    initiatePayment({
      amount,
      description: `Booking for ${title}`,
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      orderId,
      bookingDatetime,
      successCallback: (response) => {
        setIsLoading(false);
        toast.success("Payment successful!");
        console.log("Payment success, redirecting with data:", {
          orderId,
          paymentId: response.razorpay_payment_id,
          title,
          amount
        });
        
        // Redirect to payment success page with relevant info
        navigate(`/payment-success?order_id=${orderId}&payment_id=${response.razorpay_payment_id}&title=${encodeURIComponent(title)}&amount=${amount}`);
      },
      errorCallback: (error) => {
        setIsLoading(false);
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
      }
    });
  };
  
  return (
    <Button 
      onClick={handlePayment}
      className={`bg-meant-600 hover:bg-meant-700 text-white ${className}`}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : buttonText}
    </Button>
  );
};

export default PaymentButton;
