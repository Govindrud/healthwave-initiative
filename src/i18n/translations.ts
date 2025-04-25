
import { Language } from "@/context/RegionContext";

type TranslationKeys = 
  | "add_to_cart" 
  | "view_details"
  | "continue_shopping"
  | "your_cart"
  | "empty_cart"
  | "browse_products"
  | "subtotal"
  | "shipping"
  | "tax"
  | "total"
  | "free"
  | "proceed_to_checkout"
  | "processing_payment"
  | "product"
  | "quantity"
  | "price"
  | "no_products_found"
  | "admin_login"
  | "password"
  | "login"
  | "forgot_password";

type Translations = Record<TranslationKeys, string>;
type AllTranslations = Record<Language, Translations>;

const translations: AllTranslations = {
  "en": {
    add_to_cart: "Add to Cart",
    view_details: "View Details",
    continue_shopping: "Continue Shopping",
    your_cart: "Your Shopping Cart",
    empty_cart: "Your Cart is Empty",
    browse_products: "Browse Products",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax (18% GST)",
    total: "Total",
    free: "Free",
    proceed_to_checkout: "Proceed to Checkout",
    processing_payment: "Processing Payment...",
    product: "Product",
    quantity: "Quantity",
    price: "Price",
    no_products_found: "No products found",
    admin_login: "Admin Login",
    password: "Password",
    login: "Login",
    forgot_password: "Forgot your password?"
  },
  "hi": {
    add_to_cart: "कार्ट में जोड़ें",
    view_details: "विवरण देखें",
    continue_shopping: "खरीदारी जारी रखें",
    your_cart: "आपकी शॉपिंग कार्ट",
    empty_cart: "आपकी कार्ट खाली है",
    browse_products: "उत्पाद ब्राउज़ करें",
    subtotal: "उप-कुल",
    shipping: "शिपिंग",
    tax: "कर (18% GST)",
    total: "कुल",
    free: "मुफ्त",
    proceed_to_checkout: "भुगतान करें",
    processing_payment: "भुगतान प्रक्रिया जारी...",
    product: "उत्पाद",
    quantity: "मात्रा",
    price: "कीमत",
    no_products_found: "कोई उत्पाद नहीं मिला",
    admin_login: "व्यवस्थापक लॉगिन",
    password: "पासवर्ड",
    login: "लॉगिन",
    forgot_password: "अपना पासवर्ड भूल गए?"
  },
  "mr": {
    add_to_cart: "कार्टमध्ये जोडा",
    view_details: "तपशील पहा",
    continue_shopping: "खरेदी सुरू ठेवा",
    your_cart: "आपली खरेदी कार्ट",
    empty_cart: "आपली कार्ट रिकामी आहे",
    browse_products: "उत्पादने ब्राउझ करा",
    subtotal: "एकूण",
    shipping: "वाहतूक",
    tax: "कर (18% GST)",
    total: "एकूण",
    free: "मोफत",
    proceed_to_checkout: "पेमेंट करा",
    processing_payment: "पेमेंट प्रक्रिया सुरू आहे...",
    product: "उत्पादन",
    quantity: "प्रमाण",
    price: "किंमत",
    no_products_found: "कोणतीही उत्पादने सापडली नाहीत",
    admin_login: "प्रशासक लॉगिन",
    password: "पासवर्ड",
    login: "लॉगिन",
    forgot_password: "पासवर्ड विसरलात?"
  }
};

// Translation hook
export const getTranslation = (
  language: Language, 
  key: TranslationKeys, 
  fallback?: string
): string => {
  if (!translations[language]) {
    return fallback || translations.en[key] || key;
  }
  
  return translations[language][key] || fallback || translations.en[key] || key;
};
