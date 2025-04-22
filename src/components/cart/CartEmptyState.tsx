
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const CartEmptyState = () => (
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
);

export default CartEmptyState;
