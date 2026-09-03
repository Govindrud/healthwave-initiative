import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useRegion } from '@/context/RegionContext';
import { toast } from 'sonner';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PayNowButton from '@/components/payment/PayNowButton';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useRegion();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        document.title = `${foundProduct.name} - MeantToHelp`;
        
        // Check if product is in cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setIsInCart(cart.some((item: any) => item.id === foundProduct.id));
        
        // Check if product is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsInWishlist(wishlist.some((item: any) => item.id === foundProduct.id));
      }
    }
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);
    toast.success(`${product.name} added to cart`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
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

  if (!product) {
    return (
      <MainLayout title="Product Not Found - MeantToHelp">
        <div className="container mx-auto max-w-7xl p-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout 
      title={`${product.name} - MeantToHelp`}
      description={product.shortDescription}
    >
      <div className="container mx-auto max-w-7xl p-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/products" className="hover:text-meant-600">Products</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                fallbackSrc="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              {product.badge && (
                <Badge 
                  className={`absolute top-4 right-4 ${
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
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.stock <= 5 && (
                  <Badge variant="destructive">
                    Only {product.stock} left
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-meant-800 mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.shortDescription}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? "fill-amber-400 text-amber-400" 
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} out of 5
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.discountPrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-meant-700">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Save {formatPrice(product.price - product.discountPrice)}
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold text-meant-700">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-meant-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <PayNowButton
                className="w-full bg-meant-600 hover:bg-meant-700"
                disabled={product.stock === 0}
                amount={Number(product.price) * quantity}
                productName={product.name}
                productDescription={`${product.name} x ${quantity}`}
                label={`Buy Now — ₹${(Number(product.price) * quantity).toLocaleString('en-IN')}`}
                items={[
                  {
                    product_id: String(product.id),
                    product_name: product.name,
                    price: Number(product.price),
                    quantity,
                  },
                ]}
              />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : isInCart ? 'Add More to Cart' : 'Add to Cart'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleToggleWishlist}
                  className={isInWishlist ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features Cards */}
            <div className="grid grid-cols-3 gap-3 pt-6">
              <Card>
                <CardContent className="p-3 text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-meant-600" />
                  <p className="text-xs font-medium">Free Shipping</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-meant-600" />
                  <p className="text-xs font-medium">Quality Assured</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-meant-600" />
                  <p className="text-xs font-medium">Easy Returns</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;