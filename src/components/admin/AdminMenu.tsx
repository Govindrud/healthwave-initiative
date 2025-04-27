
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Home, LogOut, Settings, Users, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const AdminMenu = () => {
  const { logout } = useAuth();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 font-medium hover:bg-accent transition-colors border border-meant-600/30"
        >
          <Users size={16} className="text-meant-600" />
          <span className="hidden sm:inline">Admin</span>
          <ChevronDown size={14} className="text-meant-600/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 bg-white dark:bg-gray-900 shadow-lg border rounded-lg z-50" 
        sideOffset={4}
      >
        <DropdownMenuLabel className="px-2 text-sm font-semibold text-foreground/80">
          Admin Navigation
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <div className="space-y-0.5">
          <DropdownMenuItem asChild className="p-0">
            <Link 
              to="/admin-dashboard" 
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer w-full hover:bg-accent/80 transition-colors"
            >
              <Home size={16} className="text-meant-600" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-0">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer w-full hover:bg-accent/80 transition-colors"
            >
              <FileText size={16} className="text-meant-600" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-0">
            <Link 
              to="/admin/settings" 
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer w-full hover:bg-accent/80 transition-colors"
            >
              <Settings size={16} className="text-meant-600" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
