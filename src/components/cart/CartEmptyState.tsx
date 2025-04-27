
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const CartEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-6 bg-meant-50 rounded-full mb-6">
          <ShoppingCart className="h-12 w-12 text-meant-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('your_cart_is_empty')}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {t('cart_empty_message')}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-meant-600 hover:bg-meant-700 px-6">
            <Link to="/products">{t('browse_products')}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/services">{t('explore_services')}</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold mb-2">{t('free_shipping')}</h3>
          <p className="text-muted-foreground text-sm">
            {t('free_shipping_message')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold mb-2">{t('secure_payment')}</h3>
          <p className="text-muted-foreground text-sm">
            {t('secure_payment_message')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h3 className="font-semibold mb-2">{t('quality_guarantee')}</h3>
          <p className="text-muted-foreground text-sm">
            {t('quality_guarantee_message')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartEmptyState;
