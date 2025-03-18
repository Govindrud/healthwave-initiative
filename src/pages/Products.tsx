
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { products, productCategories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    document.title = "Products | MeantToHelp";
  }, []);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container px-4 mx-auto py-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-meant-800">Mental Wellness Products</h1>
            <p className="text-muted-foreground">
              Browse our collection of products designed to support your mental wellbeing and complement our digital services.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className={selectedCategory === null ? "bg-meant-600 hover:bg-meant-700" : ""}
                    >
                      All
                    </Button>
                    {productCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id ? "bg-meant-600 hover:bg-meant-700" : ""}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 lg:w-3/4">
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
