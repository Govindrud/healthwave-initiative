
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, LogOut, CalendarCheck } from "lucide-react";

interface AccountNavLinksProps {
  onClose: () => void;
}

const AccountNavLinks: React.FC<AccountNavLinksProps> = ({ onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    onClose();
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <>
      <div className="my-2 border-t"></div>
      <p className="px-4 py-1 text-xs text-muted-foreground">Account</p>
      <Link 
        to="/profile" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <User size={20} />
        <span>My Profile</span>
      </Link>
      <Link 
        to="/my-bookings" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <CalendarCheck size={20} />
        <span>My Bookings</span>
      </Link>
      <Link 
        to="/settings" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <Settings size={20} />
        <span>Settings</span>
      </Link>
      <button 
        className="flex w-full items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-red-600"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </>
  );
};

export default AccountNavLinks;
