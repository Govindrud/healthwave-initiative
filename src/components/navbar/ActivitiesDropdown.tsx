
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownContent } from "./common/DropdownContent";
import { activitiesItems } from "@/config/navigation";

export const ActivitiesDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-white px-2 py-2 text-xs lg:text-sm`}>
            Activities
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white border border-border shadow-lg">
            <DropdownContent 
              items={activitiesItems}
              showViewAll={{
                href: "/activities",
                label: "View All Activities"
              }}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
