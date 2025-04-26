
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRegion, Currency, Language } from "@/context/RegionContext";
import { Globe, Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

interface RegionSelectorProps {
  variant?: "minimal" | "full";
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ variant = "full" }) => {
  const { currency, language, setCurrency, setLanguage } = useRegion();
  const { t } = useTranslation();

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

  // For desktop view (dropdown)
  if (variant === "minimal") {
    return (
      <div className="flex gap-2">
        {/* Currency dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span className="font-semibold">
                {currencies.find(c => c.value === currency)?.symbol}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
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
  }

  // For mobile view (full selectors)
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Currency selector */}
      <div>
        <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {currencies.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{c.symbol}</span>
                  <span className="hidden sm:inline">{c.label}</span>
                  <span className="sm:hidden">{c.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language selector */}
      <div>
        <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RegionSelector;
