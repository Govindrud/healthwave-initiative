
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
  // Safe check for function type icon
  const isComponentIcon = typeof icon === 'function';
  
  // Create a properly typed icon element
  let iconElement: React.ReactNode = null;
  if (isComponentIcon && icon) {
    const IconComponent = icon as React.ElementType;
    // Use React.createElement instead of JSX for component icons
    iconElement = React.createElement(IconComponent, { className: "h-4 w-4 text-meant-600" });
  } else if (icon) {
    iconElement = <div className="h-4 w-4 text-meant-600">{icon}</div>;
  }
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            {iconElement}
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
