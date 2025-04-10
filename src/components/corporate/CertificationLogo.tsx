
import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, Check } from "lucide-react";

interface CertificationLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export const CertificationLogo = ({ size = "md", animated = false, className = "" }: CertificationLogoProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40"
  };
  
  const Logo = animated ? motion.div : "div";
  const animationProps = animated ? {
    initial: { rotate: -5, scale: 0.95 },
    animate: { rotate: 5, scale: 1 },
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      duration: 2,
      ease: "easeInOut"
    }
  } : {};

  return (
    <Logo
      {...animationProps}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-meant-500 to-meant-700 flex items-center justify-center shadow-lg">
        <div className="rounded-full h-[85%] w-[85%] bg-white flex items-center justify-center border-4 border-meant-200">
          <div className="text-meant-700 font-bold text-center flex flex-col items-center justify-center">
            {size === "lg" ? (
              <>
                <Shield className="h-12 w-12 mb-1 text-meant-600" strokeWidth={1.5} />
                <div className="text-2xl leading-tight">STRESS-FREE</div>
                <div className="text-xl leading-tight">CERTIFIED</div>
              </>
            ) : size === "md" ? (
              <>
                <Shield className="h-6 w-6 mb-1 text-meant-600" strokeWidth={1.5} />
                <div className="text-lg">CERTIFIED</div>
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 text-meant-600" strokeWidth={1.5} />
                <div className="text-[8px]">SF</div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Stars and checkmarks around the logo */}
      {size === "lg" && (
        <>
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-meant-500 to-meant-600 text-white p-1 rounded-full shadow-md">
            <Award className="h-5 w-5" />
          </div>
          <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-meant-500 to-meant-600 text-white p-1 rounded-full shadow-md">
            <Check className="h-4 w-4" />
          </div>
        </>
      )}
    </Logo>
  );
};
