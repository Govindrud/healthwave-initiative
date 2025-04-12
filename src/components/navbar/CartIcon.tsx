
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export const CartIcon: React.FC = () => {
  return (
    <Link to="/cart" className="relative mr-2">
      <ShoppingCart size={22} className="text-foreground" />
      <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        2
      </span>
    </Link>
  );
};
