import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, CreditCard } from "lucide-react";

interface RazorpayCheckoutProps {
  amount: number;
  productName: string;
  productDescription?: string;
  onSuccess?: (paymentId: string, orderId: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  amount,
  productName,
  productDescription,
  onSuccess,
  onError,
  disabled = false,
  className = "",
  children,
}) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const { initiatePayment, loading } = useRazorpay({
    onSuccess: (result) => {
      setIsProcessing(false);
      if (result.payment_id && result.order_id) {
        onSuccess?.(result.payment_id, result.order_id);
      }
    },
    onError: (error) => {
      setIsProcessing(false);
      onError?.(error);
    },
  });

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    await initiatePayment({
      amount,
      productName,
      productDescription,
      customerName: user?.displayName || "",
      customerEmail: user?.email || "",
      customerPhone: "",
      notes: {
        user_id: user?.uid || "guest",
      },
    });
  };

  const isLoading = loading || isProcessing;

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : children ? (
        children
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay ₹{amount.toLocaleString("en-IN")}
        </>
      )}
    </Button>
  );
};

export default RazorpayCheckout;