
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'icon' | 'full';
  className?: string;
}

const Logo = ({ size = 'md', variant = 'icon', className = '' }: LogoProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/');
  };
  
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-16'
  };
  
  const logoSize = sizeClasses[size];
  
  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {variant === 'icon' ? (
        <div className={`${logoSize} aspect-square bg-gradient-to-br from-meant-500 to-meant-700 rounded-lg flex items-center justify-center text-white font-bold`}>
          <span className="text-lg">M</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className={`${logoSize} aspect-square bg-gradient-to-br from-meant-500 to-meant-700 rounded-lg flex items-center justify-center text-white font-bold mr-2`}>
            <span className="text-lg">M</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800">
            <span className="font-extrabold">Meant</span>ToHelp
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
