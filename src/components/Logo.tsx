
import React from "react";
import { Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "full", className }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };
  
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;

  return (
    <Link to="/" className={cn("flex items-center gap-2 transition-transform hover:scale-105", className)}>
      <div className="relative">
        <div className="bg-gradient-to-br from-meant-500 to-meant-700 p-2 rounded-lg flex items-center justify-center shadow-md">
          <Brain className="text-white" size={iconSize} />
        </div>
        <Sparkles 
          className="absolute -top-1 -right-1 text-meant-300" 
          size={size === "sm" ? 10 : size === "md" ? 12 : 14} 
        />
      </div>
      {variant === "full" && (
        <span className={cn(
          "font-bold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800", 
          sizeClasses[size]
        )}>
          <span className="font-extrabold">Meant</span>ToHelp
        </span>
      )}
    </Link>
  );
};

export default Logo;
