
import React from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";
import { IndianRupee } from "lucide-react";

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
  disabled?: boolean; // Added disabled prop
}

const ServicePaymentButton = ({
  amount,
  title,
  buttonText = "Book This Service",
  className = "",
  serviceId,
  serviceType,
  customerInfo,
  disabled = false // Added with default value
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
      className={`bg-meant-600 hover:bg-meant-700 text-white ${className}`}
      disabled={isLoading || !isScriptLoaded || disabled} // Updated to include the disabled prop
    >
      {isLoading ? "Processing..." : (
        <>
          <IndianRupee className="mr-2 h-4 w-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
};

export default ServicePaymentButton;
