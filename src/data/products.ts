
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Weighted Blanket',
    shortDescription: 'Therapeutic weighted blanket for better sleep and anxiety relief',
    description: 'Our premium weighted blanket is designed to provide deep pressure stimulation, helping to reduce anxiety and improve sleep quality. Made with breathable cotton and filled with non-toxic glass beads.',
    image: '/images/products/weighted-blanket.jpg',
    price: 4999,
    discountPrice: 3999,
    category: 'sleep',
    stock: 25,
    rating: 4.8,
    badge: 'sale',
    features: [
      'Premium cotton cover',
      'Non-toxic glass beads',
      'Available in multiple weights',
      'Machine washable cover',
      'Free shipping included'
    ]
  },
  {
    id: '2',
    name: 'Meditation Cushion',
    shortDescription: 'Comfortable zafu cushion for meditation and mindfulness practice',
    description: 'Traditional zafu meditation cushion filled with organic buckwheat hulls. Provides proper posture support during meditation sessions.',
    image: '/images/products/meditation-cushion.jpg',
    price: 2499,
    category: 'meditation',
    stock: 40,
    rating: 4.7,
    badge: 'new',
    features: [
      'Organic buckwheat hull filling',
      'Removable washable cover',
      'Traditional zafu design',
      'Promotes proper posture',
      'Sustainable materials'
    ]
  },
  {
    id: '3',
    name: 'Aromatherapy Diffuser',
    shortDescription: 'Ultrasonic essential oil diffuser for relaxation and wellness',
    description: 'Create a calming atmosphere with our ultrasonic aromatherapy diffuser. Features LED lighting and multiple timer settings.',
    image: '/images/products/aromatherapy-diffuser.jpg',
    price: 3499,
    category: 'stress',
    stock: 30,
    rating: 4.6,
    features: [
      'Ultrasonic technology',
      'LED mood lighting',
      'Multiple timer settings',
      'Auto shut-off safety',
      'Whisper-quiet operation'
    ]
  },
  {
    id: '4',
    name: 'Sleep Mask',
    shortDescription: 'Luxury silk sleep mask for deep, restful sleep',
    description: 'Premium mulberry silk sleep mask that blocks out light completely. Gentle on skin and adjustable for comfort.',
    image: '/images/products/sleep-mask.jpg',
    price: 1299,
    category: 'sleep',
    stock: 50,
    rating: 4.5,
    features: [
      '100% mulberry silk',
      'Complete light blocking',
      'Adjustable elastic strap',
      'Hypoallergenic',
      'Travel-friendly case included'
    ]
  },
  {
    id: '5',
    name: 'Sound Machine',
    shortDescription: 'White noise machine with nature sounds for better sleep',
    description: 'High-quality sound machine with various white noise and nature sound options to help you sleep better and focus.',
    image: '/images/products/sound-machine.jpg',
    price: 2999,
    category: 'sleep',
    stock: 20,
    rating: 4.4,
    features: [
      '20 soothing sounds',
      'Timer function',
      'Memory function',
      'Portable design',
      'USB and battery powered'
    ]
  },
  {
    id: '6',
    name: 'Anxiety Relief Stones',
    shortDescription: 'Natural gemstone set for anxiety relief and grounding',
    description: 'Carefully selected gemstones known for their calming properties. Perfect for meditation and anxiety relief.',
    image: '/images/products/anxiety-stones.jpg',
    price: 1999,
    category: 'anxiety',
    stock: 35,
    rating: 4.3,
    features: [
      'Natural gemstones',
      'Includes amethyst and rose quartz',
      'Comes with guide book',
      'Velvet storage pouch',
      'Ethically sourced'
    ]
  },
  {
    id: '7',
    name: 'Productivity Journal',
    shortDescription: 'Guided journal for mental wellness and productivity',
    description: 'Structured journal designed to help track mood, set goals, and maintain mental wellness through daily reflections.',
    image: '/images/products/productivity-journal.jpg',
    price: 1799,
    category: 'focus',
    stock: 45,
    rating: 4.7,
    features: [
      'Daily mood tracking',
      'Goal setting pages',
      'Gratitude sections',
      'Progress tracking',
      'Premium paper quality'
    ]
  },
  {
    id: '8',
    name: 'Self-Care Box',
    shortDescription: 'Curated monthly box of wellness and self-care items',
    description: 'Monthly subscription box filled with carefully selected self-care items including teas, bath products, and wellness tools.',
    image: '/images/products/selfcare-box.jpg',
    price: 2999,
    category: 'selfcare',
    stock: 15,
    rating: 4.9,
    badge: 'popular',
    features: [
      'Monthly subscription',
      'Curated wellness items',
      'Bath and body products',
      'Herbal teas included',
      'Surprise wellness tools'
    ]
  }
];

export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = products.filter(product => product.badge === 'popular' || product.rating >= 4.7);
  return limit ? featured.slice(0, limit) : featured;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};
