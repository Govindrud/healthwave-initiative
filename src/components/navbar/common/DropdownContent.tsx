
import React from "react";
import { DropdownListItem } from "../DropdownListItem";

interface NavigationItem {
  href: string;
  title: string;
  icon?: React.ElementType | React.ReactNode;
  description: string;
}

interface DropdownContentProps {
  items: NavigationItem[];
  columns?: number;
  showViewAll?: {
    href: string;
    label: string;
  };
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  items,
  columns = 2,
  showViewAll
}) => {
  return (
    <ul className={`grid gap-3 p-4 md:w-[400px] lg:w-[500px] ${columns === 2 ? 'lg:grid-cols-2' : ''} bg-white border border-border/20 shadow-md rounded-md`}>
      {items.map((item) => {
        // Safe check for function type icon
        const isComponentIcon = typeof item.icon === 'function';
        
        // Create a properly typed icon element
        let iconElement: React.ReactNode = null;
        if (item.icon) {
          if (isComponentIcon) {
            // For component icons, explicitly create the element
            const IconComponent = item.icon as React.ElementType;
            iconElement = React.createElement(IconComponent, { className: "h-4 w-4 text-meant-600" });
          } else {
            // For regular ReactNode icons
            iconElement = item.icon;
          }
        }
        
        return (
          <DropdownListItem
            key={item.title}
            href={item.href}
            title={item.title}
            icon={iconElement}
            className="hover:bg-meant-50 bg-white"
          >
            {item.description}
          </DropdownListItem>
        );
      })}
      {showViewAll && (
        <li className={`${columns === 2 ? 'col-span-2' : ''} mt-2 bg-white`}>
          <a href={showViewAll.href} className="text-sm text-primary hover:underline flex justify-center">
            {showViewAll.label}
          </a>
        </li>
      )}
    </ul>
  );
};
