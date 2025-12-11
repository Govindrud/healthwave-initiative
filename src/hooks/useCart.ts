import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string | null;
  quantity: number;
}

// Local storage key for guest cart
const GUEST_CART_KEY = "guest_cart";

// Get guest cart from localStorage
const getGuestCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// Save guest cart to localStorage
const saveGuestCart = (cart: CartItem[]) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
};

export const useCart = () => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    setLoading(true);
    
    if (isAuthenticated && user) {
      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.uid);

        if (error) throw error;
        setCartItems(data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    } else {
      setCartItems(getGuestCart());
    }
    
    setLoading(false);
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Sync guest cart to database when user logs in
  useEffect(() => {
    const syncGuestCart = async () => {
      if (isAuthenticated && user) {
        const guestCart = getGuestCart();
        if (guestCart.length > 0) {
          try {
            for (const item of guestCart) {
              await supabase.from("cart_items").upsert({
                user_id: user.uid,
                product_id: item.product_id,
                product_name: item.product_name,
                product_price: item.product_price,
                product_image: item.product_image,
                quantity: item.quantity,
              });
            }
            localStorage.removeItem(GUEST_CART_KEY);
            fetchCart();
          } catch (error) {
            console.error("Error syncing cart:", error);
          }
        }
      }
    };
    
    syncGuestCart();
  }, [isAuthenticated, user, fetchCart]);

  const addToCart = async (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }) => {
    if (isAuthenticated && user) {
      try {
        // Check if item already exists
        const { data: existing } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.uid)
          .eq("product_id", product.id)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("cart_items")
            .update({ quantity: existing.quantity + 1 })
            .eq("id", existing.id);
        } else {
          await supabase.from("cart_items").insert({
            user_id: user.uid,
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image: product.image || null,
            quantity: 1,
          });
        }
        
        toast.success("Added to cart!");
        fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
      }
    } else {
      // Guest cart
      const guestCart = getGuestCart();
      const existingIndex = guestCart.findIndex(item => item.product_id === product.id);
      
      if (existingIndex >= 0) {
        guestCart[existingIndex].quantity += 1;
      } else {
        guestCart.push({
          id: `guest-${Date.now()}`,
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          product_image: product.image || null,
          quantity: 1,
        });
      }
      
      saveGuestCart(guestCart);
      setCartItems(guestCart);
      toast.success("Added to cart!");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    if (isAuthenticated && user) {
      try {
        await supabase
          .from("cart_items")
          .update({ quantity })
          .eq("id", itemId);
        fetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      }
    } else {
      const guestCart = getGuestCart();
      const itemIndex = guestCart.findIndex(item => item.id === itemId);
      if (itemIndex >= 0) {
        guestCart[itemIndex].quantity = quantity;
        saveGuestCart(guestCart);
        setCartItems(guestCart);
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (isAuthenticated && user) {
      try {
        await supabase
          .from("cart_items")
          .delete()
          .eq("id", itemId);
        toast.success("Removed from cart");
        fetchCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove from cart");
      }
    } else {
      const guestCart = getGuestCart().filter(item => item.id !== itemId);
      saveGuestCart(guestCart);
      setCartItems(guestCart);
      toast.success("Removed from cart");
    }
  };

  const clearCart = async () => {
    if (isAuthenticated && user) {
      try {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.uid);
        setCartItems([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      localStorage.removeItem(GUEST_CART_KEY);
      setCartItems([]);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    fetchCart,
  };
};