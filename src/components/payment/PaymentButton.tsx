
import React from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";
import { toast } from "sonner";

interface PaymentButtonProps {
  amount: number;
  title: string;
  className?: string;
  onBeforePayment?: () => void;
  bookingDetails: {
    date?: string;
    time?: string;
    location?: string;
    duration?: string;
    participants?: number;
    type: string;
    serviceId?: string;
    doctorId?: string;
    provider?: string;
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
  className = "",
  onBeforePayment,
  bookingDetails,
  customerInfo
}: PaymentButtonProps) => {
  const { isLoading, handlePayment } = usePayment({
    amount,
    title,
    bookingDetails,
    customerInfo
  });
  
  const handleClick = () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please provide your contact information to proceed");
      return;
    }
    
    // Call onBeforePayment callback if provided
    if (onBeforePayment) {
      onBeforePayment();
    }
    
    // Initiate payment
    handlePayment();
  };
  
  return (
    <Button 
      className={`bg-meant-600 hover:bg-meant-700 text-white ${className}`}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? "Processing payment..." : `Pay ₹${amount}`}
    </Button>
  );
};

export default PaymentButton;
