
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRegion, Currency, Language } from "@/context/RegionContext";
import { Globe, Languages } from "lucide-react";

interface RegionSelectorProps {
  variant?: "minimal" | "full";
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ variant = "full" }) => {
  const { currency, language, setCurrency, setLanguage } = useRegion();

  const currencies: { value: Currency; label: string; symbol: string }[] = [
    { value: "INR", label: "Indian Rupee", symbol: "₹" },
    { value: "USD", label: "US Dollar", symbol: "$" },
    { value: "EUR", label: "Euro", symbol: "€" },
    { value: "JPY", label: "Japanese Yen", symbol: "¥" }
  ];

  const languages: { value: Language; label: string }[] = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी (Hindi)" },
    { value: "mr", label: "मराठी (Marathi)" }
  ];

  return (
    <div className="flex gap-2">
      {/* Currency dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <span className="font-semibold">
              {currencies.find(c => c.value === currency)?.symbol}
            </span>
            {variant === "full" && (
              <span className="hidden md:inline">
                {currencies.find(c => c.value === currency)?.value}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currencies.map((c) => (
            <DropdownMenuItem 
              key={c.value}
              onClick={() => setCurrency(c.value)}
              className={currency === c.value ? "bg-muted" : ""}
            >
              <span className="font-semibold mr-2">{c.symbol}</span>
              {c.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Language dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Languages size={16} />
            {variant === "full" && (
              <span className="hidden md:inline">
                {language.toUpperCase()}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={language === lang.value ? "bg-muted" : ""}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RegionSelector;
