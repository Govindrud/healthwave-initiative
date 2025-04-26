
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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-background px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors">
            Activities
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-background border border-border shadow-lg rounded-md">
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
