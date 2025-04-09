
import React from "react";
import { Link } from "react-router-dom";

interface DropdownListItemProps {
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  href,
  title,
  children,
  className = "",
  icon
}) => {
  return (
    <li>
      <Link
        to={href}
        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
};
