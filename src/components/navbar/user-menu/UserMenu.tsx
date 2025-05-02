
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, User, CalendarClock, User as UserIcon, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  
  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ")
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <AvatarFallback className="bg-meant-100 text-meant-600">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="font-normal text-muted-foreground">
                {user?.displayName || "User"}
              </div>
              <div className="truncate text-xs font-normal text-muted-foreground">
                {user?.email || ""}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-bookings">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="default" size="sm" className="bg-meant-600 hover:bg-meant-700">
              <User className="h-4 w-4 mr-2" />
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserMenu;
