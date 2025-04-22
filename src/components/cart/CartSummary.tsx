
import React from "react";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isPaying: boolean;
  onCheckout: () => void;
  formatINR: (val: number) => string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  isPaying,
  onCheckout,
  formatINR,
}) => (
  <div className="border rounded-lg p-6">
    <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatINR(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping > 0 ? formatINR(shipping) : "Free"}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax (18% GST)</span>
        <span>{formatINR(tax)}</span>
      </div>
      <div className="pt-3 border-t">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>
    </div>
    <Button
      className="w-full bg-meant-600 hover:bg-meant-700 rounded-full"
      onClick={onCheckout}
      disabled={isPaying}
    >
      {isPaying ? "Processing Payment..." : "Proceed to Checkout"}
    </Button>
    <div className="mt-6 space-y-3">
      <div className="text-xs text-muted-foreground text-center">
        <p>We accept the following payment methods:</p>
        <div className="flex justify-center gap-2 mt-2">
          <div className="bg-muted/50 rounded p-1">Visa</div>
          <div className="bg-muted/50 rounded p-1">Mastercard</div>
          <div className="bg-muted/50 rounded p-1">PayPal</div>
        </div>
      </div>
    </div>
  </div>
);

export default CartSummary;
