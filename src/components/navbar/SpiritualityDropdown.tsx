import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";
import { Heart, BookOpen, Sparkles, MapPin, Video } from "lucide-react";

export const SpiritualityDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent px-2 py-2 text-xs lg:text-sm`}>Spirituality</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-background border border-border/20 shadow-md">
              <DropdownListItem
                href="/spirituality"
                title="Spiritual Wellness"
                icon={<Heart className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Explore spiritual practices to enhance your well-being
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new"
                title="Spiritual Services"
                icon={<Sparkles className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Comprehensive spiritual guidance and practices
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=gurus"
                title="Guru Consultations"
                icon={<BookOpen className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Connect with experienced spiritual teachers and guides
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=travel"
                title="Spiritual Travel"
                icon={<MapPin className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Transformative journeys to sacred destinations worldwide
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=video"
                title="Video Consultations"
                icon={<Video className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Connect with spiritual guides from anywhere
              </DropdownListItem>
              <DropdownListItem
                href="/spirituality-new?tab=yoga"
                title="Bhakti Yoga"
                icon={<Heart className="h-4 w-4 text-meant-600" />}
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
