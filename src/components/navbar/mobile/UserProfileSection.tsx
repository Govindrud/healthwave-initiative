
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserProfileSectionProps {
  onClose: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ onClose }) => {
  const { isAuthenticated } = useAuth();
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  return (
    <div className="p-4 border-b">
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">User</p>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button asChild onClick={onClose}>
            <Link to="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild onClick={onClose}>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileSection;
