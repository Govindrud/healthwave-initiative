
import React from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid grid-cols-1 gap-4 ${
      isMobile 
        ? "sm:grid-cols-2" 
        : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    } gap-y-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
