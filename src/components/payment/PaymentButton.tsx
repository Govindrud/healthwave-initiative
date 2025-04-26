
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";

interface BookingDetails {
  date?: string;
  time?: string;
  location?: string;
  duration?: string;
  participants?: number;
  type?: string;
  serviceId?: string;
  doctorId?: string;
  provider?: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface PaymentButtonProps {
  amount: number;
  title: string;
  bookingDetails: BookingDetails;
  customerInfo: CustomerInfo;
  className?: string;
  onBeforePayment?: () => void;
  onAfterPayment?: (paymentId: string) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  title,
  bookingDetails,
  customerInfo,
  className = "",
  onBeforePayment,
  onAfterPayment
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const processPayment = async () => {
    // Run the before payment hook if provided
    if (onBeforePayment) {
      onBeforePayment();
    }

    setLoading(true);

    try {
      // In a real app, this would be an API call to your payment processor
      // For this demo, we'll simulate a successful payment
      console.log("Processing payment for:", {
        amount,
        title,
        bookingDetails,
        customerInfo
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock payment ID
      const paymentId = `PAY-${Math.random().toString(36).substr(2, 9)}`;
      
      // Run the after payment hook if provided
      if (onAfterPayment) {
        onAfterPayment(paymentId);
      }

      // Build query params for success page
      const queryParams = new URLSearchParams({
        payment_id: paymentId,
        title,
        amount: amount.toString(),
        name: customerInfo.name,
        email: customerInfo.email,
        provider: bookingDetails.provider || ""
      });
      
      // Add date and time if available
      if (bookingDetails.date) queryParams.append("date", bookingDetails.date);
      if (bookingDetails.time) queryParams.append("time", bookingDetails.time);
      if (bookingDetails.location) queryParams.append("location", bookingDetails.location);

      // Redirect to success page
      navigate(`/payment-success?${queryParams.toString()}`);
      
      // Store transaction in local storage for demo purposes
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      transactions.push({
        id: paymentId,
        title,
        amount,
        date: new Date().toISOString(),
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        bookingDetails
      });
      localStorage.setItem("transactions", JSON.stringify(transactions));
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={processPayment}
      className={`bg-meant-600 hover:bg-meant-700 text-white ${className}`}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center">
          <span className="animate-spin mr-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          Processing...
        </span>
      ) : (
        <>
          <IndianRupee className="mr-2 h-4 w-4" />
          Pay ₹{amount}
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
