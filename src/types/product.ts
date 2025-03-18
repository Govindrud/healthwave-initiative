
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  category: 'meditation' | 'sleep' | 'anxiety' | 'stress' | 'focus' | 'selfcare';
  image: string;
  badge?: 'new' | 'sale' | 'popular';
  rating: number;
  stock: number;
  features: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}
