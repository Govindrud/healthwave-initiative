
import React from "react";
import { MoveRight } from "lucide-react";
import UserProfileSection from "./mobile/UserProfileSection";
import MainNavLinks from "./mobile/MainNavLinks";
import AccountNavLinks from "./mobile/AccountNavLinks";

interface MobileMenuContentProps {
  onClose: () => void;
  isOpen?: boolean;
  scrollToSection?: (id: string) => void;
}

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ onClose, isOpen, scrollToSection }) => {
  return (
    <div className="bg-white h-full flex flex-col overflow-y-auto">
      {/* User profile section */}
      <UserProfileSection onClose={onClose} />

      {/* Main navigation links */}
      <div className="flex-1 overflow-y-auto">
        <MainNavLinks onClose={onClose} />
        <AccountNavLinks onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenuContent;
