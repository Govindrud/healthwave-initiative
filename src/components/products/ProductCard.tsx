
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { formatINR } from "@/data/products";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(product.image);
  const [retryCount, setRetryCount] = React.useState(0);

  // Function to extract the image filename from full path
  const getImageName = (imagePath: string) => {
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
  };

  const handleImageError = React.useCallback(() => {
    setImageError(true);
    
    if (retryCount === 0) {
      // First try: attempt to load from public/images folder
      const imageName = getImageName(product.image);
      setImageSrc(`/images/products/${imageName}`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Second try: attempt with different path structure
      setImageSrc(`/products/${getImageName(product.image)}`);
      setRetryCount(2);
    } else {
      // Final fallback
      setImageSrc("/placeholder.svg");
      setImageLoaded(true); // Mark as loaded to remove skeleton
    }
  }, [product.image, retryCount]);

  return (
    <Card className="overflow-hidden transition-all border hover:shadow-md h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <img
          src={imageSrc}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform group-hover:scale-105 ${
            !imageLoaded ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (retryCount < 2) {
              handleImageError();
            } else {
              // We've tried all fallbacks
              setImageLoaded(true);
            }
          }}
        />
        {imageError && imageLoaded && retryCount >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80 text-muted-foreground text-sm p-2 text-center">
            {product.name}
          </div>
        )}
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
  );
};

export default ProductCard;
