
import React from "react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import { NavSection } from "./navigation/NavSection";
import { UserMenu } from "./user-menu/UserMenu";

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
              items={[
                {
                  title: "Doctor Consultations",
                  href: "/doctors",
                  description: "Online consultations with experienced doctors"
                },
                {
                  title: "Spiritual Guidance",
                  href: "/spirituality",
                  description: "Connect with spiritual guides and healers"
                },
                {
                  title: "Student Psychologists",
                  href: "/student-psychologists",
                  description: "Affordable counseling with psychology students"
                },
                {
                  title: "Wellness Activities",
                  href: "/activities",
                  description: "Participate in wellness and mindfulness activities"
                },
                {
                  title: "Addiction Recovery",
                  href: "/de-addiction",
                  description: "Comprehensive addiction recovery programs"
                },
                {
                  title: "All Services",
                  href: "/services",
                  description: "Browse our complete range of services"
                }
              ]}
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
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <UserMenu />
    </div>
  );
};

export default DesktopNav;
