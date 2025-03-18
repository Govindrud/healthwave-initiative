
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById, getFeaturedProducts } from "@/data/products";
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import ProductCarousel from "@/components/products/ProductCarousel";
import { toast } from "sonner";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState(productId ? getProductById(productId) : undefined);
  const relatedProducts = getFeaturedProducts(4);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | MeantToHelp`;
    } else {
      document.title = "Product Not Found | MeantToHelp";
    }
  }, [product]);

  useEffect(() => {
    setProduct(productId ? getProductById(productId) : undefined);
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    toast.success("Added to cart", {
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist", {
      description: `${product?.name} has been added to your wishlist.`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products">
              <Button className="bg-meant-600 hover:bg-meant-700">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <Link to="/products" className="inline-flex items-center text-meant-600 hover:text-meant-800 mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x600/meant/white?text=Product+Image";
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                {product.badge && (
                  <Badge 
                    className={`mb-3 ${
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
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex">
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
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-bold text-meant-700">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-lg text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-meant-700">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm">
                  <span className={product.stock > 10 ? "text-green-600" : "text-amber-600"}>
                    {product.stock > 10 
                      ? "In Stock" 
                      : product.stock > 0 
                        ? `Only ${product.stock} left in stock` 
                        : "Out of Stock"}
                  </span>
                </p>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="space-y-4">
                <h3 className="font-medium">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  className="bg-meant-600 hover:bg-meant-700 text-white flex-1 sm:flex-initial"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                  onClick={handleAddToWishlist}
                >
                  <Heart size={18} className="mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <ProductCarousel
              title="You may also like"
              products={relatedProducts.filter(p => p.id !== product.id)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
