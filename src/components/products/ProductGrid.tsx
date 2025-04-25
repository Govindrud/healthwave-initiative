
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  showAddToCart?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  showAddToCart = true 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          showAddToCart={showAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
