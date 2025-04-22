
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
  description?: string;
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  description,
  products,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-[65ch]">
              {description}
            </p>
          )}
        </div>
        <Link to="/products">
          <Button variant="outline" className="gap-2">
            View all products
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No products available</p>
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="flex flex-col h-full">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          {products.length > 1 && (
            <div className="flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static transform-none mx-0" />
              <CarouselNext className="static transform-none mx-0" />
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;
