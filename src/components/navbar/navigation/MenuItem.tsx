
import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface MenuItemProps {
  title: string;
  href: string;
  description: string;
  icon?: React.ElementType | React.ReactNode;
}

export const MenuItem = ({ title, href, description, icon }: MenuItemProps) => {
  // Check if icon is a function component
  const isComponentIcon = typeof icon === 'function';
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            {isComponentIcon ? (
              React.createElement(icon as React.ElementType, { className: "h-4 w-4 text-meant-600" })
            ) : (
              icon && <div className="h-4 w-4 text-meant-600">{icon}</div>
            )}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
