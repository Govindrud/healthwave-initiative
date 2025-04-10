
import React from "react";
import { motion } from "framer-motion";

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
    initial: { rotate: -5 },
    animate: { rotate: 5 },
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      duration: 2
    }
  } : {};

  return (
    <Logo
      {...animationProps}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 rounded-full border-8 border-meant-600 flex items-center justify-center">
        <div className="rounded-full h-3/4 w-3/4 border-4 border-meant-500 flex items-center justify-center bg-white">
          <div className="text-meant-700 font-bold text-center">
            {size === "lg" ? (
              <>
                <div className="text-2xl">STRESS-FREE</div>
                <div className="text-xl">CERTIFIED</div>
              </>
            ) : size === "md" ? (
              <div className="text-lg">CERTIFIED</div>
            ) : (
              <div className="text-xs">SF</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stars around the logo */}
      {size === "lg" && (
        <>
          <div className="absolute -top-3 -right-3 bg-meant-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"></path>
            </svg>
          </div>
          <div className="absolute -bottom-2 -left-2 bg-meant-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"></path>
            </svg>
          </div>
        </>
      )}
    </Logo>
  );
};
