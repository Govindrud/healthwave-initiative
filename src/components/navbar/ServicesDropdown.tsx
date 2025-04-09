
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
                title="All Services"
                className="hover:bg-meant-50"
              >
                Browse our complete range of mental health services
              </DropdownListItem>
              <DropdownListItem
                href="/doctors"
                title="Doctor Consultations"
                className="hover:bg-meant-50"
              >
                Connect with experienced mental health professionals
              </DropdownListItem>
              <DropdownListItem
                href="/student-psychologists"
                title="Student Psychologists"
                className="hover:bg-meant-50"
              >
                Affordable counseling with supervised students
              </DropdownListItem>
              <DropdownListItem
                href="/webinars"
                title="Mental Health Webinars"
                className="hover:bg-meant-50"
              >
                Join expert-led online sessions and workshops
              </DropdownListItem>
              <DropdownListItem
                href="/corporate-plans"
                title="Corporate Mental Health"
                className="hover:bg-meant-50"
              >
                Solutions for businesses and organizations
              </DropdownListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
