
import { useQuery } from '@tanstack/react-query';
import ProductModel, { Product } from '@/models/ProductModel';

const productModel = new ProductModel();

export function useAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => await productModel.getAllProducts()
  });
}

export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => await productModel.getFeaturedProducts(limit)
  });
}

export function useProductsByCategory(category: string, limit = 12, offset = 0) {
  return useQuery({
    queryKey: ['products', 'category', category, limit, offset],
    queryFn: async () => await productModel.getProductsByCategory(category, limit, offset)
  });
}

export function useProductById(id: string | number | undefined) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      if (!id) return null;
      return await productModel.getProductById(id);
    },
    enabled: !!id
  });
}
