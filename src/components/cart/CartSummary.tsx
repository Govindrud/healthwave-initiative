
import React from "react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isPaying: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  isPaying,
  onCheckout,
}) => {
  const { formatPrice } = useRegion();
  const { t } = useTranslation();
  
  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>{t('subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('shipping')}</span>
          <span>{shipping > 0 ? formatPrice(shipping) : t('free')}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('tax')}</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between font-semibold">
            <span>{t('total')}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      <Button
        className="w-full bg-meant-600 hover:bg-meant-700 rounded-full"
        onClick={onCheckout}
        disabled={isPaying}
      >
        {isPaying ? t('processing_payment') : t('proceed_to_checkout')}
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
};

export default CartSummary;
