
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
          <NavigationMenuTrigger className="bg-transparent hover:bg-accent px-3 py-2 mx-1 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors">
            Activities
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-[100] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
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
