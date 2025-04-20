
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownContent } from "./common/DropdownContent";
import { Heart, Book, MapPin, Video } from "lucide-react";

// Define spirituality dropdown items with proper links
const spiritualityItems = [
  {
    title: "Spiritual Wellness",
    description: "Explore spiritual practices to enhance your mental wellbeing",
    href: "/spirituality",
    icon: Heart
  },
  {
    title: "Guru Consultations",
    description: "Connect with experienced spiritual teachers and guides",
    href: "/spirituality?tab=consultations",
    icon: Book
  },
  {
    title: "Spiritual Travel",
    description: "Transformative journeys to sacred destinations worldwide",
    href: "/spirituality?tab=tours",
    icon: MapPin
  },
  {
    title: "Video Consultations",
    description: "Connect with spiritual guides from anywhere in the world",
    href: "/spirituality?tab=video",
    icon: Video
  }
];

export const SpiritualityDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-white px-2 py-2 text-xs lg:text-sm`}>
            Spirituality
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white border border-border shadow-lg">
            <DropdownContent 
              items={spiritualityItems} 
              showViewAll={{
                href: "/spirituality",
                label: "View All Spiritual Services"
              }}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
