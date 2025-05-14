
import { Product as ModelProduct } from '@/models/ProductModel';
import { Product as UIProduct } from '@/types/product';

/**
 * Maps a database product model to the UI product format
 */
export function mapDatabaseProductToUIProduct(product: ModelProduct): UIProduct {
  return {
    id: String(product.id),
    name: product.name,
    description: product.description,
    shortDescription: product.short_description || product.description?.substring(0, 120) + '...' || 'No description available',
    price: product.price,
    discountPrice: product.sale_price || undefined,
    category: (product.category as UIProduct['category']) || 'selfcare',
    image: product.image || '/placeholder.svg',
    badge: undefined,
    rating: 4.5, // Default rating if not available
    stock: product.stock || 10,
    features: [] // Default empty features array
  };
}

/**
 * Maps an array of database products to UI product format
 */
export function mapDatabaseProductsToUIProducts(products: ModelProduct[] = []): UIProduct[] {
  if (!products || !Array.isArray(products)) {
    console.warn('Invalid products array passed to mapping utility', products);
    return [];
  }
  return products.map(mapDatabaseProductToUIProduct);
}
