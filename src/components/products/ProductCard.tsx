import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { formatINR } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden transition-all border hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          {product.badge && (
            <Badge 
              className={`absolute top-2 right-2 ${
                product.badge === 'sale' 
                  ? 'bg-red-500' 
                  : product.badge === 'new' 
                    ? 'bg-green-500' 
                    : 'bg-meant-600'
              }`}
            >
              {product.badge.toUpperCase()}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating) 
                      ? "fill-amber-400 text-amber-400" 
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-meant-700">
                  {formatINR(product.discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatINR(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-meant-700">
                {formatINR(product.price)}
              </span>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
