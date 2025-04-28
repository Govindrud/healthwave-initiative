
import React, { createContext, useContext, useState, useEffect } from "react";

export type RegionType = "india" | "global";
export type Currency = "INR" | "USD" | "EUR" | "JPY";
export type Language = "en" | "hi" | "mr";

interface RegionContextType {
  region: RegionType;
  setRegion: (region: RegionType) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  formatPrice: (amount: number) => string;
}

const defaultContextValue: RegionContextType = {
  region: "india",
  setRegion: () => {},
  currency: "INR",
  setCurrency: () => {},
  language: "en",
  setLanguage: () => {},
  formatPrice: () => ""
};

const RegionContext = createContext<RegionContextType>(defaultContextValue);

export const useRegion = () => useContext(RegionContext);

export const RegionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [region, setRegion] = useState<RegionType>("india");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [language, setLanguage] = useState<Language>("en");
  
  // Update currency when region changes
  useEffect(() => {
    if (region === "india") {
      setCurrency("INR");
    } else {
      setCurrency("USD");
    }
  }, [region]);
  
  // Update language when region changes
  useEffect(() => {
    if (region === "india") {
      setLanguage("hi");
    } else {
      setLanguage("en");
    }
  }, [region]);
  
  // Format price based on currency
  const formatPrice = (amount: number): string => {
    switch(currency) {
      case "INR":
        return `₹${amount.toLocaleString("en-IN")}`;
      case "USD":
        return `$${(amount / 80).toFixed(2)}`;
      case "EUR":
        return `€${(amount / 90).toFixed(2)}`;
      case "JPY":
        return `¥${Math.round(amount * 0.55).toLocaleString()}`;
      default:
        return `${amount}`;
    }
  };
  
  return (
    <RegionContext.Provider value={{ 
      region, 
      setRegion, 
      currency, 
      setCurrency, 
      language, 
      setLanguage, 
      formatPrice 
    }}>
      {children}
    </RegionContext.Provider>
  );
};
