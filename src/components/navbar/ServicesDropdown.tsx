
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownContent } from "./common/DropdownContent";
import { servicesItems } from "@/config/navigation";

export const ServicesDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-white px-2 py-2 text-xs lg:text-sm`}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white border border-border shadow-lg">
            <DropdownContent items={servicesItems} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
