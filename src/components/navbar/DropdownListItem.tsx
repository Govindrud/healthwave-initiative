
import React from "react";
import { Link } from "react-router-dom";

interface DropdownListItemProps {
  href: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DropdownListItem = ({
  href,
  title,
  icon,
  children,
  className = "",
  onClick
}: DropdownListItemProps) => {
  return (
    <li>
      <Link
        to={href}
        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="shrink-0">{icon}</div>}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
};
