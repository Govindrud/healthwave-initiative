
import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import { NavSection } from "./navigation/NavSection";
import { UserMenu } from "./user-menu/UserMenu";
import RegionSelector from "@/components/region/RegionSelector";
import { servicesItems, spiritualityItems, activitiesItems, mainMenuItems, aiItems } from "@/config/navigation";

export const DesktopNav = ({ location }: { location: any }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Logo className="mr-6" />
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavSection 
              title="Home"
              items={[{ title: "Home", href: "/", description: "" }]}
              isLink
            />
            
            <NavSection 
              title="Services"
              items={servicesItems}
            />
            
            <NavSection 
              title="Products"
              items={[
                {
                  title: "Wellness Products",
                  href: "/products",
                  description: "Products designed to improve your wellbeing"
                },
                {
                  title: "Self-Help Books",
                  href: "/products?category=books",
                  description: "Curated collection of mental health books"
                },
                {
                  title: "Meditation Tools",
                  href: "/products?category=meditation",
                  description: "Tools and accessories for meditation practice"
                },
                {
                  title: "Aromatherapy",
                  href: "/products?category=aromatherapy",
                  description: "Essential oils and diffusers for aromatherapy"
                }
              ]}
            />
            
            <NavSection 
              title="AI Assistants"
              items={aiItems}
            />
            
            <NavSection 
              title="Spirituality"
              items={spiritualityItems}
            />
            
            <NavSection 
              title="Activities"
              items={activitiesItems}
            />
            
            <NavSection 
              title="Corporate"
              items={[
                {
                  title: "Corporate Wellness Plans",
                  href: "/corporate-plans",
                  description: "Wellness programs for your organization"
                },
                {
                  title: "Employee Assistance",
                  href: "/corporate-plans#assistance",
                  description: "Support services for your employees"
                },
                {
                  title: "Corporate Certifications",
                  href: "/corporate-certification",
                  description: "Mental health certifications for your workplace"
                },
                {
                  title: "Workshops & Webinars",
                  href: "/webinars",
                  description: "Educational sessions for corporate teams"
                }
              ]}
            />
            
            <NavSection 
              title="About"
              items={[{ title: "About", href: "/about", description: "" }]}
              isLink
            />

            <NavSection 
              title="Partners"
              items={[{ title: "Partner Directory", href: "/partners", description: "Browse our mental health service partners" }]}
              isLink
            />
            
            <NavSection 
              title="Documentation"
              items={[{ title: "Documentation", href: "/documentation", description: "Technical documentation" }]}
              isLink
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center gap-4">
        <RegionSelector variant="minimal" />
        <UserMenu />
      </div>
    </div>
  );
};

export default DesktopNav;
