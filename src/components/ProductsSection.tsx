
import React from "react";
import ProductCarousel from "./products/ProductCarousel";
import { getFeaturedProducts } from "@/data/products";

const ProductsSection: React.FC = () => {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <section id="products" className="section-container bg-gradient-to-b from-meant-50 to-white">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
          Our Products
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
            Mental Wellness Products
          </span>
        </h2>
        <p className="text-muted-foreground text-balance">
          Discover our carefully curated collection of products designed to support your mental health journey.
          From anxiety relief tools to sleep aids and mindfulness resources, we offer solutions that complement our digital services.
        </p>
      </div>

      <ProductCarousel
        title="Featured Products"
        description="Our most popular mental wellness products, highly rated by our community."
        products={featuredProducts}
      />
    </section>
  );
};

export default ProductsSection;
