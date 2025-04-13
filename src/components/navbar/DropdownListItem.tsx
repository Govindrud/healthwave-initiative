
import React from "react";
import { Link } from "react-router-dom";

interface DropdownListItemProps {
  href?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  href,
  title,
  children,
  className = "",
  icon,
  onClick
}) => {
  const baseClassName = `block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors 
    bg-blue-50 hover:bg-blue-100 text-foreground 
    ${className}`;

  if (onClick) {
    return (
      <li>
        <button
          onClick={onClick}
          className={baseClassName}
        >
          <div className="flex items-center gap-2">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </li>
    );
  }
  
  return (
    <li>
      <Link
        to={href || "#"}
        className={baseClassName}
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
