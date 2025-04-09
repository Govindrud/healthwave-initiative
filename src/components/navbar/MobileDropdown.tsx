
import React from "react";
import { ChevronDown } from "lucide-react";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ title, children }) => {
  const mobileNavLinkClass = "text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium text-center";

  return (
    <div className="relative">
      <div className={`${mobileNavLinkClass} flex justify-between items-center`}>
        <span>{title}</span>
        <ChevronDown size={16} />
      </div>
      <div className="ml-4 mt-1 space-y-1">
        {children}
      </div>
    </div>
  );
};
