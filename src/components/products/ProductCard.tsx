
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(product.image);
  const [retryCount, setRetryCount] = React.useState(0);
  
  const { formatPrice } = useRegion();
  const { t } = useTranslation();

  // Function to extract the image filename from full path
  const getImageName = (imagePath: string) => {
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
  };

  const handleImageError = React.useCallback(() => {
    setImageError(true);
    
    if (retryCount === 0) {
      // First try: attempt to load from /images/products folder
      const imageName = getImageName(product.image);
      setImageSrc(`/images/products/${imageName}`);
      setRetryCount(1);
      console.log(`First retry: attempting to load image from /images/products/${imageName}`);
    } else if (retryCount === 1) {
      // Second try: attempt with public/images/products path
      const imageName = getImageName(product.image);
      setImageSrc(`/public/images/products/${imageName}`);
      setRetryCount(2);
      console.log(`Second retry: attempting to load image from /public/images/products/${imageName}`);
    } else if (retryCount === 2) {
      // Third try: attempt with just the basename
      const imageName = getImageName(product.image);
      setImageSrc(`/${imageName}`);
      setRetryCount(3);
      console.log(`Third retry: attempting to load image with just /${imageName}`);
    } else {
      // Final fallback
      setImageSrc("/placeholder.svg");
      setImageLoaded(true); // Mark as loaded to remove skeleton
      console.log("Using placeholder image after all retries failed");
    }
  }, [product.image, retryCount]);

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
  };

  React.useEffect(() => {
    // Log the initial image path for debugging
    console.log(`Initial image path for ${product.name}: ${product.image}`);
  }, [product]);

  return (
    <Card className="overflow-hidden transition-all border hover:shadow-md h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {!imageLoaded && !imageError && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          <img
            src={imageSrc}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform group-hover:scale-105 ${
              !imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
              console.log(`Image loaded successfully: ${imageSrc}`);
            }}
            onError={() => {
              if (retryCount < 3) {
                handleImageError();
              } else {
                // We've tried all fallbacks
                setImageLoaded(true);
                console.log(`All image fallbacks failed for ${product.name}`);
              }
            }}
          />
          {imageError && imageLoaded && retryCount >= 3 && (
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
      </Link>
      
      <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
        <div>
          {product.discountPrice ? (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-meant-700">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-meant-700">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        {showAddToCart ? (
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">{t('add_to_cart')}</span>
          </Button>
        ) : (
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
