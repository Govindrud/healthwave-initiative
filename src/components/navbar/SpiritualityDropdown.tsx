
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownContent } from "./common/DropdownContent";
import { Heart, Book, MapPin, Video, Sparkles } from "lucide-react";
import { spiritualityItems } from "@/config/navigation";

export const SpiritualityDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-white px-2 py-2 text-xs lg:text-sm`}>
            Spirituality
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white border border-border shadow-lg">
            <DropdownContent 
              items={spiritualityItems} 
              showViewAll={{
                href: "/spirituality",
                label: "View All Spiritual Services"
              }}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
