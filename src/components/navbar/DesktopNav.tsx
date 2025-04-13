
import React from "react";
import NavLink from "./NavLink";
import { CartIcon } from "./CartIcon";
import ServicesDropdown from "./ServicesDropdown";
import SpiritualityDropdown from "./SpiritualityDropdown";
import ActivitiesDropdown from "./ActivitiesDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DesktopNavProps {
  isHomePage: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isHomePage }) => {
  return (
    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
      <NavLink to="/" isActive={isHomePage}>
        Home
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/doctors">Doctors</NavLink>
      
      <SpiritualityDropdown />
      <ServicesDropdown />
      <ActivitiesDropdown />
      
      <div className="flex items-center ml-2 space-x-2">
        <ThemeToggle />
        <CartIcon />
      </div>
    </div>
  );
};

export default DesktopNav;
