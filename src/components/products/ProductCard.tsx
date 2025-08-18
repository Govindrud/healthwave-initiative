import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import customPlaceholder from '../../assets/custom-placeholder.svg';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  const [isInWishlist, setIsInWishlist] = React.useState(false);
  
  const { formatPrice } = useRegion();
  const { t } = useTranslation();

  React.useEffect(() => {
    // Check if product is in cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(cart.some((item: any) => item.id === product.id));
    
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: any) => item.id === product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!isInCart) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(true);
      toast.success(`${product.name} added to cart`);
    } else {
      toast.info(`${product.name} is already in cart`);
    }
  };

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!isInWishlist) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist`);
    } else {
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  return (
    <Card className="overflow-hidden transition-all border hover:shadow-md h-full flex flex-col group">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className={`object-cover w-full h-full transition-transform group-hover:scale-105 ${
                !imageLoaded ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoaded(true)}
              fallbackSrc={customPlaceholder}
            />
            
            {product.badge && (
              <Badge 
                className={`absolute top-2 right-2 z-10 ${
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
        </Link>
        
        {/* Wishlist Button */}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-2 left-2 z-10 bg-white/80 hover:bg-white ${
            isInWishlist ? 'text-red-500' : 'text-gray-500'
          }`}
          onClick={handleToggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick View Button */}
        <Link to={`/products/${product.id}`}>
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-2 right-2 z-10 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>
        
      <Link to={`/products/${product.id}`} className="flex-grow">
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center justify-between mt-2">
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
              <span className="ml-1 text-xs text-muted-foreground">
                {product.rating.toFixed(1)}
              </span>
            </div>
            
            {product.stock <= 5 && (
              <Badge variant="secondary" className="text-xs">
                Only {product.stock} left
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
        <div className="flex-1">
          {product.discountPrice ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-meant-700">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
              <span className="text-xs text-green-600">
                Save {formatPrice(product.price - product.discountPrice)}
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
            variant={isInCart ? "secondary" : "default"}
            className="flex items-center gap-1 ml-2"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">
              {product.stock === 0 ? 'Out of Stock' : isInCart ? 'In Cart' : t('add_to_cart')}
            </span>
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
