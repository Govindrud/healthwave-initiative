import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface PaymentResult {
  success: boolean;
  payment_id?: string;
  order_id?: string;
  error?: string;
}

interface UseRazorpayOptions {
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

export const useRazorpay = (options: UseRazorpayOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script
  const loadScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      if (scriptLoaded || window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setScriptLoaded(true);
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, [scriptLoaded]);

  // Create Razorpay order
  const createOrder = async (amount: number, receipt: string, notes?: Record<string, string>) => {
    const { data, error } = await supabase.functions.invoke("razorpay", {
      body: {
        action: "create_order",
        amount,
        currency: "INR",
        receipt,
        notes,
      },
    });

    if (error) throw new Error(error.message);
    if (!data.success) throw new Error(data.error || "Failed to create order");

    return { order: data.order as RazorpayOrder, keyId: data.key_id };
  };

  // Verify payment
  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    const { data, error } = await supabase.functions.invoke("razorpay", {
      body: {
        action: "verify_payment",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  };

  // Initiate payment
  const initiatePayment = useCallback(
    async ({
      amount,
      productName,
      productDescription,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    }: {
      amount: number;
      productName: string;
      productDescription?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      notes?: Record<string, string>;
    }): Promise<PaymentResult> => {
      setLoading(true);

      try {
        // Load Razorpay script
        const loaded = await loadScript();
        if (!loaded) {
          throw new Error("Failed to load Razorpay SDK");
        }

        // Create order
        const receipt = `receipt_${Date.now()}`;
        const { order, keyId } = await createOrder(amount, receipt, notes);

        return new Promise((resolve) => {
          const razorpayOptions = {
            key: keyId,
            amount: order.amount,
            currency: order.currency,
            name: "MeantToHelp",
            description: productDescription || productName,
            order_id: order.id,
            handler: async function (response: any) {
              try {
                // Verify payment
                const verification = await verifyPayment(
                  response.razorpay_order_id,
                  response.razorpay_payment_id,
                  response.razorpay_signature
                );

                if (verification.success) {
                  const result: PaymentResult = {
                    success: true,
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                  };
                  options.onSuccess?.(result);
                  toast.success("Payment successful!");
                  resolve(result);
                } else {
                  const error = "Payment verification failed";
                  options.onError?.(error);
                  toast.error(error);
                  resolve({ success: false, error });
                }
              } catch (err: any) {
                const error = err.message || "Payment verification failed";
                options.onError?.(error);
                toast.error(error);
                resolve({ success: false, error });
              } finally {
                setLoading(false);
              }
            },
            prefill: {
              name: customerName || "",
              email: customerEmail || "",
              contact: customerPhone || "",
            },
            notes: {
              product_name: productName,
              ...notes,
            },
            theme: {
              color: "#059669", // meant-600
            },
            modal: {
              ondismiss: function () {
                setLoading(false);
                const result: PaymentResult = {
                  success: false,
                  error: "Payment cancelled",
                };
                resolve(result);
              },
            },
          };

          const razorpay = new window.Razorpay(razorpayOptions);
          razorpay.on("payment.failed", function (response: any) {
            const error = response.error.description || "Payment failed";
            options.onError?.(error);
            toast.error(error);
            setLoading(false);
            resolve({ success: false, error });
          });
          razorpay.open();
        });
      } catch (error: any) {
        const errorMessage = error.message || "Failed to initiate payment";
        options.onError?.(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }
    },
    [loadScript, options]
  );

  return {
    initiatePayment,
    loading,
    loadScript,
  };
};