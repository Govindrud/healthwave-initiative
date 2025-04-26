
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainMenuItems } from "@/config/navigation";

interface MainMenuDropdownProps {
  scrollToSection: (id: string) => void;
}

export const MainMenuDropdown: React.FC<MainMenuDropdownProps> = ({ scrollToSection }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-background px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors">
            Help & Support
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2 min-w-[240px] z-50 bg-background border border-border shadow-lg rounded-md">
            <ul className="space-y-1 grid p-2">
              {mainMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
                  >
                    {item.icon && <item.icon className="h-4 w-4 text-meant-600" />}
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
