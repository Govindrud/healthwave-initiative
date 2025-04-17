
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeRazorpay, initiatePayment } from "@/utils/payments";
import { toast } from "sonner";
import { sendBookingConfirmationWhatsApp } from "@/utils/whatsapp-notifications";

interface PaymentDetails {
  amount: number;
  title: string;
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

interface PaymentHookReturn {
  isLoading: boolean;
  isScriptLoaded: boolean;
  handlePayment: () => void;
}

export const usePayment = (paymentDetails: PaymentDetails): PaymentHookReturn => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { amount, title, bookingDetails, customerInfo } = paymentDetails;
  
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
    toast.info("Setting up payment gateway...");
    
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
    console.log("Booking details:", bookingDetails);
    
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
          amount,
          serviceType: bookingDetails.type
        });
        
        // Send WhatsApp notification if phone number is provided
        if (customerInfo.phone) {
          sendBookingConfirmationWhatsApp({
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            serviceName: title,
            bookingDate: bookingDetails.date || "To be scheduled",
            bookingTime: bookingDetails.time || ""
          });
        }
        
        // Redirect to payment success page with relevant info
        navigate(`/payment-success?order_id=${orderId}&payment_id=${response.razorpay_payment_id}&title=${encodeURIComponent(title)}&amount=${amount}&service_type=${bookingDetails.type}`);
      },
      errorCallback: (error) => {
        setIsLoading(false);
        
        // Provide more user-friendly error messages
        let errorMessage = "Payment failed. Please try again.";
        if (error.error && error.error.description) {
          errorMessage = `Payment failed: ${error.error.description}`;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        
        console.error("Payment error:", error);
        toast.error(errorMessage);
      }
    });
  };

  return {
    isLoading,
    isScriptLoaded,
    handlePayment
  };
};
