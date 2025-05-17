
import React from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";
import { IndianRupee, Leaf } from "lucide-react";

interface ServicePaymentButtonProps {
  amount: number;
  title: string;
  buttonText?: string;
  className?: string;
  serviceId?: string;
  serviceType: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  disabled?: boolean;
}

const ServicePaymentButton = ({
  amount,
  title,
  buttonText = "Book This Service",
  className = "",
  serviceId,
  serviceType,
  customerInfo,
  disabled = false
}: ServicePaymentButtonProps) => {
  const { isLoading, isScriptLoaded, handlePayment } = usePayment({
    amount,
    title,
    bookingDetails: {
      type: serviceType,
      serviceId,
    },
    customerInfo
  });
  
  return (
    <Button 
      onClick={handlePayment}
      className={`bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 ${className}`}
      disabled={isLoading || !isScriptLoaded || disabled}
    >
      {isLoading ? "Processing..." : (
        <>
          <IndianRupee className="h-4 w-4" />
          {buttonText}
          <Leaf className="h-4 w-4 ml-1" />
        </>
      )}
    </Button>
  );
};

export default ServicePaymentButton;
