
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
                title="Spiritual Wellness"
                className="hover:bg-meant-50"
              >
                Explore spiritual practices to enhance your well-being
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new"
                title="Spiritual Services"
                className="hover:bg-meant-50"
              >
                Comprehensive spiritual guidance and practices
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=gurus"
                title="Guru Consultations"
                className="hover:bg-meant-50"
              >
                Connect with experienced spiritual teachers and guides
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=travel"
                title="Spiritual Travel"
                className="hover:bg-meant-50"
              >
                Transformative journeys to sacred destinations worldwide
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=yoga"
                title="Bhakti Yoga"
                className="hover:bg-meant-50"
              >
                The devotional path to spiritual growth and well-being
              </DropdownListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
