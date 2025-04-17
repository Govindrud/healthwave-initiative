
import React from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";

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
  const { isLoading, isScriptLoaded, handlePayment } = usePayment({
    amount,
    title,
    bookingDetails,
    customerInfo
  });
  
  return (
    <Button 
      onClick={handlePayment}
      className={`bg-meant-600 hover:bg-meant-700 text-white ${className}`}
      disabled={isLoading || !isScriptLoaded}
    >
      {isLoading ? "Processing..." : buttonText}
    </Button>
  );
};

export default PaymentButton;
