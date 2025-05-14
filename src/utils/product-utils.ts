
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
    shortDescription: product.short_description || product.description.substring(0, 120) + '...',
    price: product.price,
    discountPrice: undefined,
    category: (product.category as UIProduct['category']) || 'selfcare',
    image: product.image,
    badge: undefined,
    rating: 4.5, // Default rating if not available
    stock: product.stock || 10,
    features: [] // Default empty features array
  };
}

/**
 * Maps an array of database products to UI product format
 */
export function mapDatabaseProductsToUIProducts(products: ModelProduct[]): UIProduct[] {
  return products.map(mapDatabaseProductToUIProduct);
}
