import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PayNowItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

interface PayNowButtonProps {
  amount: number;
  productName: string;
  productDescription?: string;
  items: PayNowItem[];
  notes?: Record<string, string>;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
  label?: string;
  onPaid?: (paymentId: string, orderId: string) => void;
}

/**
 * Reusable Razorpay "pay now" button: creates the order via the razorpay edge
 * function, records the paid order in the database and redirects to the
 * payment success page.
 */
const PayNowButton: React.FC<PayNowButtonProps> = ({
  amount,
  productName,
  productDescription,
  items,
  notes,
  className = "",
  variant,
  size,
  disabled = false,
  label,
  onPaid,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { initiatePayment, loading } = useRazorpay({
    onSuccess: async (result) => {
      if (result.payment_id && result.order_id) {
        try {
          const orderData = {
            ...(user?.uid ? { user_id: user.uid } : {}),
            razorpay_order_id: result.order_id,
            razorpay_payment_id: result.payment_id,
            amount,
            currency: "INR",
            status: "paid",
            items,
            customer_name: user?.displayName || "",
            customer_email: user?.email || "",
            notes: productName,
          };
          const { error } = await supabase.from("orders").insert(orderData);
          if (error) console.error("Error saving order:", error);
        } catch (err) {
          console.error("Error processing order:", err);
        }

        onPaid?.(result.payment_id, result.order_id);
        navigate(
          `/payment-success?order_id=${result.order_id}&payment_id=${result.payment_id}&title=${encodeURIComponent(
            productName
          )}&amount=${amount}`
        );
      }
      setIsProcessing(false);
    },
    onError: (error) => {
      setIsProcessing(false);
      toast.error(error);
    },
  });

  const handleClick = async () => {
    if (!amount || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }
    setIsProcessing(true);
    await initiatePayment({
      amount,
      productName,
      productDescription,
      customerName: user?.displayName || "",
      customerEmail: user?.email || "",
      notes: {
        user_id: user?.uid || "guest",
        ...(notes || {}),
      },
    });
  };

  const isLoading = loading || isProcessing;

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className}
      variant={variant}
      size={size}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {label || `Pay ₹${amount.toLocaleString("en-IN")}`}
        </>
      )}
    </Button>
  );
};

export default PayNowButton;
