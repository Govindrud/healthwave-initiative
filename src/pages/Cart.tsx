
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = () => {
  useEffect(() => {
    document.title = "Shopping Cart - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const cartItems = [
    {
      id: 1,
      name: "Meditation Cushion",
      price: 2500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Aromatherapy Diffuser",
      price: 3500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <MainLayout title="Shopping Cart - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-meant-800 mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">Review your selected wellness products</p>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-meant-800">{item.name}</h3>
                            <p className="text-meant-600 font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="icon" variant="outline">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button size="icon" variant="outline">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button size="icon" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-meant-600 hover:bg-meant-700">
                        Proceed to Checkout
                      </Button>
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
                    <a href="/products">Browse Products</a>
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
