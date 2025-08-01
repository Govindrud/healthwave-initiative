
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
    <ul className={`grid gap-3 p-4 md:w-[400px] lg:w-[500px] ${columns === 2 ? 'lg:grid-cols-2' : ''} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm`}>
      {items.map((item) => {
        // Create a properly typed icon element
        let iconElement: React.ReactNode = null;
        
        if (item.icon) {
          if (React.isValidElement(item.icon)) {
            // If it's already a React element, use it directly
            iconElement = item.icon;
          } else if (typeof item.icon === 'function') {
            // For function components (like Lucide icons)
            const IconComponent = item.icon as React.ElementType;
            iconElement = <IconComponent className="h-4 w-4 text-meant-600" />;
          }
        }
        
        return (
          <DropdownListItem
            key={item.title}
            href={item.href}
            title={item.title}
            icon={iconElement}
            className="hover:bg-meant-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 rounded-md transition-colors"
          >
            {item.description}
          </DropdownListItem>
        );
      })}
      {showViewAll && (
        <li className={`${columns === 2 ? 'col-span-2' : ''} mt-2 bg-white dark:bg-gray-800`}>
          <a href={showViewAll.href} className="text-sm text-primary dark:text-primary-300 hover:underline flex justify-center py-2">
            {showViewAll.label}
          </a>
        </li>
      )}
    </ul>
  );
};
