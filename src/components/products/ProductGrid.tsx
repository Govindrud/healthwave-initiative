
import React from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div key={product.id} className="flex flex-col h-full">
          <div className="flex-grow">
            <ProductCard product={product} />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <Link to={`/products/${product.id}`}>
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
            <Link to="/cart">
              <Button 
                variant="default" 
                size="sm"
                className="flex items-center gap-1 bg-meant-600 hover:bg-meant-700"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
