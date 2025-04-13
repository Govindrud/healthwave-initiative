
import DatabaseService, { DatabaseRecord } from '@/services/DatabaseService';

export interface Product extends DatabaseRecord {
  name: string;
  description: string;
  short_description?: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  stock?: number;
}

class ProductModel {
  private db = DatabaseService.getInstance();
  private table = 'products';
  
  async getAllProducts(): Promise<Product[]> {
    return this.db.getAll<Product>(this.table);
  }
  
  async getProductById(id: string | number): Promise<Product | null> {
    return this.db.getById<Product>(this.table, id);
  }
  
  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    return this.db.getWhere<Product>(this.table, { featured: true }, limit);
  }
  
  async getProductsByCategory(category: string, limit = 12, offset = 0): Promise<Product[]> {
    return this.db.getWhere<Product>(this.table, { category }, limit, offset);
  }
  
  async searchProducts(keyword: string, limit = 12, offset = 0): Promise<Product[]> {
    // Search in name and description
    const nameResults = await this.db.search<Product>(this.table, 'name', keyword, limit, offset);
    
    if (nameResults.length >= limit) {
      return nameResults;
    }
    
    // If we didn't get enough results from name search, also search in description
    const descResults = await this.db.search<Product>(this.table, 'description', keyword, limit - nameResults.length, offset);
    
    // Combine results, removing duplicates
    const allResults = [...nameResults];
    descResults.forEach(product => {
      if (!allResults.some(p => p.id === product.id)) {
        allResults.push(product);
      }
    });
    
    return allResults;
  }
  
  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<string | number | null> {
    return this.db.create<Product>(this.table, product);
  }
  
  async updateProduct(id: string | number, product: Partial<Product>): Promise<boolean> {
    return this.db.update<Product>(this.table, id, product);
  }
  
  async deleteProduct(id: string | number): Promise<boolean> {
    return this.db.delete(this.table, id);
  }
}

export default ProductModel;
