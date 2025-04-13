
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";
import { Heart, Shield, HelpCircle } from "lucide-react";

interface MainMenuDropdownProps {
  scrollToSection: (id: string) => void;
}

export const MainMenuDropdown: React.FC<MainMenuDropdownProps> = ({ scrollToSection }) => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent p-0 text-xs lg:text-sm`}>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-white">
              <DropdownListItem
                href="/surender"
                title="Surender"
                icon={<Heart className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Explore surrender services and assistance
              </DropdownListItem>
              <DropdownListItem
                href="/de-addiction"
                title="De-addiction"
                icon={<Shield className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Support for overcoming addiction
              </DropdownListItem>
              <li className="lg:col-span-2">
                <button
                  onClick={() => scrollToSection("problem")}
                  className="block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-meant-50"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-meant-600" />
                    <div className="text-sm font-medium leading-none">Contribute</div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Help us grow and contribute to mental wellness
                  </p>
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
