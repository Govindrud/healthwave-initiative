
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import Logo from "@/components/Logo";

export const DesktopNav = ({ location }: { location: any }) => {
  const { user, logout } = useAuth();
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Logo className="mr-6" />
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="font-medium text-meant-700 hover:text-meant-900 mr-6">
                Home
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  <MenuItem 
                    title="Doctor Consultations" 
                    href="/doctors"
                    description="Online consultations with experienced doctors"
                  />
                  <MenuItem 
                    title="Spiritual Guidance" 
                    href="/spirituality"
                    description="Connect with spiritual guides and healers"
                  />
                  <MenuItem 
                    title="Student Psychologists" 
                    href="/student-psychologists"
                    description="Affordable counseling with psychology students"
                  />
                  <MenuItem 
                    title="Wellness Activities" 
                    href="/activities"
                    description="Participate in wellness and mindfulness activities"
                  />
                  <MenuItem 
                    title="Addiction Recovery" 
                    href="/de-addiction"
                    description="Comprehensive addiction recovery programs"
                  />
                  <MenuItem 
                    title="All Services" 
                    href="/services"
                    description="Browse our complete range of services"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  <MenuItem 
                    title="Wellness Products" 
                    href="/products"
                    description="Products designed to improve your wellbeing"
                  />
                  <MenuItem 
                    title="Self-Help Books" 
                    href="/products?category=books"
                    description="Curated collection of mental health books"
                  />
                  <MenuItem 
                    title="Meditation Tools" 
                    href="/products?category=meditation"
                    description="Tools and accessories for meditation practice"
                  />
                  <MenuItem 
                    title="Aromatherapy" 
                    href="/products?category=aromatherapy"
                    description="Essential oils and diffusers for aromatherapy"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Corporate</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  <MenuItem 
                    title="Corporate Wellness Plans" 
                    href="/corporate-plans"
                    description="Wellness programs for your organization"
                  />
                  <MenuItem 
                    title="Employee Assistance" 
                    href="/corporate-plans#assistance"
                    description="Support services for your employees"
                  />
                  <MenuItem 
                    title="Corporate Certifications" 
                    href="/corporate-certification"
                    description="Mental health certifications for your workplace"
                  />
                  <MenuItem 
                    title="Workshops & Webinars" 
                    href="/webinars"
                    description="Educational sessions for corporate teams"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/about" className="font-medium text-meant-700 hover:text-meant-900 mr-6">
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback>{getInitials(user.displayName || "User")}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-bookings" className="cursor-pointer flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ 
  title, 
  href, 
  description 
}: { 
  title: string; 
  href: string;
  description: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const Calendar = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export default DesktopNav;
