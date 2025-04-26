
import React from "react";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="p-2 rounded-md bg-white border border-gray-200 shadow-sm z-50"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="w-6 h-5 flex flex-col justify-between">
        <span
          className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? "opacity-0" : "w-full"
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
    </button>
  );
};
