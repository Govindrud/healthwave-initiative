
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface CartIconProps {
  itemCount: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <Link to="/cart" className="relative mr-2">
      <ShoppingCart size={22} className="text-foreground" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};
