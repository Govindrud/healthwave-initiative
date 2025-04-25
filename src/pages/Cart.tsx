
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import MainLayout from "@/components/layouts/MainLayout";
import { toast } from "sonner";
import { initializeRazorpay, initiatePayment } from "@/utils/payments";
import CartTable from "@/components/cart/CartTable";
import CartSummary from "@/components/cart/CartSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import { ArrowLeft } from "lucide-react";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

type CartItem = {
  product: ReturnType<typeof getFeaturedProducts>[0];
  quantity: number;
};

const Cart = () => {
  useEffect(() => {
    document.title = "Your Cart | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  // INTERACTIVE cart: use state instead of static mockCart
  const [cart, setCart] = useState<CartItem[]>(
    getFeaturedProducts(2).map(product => ({
      product,
      quantity: 1
    }))
  );
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();
  const { formatPrice } = useRegion();
  const { t } = useTranslation();

  const handleQuantityChange = (index: number, delta: number) => {
    setCart(cart =>
      cart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (index: number) => {
    setCart(cart => cart.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal === 0 ? 0 : (subtotal > 1500 ? 0 : 100);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  // Simple customer info (could be replaced with user profile if available)
  const customerInfo = {
    name: "Test User",
    email: "testuser@example.com",
    phone: "9999999999"
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setIsPaying(true);
    toast.info("Setting up payment gateway...");

    const description = cart
      .map(item => `${item.product.name} x${item.quantity}`)
      .join(", ");

    initializeRazorpay(() => {
      initiatePayment({
        amount: Math.round(total),
        description: `Cart purchase: ${description}`,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        orderId: `ORDER${Date.now()}`,
        successCallback: (response) => {
          setIsPaying(false);
          toast.success("Payment successful!");
          navigate(
            `/payment-success?payment_id=${response.razorpay_payment_id}&amount=${total}`
          );
        },
        errorCallback: (error) => {
          setIsPaying(false);
          let errorMessage = "Payment failed. Please try again.";
          if (error?.error?.description) {
            errorMessage = `Payment failed: ${error.error.description}`;
          } else if (typeof error === "string") {
            errorMessage = error;
          }
          toast.error(errorMessage);
        }
      });
    });
  };

  if (cart.length === 0) {
    return (
      <MainLayout>
        <CartEmptyState />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center text-meant-600 hover:text-meant-800 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          {t('continue_shopping')}
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">{t('your_cart')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTable
              cart={cart}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </div>
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              isPaying={isPaying}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
