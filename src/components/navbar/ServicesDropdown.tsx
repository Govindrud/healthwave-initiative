
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";

export const ServicesDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent p-0`}>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <DropdownListItem
                href="/services"
                title="Mental Health Services"
                className="hover:bg-meant-50"
              >
                Professional support for your mental wellbeing
              </DropdownListItem>
              <DropdownListItem
                href="/corporate-plans"
                title="Corporate Wellness"
                className="hover:bg-meant-50"
              >
                Mental health solutions for workplace productivity
              </DropdownListItem>
              <DropdownListItem
                href="/de-addiction"
                title="De-Addiction Programs"
                className="hover:bg-meant-50"
              >
                Expert guidance for addiction recovery
              </DropdownListItem>
              <DropdownListItem
                href="/webinars"
                title="Educational Webinars"
                className="hover:bg-meant-50"
              >
                Learn from mental health experts online
              </DropdownListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
