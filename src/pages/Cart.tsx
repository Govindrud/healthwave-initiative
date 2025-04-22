
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { ArrowLeft, Plus, Minus, X, ShoppingCart } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

type CartItem = {
  product: ReturnType<typeof getFeaturedProducts>[0];
  quantity: number;
};

function formatINR(val: number) {
  return "₹" + val.toLocaleString("en-IN");
}

const Cart = () => {
  useEffect(() => {
    document.title = "Your Cart | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  // INTERACTIVE cart: use state instead of static mockCart
  const [cart, setCart] = useState<CartItem[]>(
    getFeaturedProducts(2).map(product => ({
      product,
      quantity: 1
    }))
  );

  const handleQuantityChange = (index: number, delta: number) => {
    setCart(cart =>
      cart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (index: number) => {
    setCart(cart => cart.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal === 0 ? 0 : (subtotal > 1500 ? 0 : 100);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
                  {cart.map((item, index) => (
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
                                target.src = "/placeholder.svg";
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
                          <button
                            className="p-1 rounded-full hover:bg-muted"
                            onClick={() => handleQuantityChange(index, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <button
                            className="p-1 rounded-full hover:bg-muted"
                            onClick={() => handleQuantityChange(index, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">
                          {formatINR((item.product.discountPrice || item.product.price) * item.quantity)}
                        </div>
                        {item.product.discountPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatINR(item.product.price * item.quantity)}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          className="p-1 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(index)}
                          aria-label="Remove from cart"
                        >
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
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping > 0 ? formatINR(shipping) : "Free"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatINR(total)}</span>
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
    </MainLayout>
  );
};

export default Cart;
