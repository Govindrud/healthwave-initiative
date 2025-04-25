
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  description?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  title,
  description
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (!products.length) return null;

  return (
    <div className="relative">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-md h-10 w-10"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={20} />
        </Button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-md h-10 w-10"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 px-2 -mx-2 hide-scrollbar snap-x"
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;
