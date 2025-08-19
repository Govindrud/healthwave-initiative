import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CartBadge: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-page cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

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