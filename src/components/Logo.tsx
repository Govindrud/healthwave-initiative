
import React from 'react';
import { Heart, Brain, Leaf } from 'lucide-react';

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

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const CreativeLogo = () => (
    <div className={`relative ${iconSizeClasses[size]} flex items-center justify-center`}>
      {/* Outer circle representing wholeness and protection */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-meant-200 to-meant-300 opacity-20"></div>
      
      {/* Inner design with mental health symbols */}
      <div className="relative flex items-center justify-center">
        {/* Brain icon representing mental health */}
        <Brain 
          className={`absolute text-meant-600 ${size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3'}`}
          strokeWidth={1.5}
        />
        
        {/* Heart icon for care and compassion - positioned slightly right */}
        <Heart 
          className={`absolute text-meant-500 ${size === 'lg' ? 'w-3 h-3 translate-x-2 translate-y-1' : size === 'md' ? 'w-2.5 h-2.5 translate-x-1.5 translate-y-0.5' : 'w-2 h-2 translate-x-1 translate-y-0.5'}`}
          fill="currentColor"
          strokeWidth={1}
        />
        
        {/* Leaf icon for growth and healing - positioned slightly left */}
        <Leaf 
          className={`absolute text-green-500 ${size === 'lg' ? 'w-3 h-3 -translate-x-2 -translate-y-1' : size === 'md' ? 'w-2.5 h-2.5 -translate-x-1.5 -translate-y-0.5' : 'w-2 h-2 -translate-x-1 -translate-y-0.5'}`}
          strokeWidth={1.5}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-meant-400 to-transparent opacity-10 animate-pulse"></div>
    </div>
  );

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      {(variant === 'icon' || variant === 'full') && (
        <div className="flex-shrink-0">
          <CreativeLogo />
        </div>
      )}
      {(variant === 'text' || variant === 'full') && (
        <span className={`font-bold bg-gradient-to-r from-meant-600 to-meant-800 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          <span className="font-extrabold">Meant</span>ToHelp
        </span>
      )}
    </div>
  );

  return logoContent;
};

export default Logo;
