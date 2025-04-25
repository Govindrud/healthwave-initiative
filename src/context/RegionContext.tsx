
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type Currency = "INR" | "USD" | "EUR" | "JPY";
export type Language = "en" | "hi" | "mr";

interface RegionContextType {
  currency: Currency;
  language: Language;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  formatPrice: (price: number) => string;
}

const DEFAULT_CURRENCY: Currency = "USD";
const DEFAULT_LANGUAGE: Language = "en";

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  // Detect user's region on initial load
  useEffect(() => {
    const detectRegion = async () => {
      try {
        // Try to get user's country from browser
        const userLanguage = navigator.language;
        let detectedCurrency: Currency = DEFAULT_CURRENCY;
        let detectedLanguage: Language = DEFAULT_LANGUAGE;
        
        // Map country code to currency
        if (userLanguage.includes("en")) {
          detectedLanguage = "en";
        } else if (userLanguage.includes("hi")) {
          detectedLanguage = "hi";
          detectedCurrency = "INR";
        } else if (userLanguage.includes("mr")) {
          detectedLanguage = "mr";
          detectedCurrency = "INR";
        }
        
        // Try to get currency based on IP geolocation (fallback)
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          
          if (data.country === "IN") {
            detectedCurrency = "INR";
          } else if (data.country_code === "JP") {
            detectedCurrency = "JPY";
          } else if (data.continent_code === "EU") {
            detectedCurrency = "EUR";
          }
        } catch (error) {
          console.log("Could not detect region from IP, using browser locale");
        }
        
        setCurrency(detectedCurrency);
        setLanguage(detectedLanguage);
        
      } catch (error) {
        console.error("Error detecting region:", error);
        // Fall back to defaults
        setCurrency(DEFAULT_CURRENCY);
        setLanguage(DEFAULT_LANGUAGE);
      }
    };

    // Check for stored preferences first
    const storedCurrency = localStorage.getItem("user-currency") as Currency;
    const storedLanguage = localStorage.getItem("user-language") as Language;
    
    if (storedCurrency) {
      setCurrency(storedCurrency);
    } else {
      detectRegion();
    }
    
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("user-currency", currency);
  }, [currency]);
  
  useEffect(() => {
    localStorage.setItem("user-language", language);
  }, [language]);

  // Handler to update currency
  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    toast.success(`Currency changed to ${newCurrency}`);
  };
  
  // Handler to update language
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${getLanguageName(newLanguage)}`);
  };
  
  // Function to format price based on currency
  const formatPrice = (price: number): string => {
    switch (currency) {
      case "INR":
        return `₹${price.toLocaleString("en-IN")}`;
      case "USD":
        return `$${price.toLocaleString("en-US")}`;
      case "EUR":
        return `€${price.toLocaleString("de-DE")}`;
      case "JPY":
        return `¥${price.toLocaleString("ja-JP")}`;
      default:
        return `$${price.toLocaleString("en-US")}`;
    }
  };
  
  // Helper function to get language name
  const getLanguageName = (lang: Language): string => {
    switch (lang) {
      case "en": return "English";
      case "hi": return "हिन्दी (Hindi)";
      case "mr": return "मराठी (Marathi)";
      default: return "English";
    }
  };

  return (
    <RegionContext.Provider 
      value={{ 
        currency, 
        language, 
        setCurrency: handleSetCurrency, 
        setLanguage: handleSetLanguage,
        formatPrice
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = (): RegionContextType => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
