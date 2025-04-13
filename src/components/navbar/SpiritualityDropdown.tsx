
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";

export const SpiritualityDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent p-0`}>Spirituality</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <DropdownListItem
                href="/spirituality"
                title="Spiritual Practices"
                className="hover:bg-meant-50"
              >
                Explore meditation, mindfulness, and spiritual healing
              </DropdownListItem>
              <DropdownListItem
                href="/surender"
                title="Dr. Surender's Practice"
                className="hover:bg-meant-50"
              >
                Learn about holistic approaches to mental wellbeing
              </DropdownListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
