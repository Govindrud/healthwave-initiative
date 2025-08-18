
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load cart count from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartCount(JSON.parse(savedCart).length || 0);
    }
    // Load wishlist count from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length || 0);
    }
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'price-high':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <MainLayout 
      title="Mental Wellbeing Products - MeantToHelp"
      description="Discover our curated collection of mental health products including weighted blankets, meditation cushions, aromatherapy diffusers, and wellness tools."
    >
      <div className="container mx-auto max-w-7xl p-4 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Mental Wellbeing Products</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Discover our range of products designed to support your mental health journey and enhance your daily wellbeing.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartCount})
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist ({wishlistCount})
            </Badge>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter ({filteredProducts.length})
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        {/* Product Categories Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Sleep & Relaxation</h3>
            <p className="text-sm text-muted-foreground">Weighted blankets, sleep masks, and sound machines for better rest</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2">Mindfulness & Meditation</h3>
            <p className="text-sm text-muted-foreground">Cushions, journals, and tools for mindful living</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <h3 className="font-semibold mb-2">Stress Relief & Wellness</h3>
            <p className="text-sm text-muted-foreground">Aromatherapy, crystals, and self-care essentials</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
