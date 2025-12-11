
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, LogIn } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const Cart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useRegion();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Shopping Cart - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const savings = cartItems.reduce((sum, item) => {
    // Calculate savings if there's a discount
    return sum;
  }, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      // Navigate to checkout - placeholder for now
      navigate('/payment-success');
    }
  };

  if (loading) {
    return (
      <MainLayout title="Shopping Cart - MeantToHelp">
        <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-10 w-64 mb-8" />
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Shopping Cart - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link to="/products">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold text-meant-800">Shopping Cart</h1>
                </div>
                <p className="text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              {cartItems.length > 0 && (
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              )}
            </div>

            {/* Login prompt for guests */}
            {!isAuthenticated && cartItems.length > 0 && (
              <Card className="mb-6 border-meant-200 bg-meant-50/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LogIn className="h-5 w-5 text-meant-600" />
                    <div>
                      <p className="font-medium text-meant-800">Sign in to save your cart</p>
                      <p className="text-sm text-muted-foreground">Your cart will be synced across devices</p>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {cartItems.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={item.product_image || ''}
                            alt={item.product_name}
                            className="w-20 h-20 object-cover rounded-lg"
                            fallbackSrc="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-meant-800">{item.product_name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-meant-600 font-medium">
                                {formatPrice(item.product_price)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-meant-800">
                              {formatPrice(item.product_price * item.quantity)}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600 hover:text-red-700 mt-1"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-meant-600 hover:bg-meant-700"
                          onClick={handleCheckout}
                        >
                          {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/products">Continue Shopping</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Explore our wellness products to start your journey
                  </p>
                  <Button asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;