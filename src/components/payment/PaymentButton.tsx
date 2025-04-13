
import React, { useState } from "react";
import { initiatePayment, verifyPayment } from "@/utils/payments";
import { toast } from "@/hooks/use-toast";

interface PaymentButtonProps {
  amount: number;
  productName: string;
  buttonText?: string;
  className?: string;
  bookingDatetime?: string;
  transactionType: "product" | "service" | "consultation" | "booking";
  onPaymentSuccess?: (data: any) => void;
  onPaymentError?: (error: any) => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  productName,
  buttonText = "Pay Now",
  className = "",
  bookingDatetime,
  transactionType,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Generate a unique order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Show customer info collection modal or form
      // For demo, we'll use prompt but in a real app, use a proper form
      const name = prompt("Please enter your name") || "Test User";
      const email = prompt("Please enter your email") || "test@example.com";
      const phone = prompt("Please enter your phone") || "9999999999";
      
      if (!name || !email || !phone) {
        toast({
          title: "Missing Information",
          description: "Please provide all required information to proceed with payment",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Initialize payment
      initiatePayment({
        amount,
        description: productName,
        name,
        email,
        phone,
        orderId,
        bookingDatetime,
        successCallback: async (response) => {
          try {
            // Verify payment with the server
            const result = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
              amount,
              productName,
              { name, email, phone },
              transactionType,
              bookingDatetime
            );
            
            if (result.success) {
              toast({
                title: "Payment Successful",
                description: `Your payment for ${productName} has been completed successfully!`,
                variant: "success"
              });
              
              if (onPaymentSuccess) onPaymentSuccess(result);
            } else {
              throw new Error(result.error || "Payment verification failed");
            }
          } catch (error) {
            toast({
              title: "Verification Failed",
              description: error instanceof Error ? error.message : "Payment verification failed. Please contact support.",
              variant: "destructive"
            });
            
            if (onPaymentError) onPaymentError(error);
          }
          
          setIsLoading(false);
        },
        errorCallback: (error) => {
          toast({
            title: "Payment Failed",
            description: error.error?.description || "Your payment attempt failed. Please try again.",
            variant: "destructive"
          });
          
          if (onPaymentError) onPaymentError(error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      
      if (onPaymentError) onPaymentError(error);
      setIsLoading(false);
    }
  };
  
  return (
    <button
      className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : buttonText}
    </button>
  );
};

export default PaymentButton;
