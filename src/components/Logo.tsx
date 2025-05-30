
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'text' | 'full';
  className?: string;
  asLink?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  className = '',
  asLink = false 
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      {(variant === 'icon' || variant === 'full') && (
        <div className={`${sizeClasses[size]} w-auto flex-shrink-0`}>
          <img 
            src="/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png" 
            alt="MeantToHelp Logo" 
            className="h-full w-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = '/public/placeholder.svg';
            }}
          />
        </div>
      )}
      {(variant === 'text' || variant === 'full') && (
        <span className={`font-bold text-meant-800 ${textSizeClasses[size]}`}>
          MeantToHelp
        </span>
      )}
    </div>
  );

  return logoContent;
};

export default Logo;
