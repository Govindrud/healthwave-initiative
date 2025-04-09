
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { ArrowLeft, Plus, Minus, X, ShoppingCart } from "lucide-react";

const Cart = () => {
  useEffect(() => {
    document.title = "Your Cart | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  // This is a placeholder cart with items based on featured products
  // In a real app, this would come from state management, context, or local storage
  const mockCart = getFeaturedProducts(2).map(product => ({
    product,
    quantity: 1
  }));

  const subtotal = mockCart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  if (mockCart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
              <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-meant-600 hover:bg-meant-700 rounded-full">
                  Browse Products
                </Button>
              </Link>
            </div>
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
        <div className="container mx-auto px-4 py-12">
          <Link to="/products" className="inline-flex items-center text-meant-600 hover:text-meant-800 mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
          
          <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                      <th className="p-4 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockCart.map((item) => (
                      <tr key={item.product.id}>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded bg-muted mr-4 overflow-hidden flex-shrink-0">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://placehold.co/100x100/meant/white?text=Product";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.product.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button className="p-1 rounded-full hover:bg-muted">
                              <Minus size={14} />
                            </button>
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            <button className="p-1 rounded-full hover:bg-muted">
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium">
                            ${(item.product.discountPrice || item.product.price).toFixed(2)}
                          </div>
                          {item.product.discountPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${item.product.price.toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <button className="p-1 text-muted-foreground hover:text-destructive">
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-meant-600 hover:bg-meant-700 rounded-full">
                  Proceed to Checkout
                </Button>
                
                <div className="mt-6 space-y-3">
                  <div className="text-xs text-muted-foreground text-center">
                    <p>We accept the following payment methods:</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="bg-muted/50 rounded p-1">Visa</div>
                      <div className="bg-muted/50 rounded p-1">Mastercard</div>
                      <div className="bg-muted/50 rounded p-1">PayPal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
