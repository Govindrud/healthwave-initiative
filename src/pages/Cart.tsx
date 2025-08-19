
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';
import { toast } from 'sonner';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { formatPrice } = useRegion();

  useEffect(() => {
    document.title = "Shopping Cart - MeantToHelp";
    window.scrollTo(0, 0);
    
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Cart updated');
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Cart cleared');
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);
  
  const savings = cartItems.reduce((sum, item) => {
    if (item.discountPrice) {
      return sum + ((item.price - item.discountPrice) * item.quantity);
    }
    return sum;
  }, 0);

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

            {cartItems.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            fallbackSrc="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-meant-800">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">{item.shortDescription}</p>
                            <div className="flex items-center gap-2">
                              {item.discountPrice ? (
                                <>
                                  <span className="text-meant-600 font-medium">
                                    {formatPrice(item.discountPrice)}
                                  </span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-meant-600 font-medium">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-meant-800">
                              {formatPrice((item.discountPrice || item.price) * item.quantity)}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-600 hover:text-red-700 mt-1"
                              onClick={() => removeItem(item.id)}
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
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>{formatPrice(total + savings)}</span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Savings</span>
                          <span>-{formatPrice(savings)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full bg-meant-600 hover:bg-meant-700">
                          Proceed to Checkout
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
