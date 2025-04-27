
import { useContext } from "react";
import { useRegion } from "@/context/RegionContext";

// English translations
const translations = {
  en: {
    your_cart: "Your Cart",
    continue_shopping: "Continue Shopping",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    free: "Free",
    proceed_to_checkout: "Proceed to Checkout",
    processing_payment: "Processing Payment...",
    your_cart_is_empty: "Your cart is empty",
    cart_empty_message: "Looks like you haven't added any items to your cart yet. Browse our products or services to get started.",
    browse_products: "Browse Products",
    explore_services: "Explore Services",
    free_shipping: "Free Shipping",
    free_shipping_message: "Free shipping on all orders over ₹1,500",
    secure_payment: "Secure Payment",
    secure_payment_message: "All transactions are secure and encrypted",
    quality_guarantee: "Quality Guarantee",
    quality_guarantee_message: "We stand behind the quality of our products and services",
    product: "Product",
    price: "Price",
    quantity: "Quantity",
    actions: "Actions"
  },
  hi: {
    your_cart: "आपकी कार्ट",
    continue_shopping: "शॉपिंग जारी रखें",
    subtotal: "उप-योग",
    shipping: "शिपिंग",
    tax: "कर",
    total: "कुल",
    free: "फ्री",
    proceed_to_checkout: "चेकआउट करें",
    processing_payment: "भुगतान प्रोसेस हो रहा है...",
    your_cart_is_empty: "आपकी कार्ट खाली है",
    cart_empty_message: "ऐसा लगता है कि आपने अभी तक अपनी कार्ट में कोई आइटम नहीं जोड़ा है। आरंभ करने के लिए हमारे उत्पादों या सेवाओं को ब्राउज़ करें।",
    browse_products: "उत्पादों को ब्राउज़ करें",
    explore_services: "सेवाओं का अन्वेषण करें",
    free_shipping: "मुफ्त शिपिंग",
    free_shipping_message: "₹1,500 से अधिक के सभी ऑर्डर पर मुफ्त शिपिंग",
    secure_payment: "सुरक्षित भुगतान",
    secure_payment_message: "सभी लेनदेन सुरक्षित और एन्क्रिप्टेड हैं",
    quality_guarantee: "गुणवत्ता की गारंटी",
    quality_guarantee_message: "हम अपने उत्पादों और सेवाओं की गुणवत्ता का समर्थन करते हैं",
    product: "उत्पाद",
    price: "कीमत",
    quantity: "मात्रा",
    actions: "कार्रवाई"
  }
};

export const useTranslation = () => {
  const { region } = useRegion();
  const locale = region === "india" ? "hi" : "en";
  
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };
  
  return { t, locale };
};
