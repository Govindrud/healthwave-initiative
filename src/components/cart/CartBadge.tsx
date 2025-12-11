import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const CartBadge: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="relative">
      <ShoppingBag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      {cartCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-meant-600 hover:bg-meant-600"
        >
          {cartCount > 99 ? '99+' : cartCount}
        </Badge>
      )}
    </Link>
  );
};

export default CartBadge;