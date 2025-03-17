
import React from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "full" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-meant-600 to-meant-800 p-2 rounded-lg flex items-center justify-center">
        <Brain className="text-white" size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
      </div>
      {variant === "full" && (
        <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800 ${sizeClasses[size]}`}>
          MeantToHelp
        </span>
      )}
    </Link>
  );
};

export default Logo;
