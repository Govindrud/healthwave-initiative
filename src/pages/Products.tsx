
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { useAllProducts } from '@/hooks/use-products';
import { mapDatabaseProductsToUIProducts } from '@/utils/product-utils';

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: databaseProducts, isLoading, error } = useAllProducts();
  
  // Convert database products to UI product format
  const products = databaseProducts ? mapDatabaseProductsToUIProducts(databaseProducts) : [];

  return (
    <MainLayout title="Products - Mental Health Support Tools">
      <div className="container mx-auto max-w-7xl p-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Mental Wellbeing Products</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our range of products designed to support your mental health journey and enhance your daily wellbeing.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>Sorry, we couldn't load the products at this time. Please try again later.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
