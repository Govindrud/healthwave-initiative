
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
}

const ServicePaymentButton = ({
  amount,
  title,
  buttonText = "Book This Service",
  className = "",
  serviceId,
  serviceType,
  customerInfo
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
      disabled={isLoading || !isScriptLoaded}
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
