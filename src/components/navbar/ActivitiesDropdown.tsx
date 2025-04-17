
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";

export const ActivitiesDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent px-2 py-2 text-xs lg:text-sm`}>Activities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-white border border-border/20 shadow-md rounded-md">
              <DropdownListItem
                href="/adventures"
                title="Stress-Free Adventures"
                className="hover:bg-meant-50 bg-white"
              >
                Enjoy therapeutic outdoor activities and retreats
              </DropdownListItem>
              <DropdownListItem
                href="/games"
                title="Mental Health Games"
                className="hover:bg-meant-50 bg-white"
              >
                Fun activities designed to boost mood and reduce stress
              </DropdownListItem>
              <li className="col-span-2 mt-2 bg-white">
                <Link to="/" className="text-sm text-primary hover:underline flex justify-center">
                  View All Activities
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
