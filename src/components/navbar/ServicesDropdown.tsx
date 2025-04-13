import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownListItem } from "./DropdownListItem";
import { 
  HeartHandshake, 
  Users, 
  GraduationCap, 
  Video, 
  Building, 
  Award 
} from "lucide-react";

export const ServicesDropdown: React.FC = () => {
  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${navLinkClass} bg-transparent px-2 py-2 text-xs lg:text-sm`}>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-background border border-border/20 shadow-md">
              <DropdownListItem
                href="/doctors"
                title="Doctor Consultations"
                icon={<HeartHandshake className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Professional mental health consultations with qualified doctors
              </DropdownListItem>
              <DropdownListItem
                href="/student-psychologists"
                title="Student Psychologists"
                icon={<GraduationCap className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Affordable sessions with psychology students under supervision
              </DropdownListItem>
              <DropdownListItem
                href="/webinars"
                title="Mental Health Webinars"
                icon={<Video className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Educational webinars on various mental health topics
              </DropdownListItem>
              <DropdownListItem
                href="/corporate-plans"
                title="Corporate Plans"
                icon={<Users className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Customized mental health solutions for organizations
              </DropdownListItem>
              <DropdownListItem
                href="/corporate-certification"
                title="Stress-Free Certification"
                icon={<Award className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Certify your organization as a stress-free workplace
              </DropdownListItem>
              <DropdownListItem
                href="/services"
                title="All Services"
                icon={<Building className="h-4 w-4 text-meant-600" />}
                className="hover:bg-meant-50"
              >
                Explore our complete range of mental health services
              </DropdownListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
