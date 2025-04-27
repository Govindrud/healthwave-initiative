
import React, { createContext, useContext, useState, useEffect } from "react";

type RegionType = "india" | "global";

interface RegionContextType {
  region: RegionType;
  setRegion: (region: RegionType) => void;
  currency: string;
  formatPrice: (amount: number) => string;
}

const RegionContext = createContext<RegionContextType>({
  region: "india",
  setRegion: () => {},
  currency: "INR",
  formatPrice: () => ""
});

export const useRegion = () => useContext(RegionContext);

export const RegionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [region, setRegion] = useState<RegionType>("india");
  
  // Format price based on region
  const formatPrice = (amount: number): string => {
    if (region === "india") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return `$${(amount / 80).toFixed(2)}`;
  };
  
  // Currency based on region
  const currency = region === "india" ? "INR" : "USD";
  
  return (
    <RegionContext.Provider value={{ region, setRegion, currency, formatPrice }}>
      {children}
    </RegionContext.Provider>
  );
};
