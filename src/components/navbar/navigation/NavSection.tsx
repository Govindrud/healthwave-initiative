
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import { Link } from "react-router-dom";

interface NavSectionProps {
  title: string;
  items: Array<{
    title: string;
    href: string;
    description: string;
    icon?: React.ElementType | React.ReactNode;
  }>;
  isLink?: boolean;
}

export const NavSection = ({ title, items, isLink = false }: NavSectionProps) => {
  if (isLink) {
    return (
      <NavigationMenuItem>
        <Link to={items[0].href} className="font-medium text-meant-700 hover:text-meant-900 mr-6">
          {title}
        </Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="z-30">{title}</NavigationMenuTrigger>
      <NavigationMenuContent className="z-50 bg-white shadow-md border border-gray-100 rounded-md">
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
          {items.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
