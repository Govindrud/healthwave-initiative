
<?php
// Include configuration file
require_once 'includes/config.php';

// Create an instance of the Product Controller
require_once CONTROLLERS_PATH . 'ProductController.php';
$controller = new ProductController($conn);

// Set page title and description
$pageTitle = 'Wellness Products | ' . SITE_NAME;
$metaDescription = 'Explore our curated collection of wellness products to support your mental health journey.';
$pageSpecificCSS = 'products.css';

// Include header
include VIEWS_PATH . 'includes/header.php';

// Get products data
$products = $controller->getAllProducts();
$featuredProducts = $controller->getFeaturedProducts(4);
$categories = $controller->getCategories();

// Default category filter
$categoryFilter = $_GET['category'] ?? 'all';
?>

<!-- Products Hero Section -->
<section class="products-hero">
    <div class="container">
        <div class="hero-content">
            <h1>Wellness Products</h1>
            <p>Discover tools and resources to support your mental wellbeing journey</p>
        </div>
    </div>
</section>

<!-- Products Catalog Section -->
<section class="products-catalog">
    <div class="container">
        <!-- Category Filter -->
        <div class="product-filters">
            <div class="category-filter">
                <h3>Categories</h3>
                <ul>
                    <li><a href="?category=all" class="<?php echo $categoryFilter === 'all' ? 'active' : ''; ?>">All Products</a></li>
                    <?php foreach ($categories as $category): ?>
                        <li><a href="?category=<?php echo urlencode($category); ?>" class="<?php echo $categoryFilter === $category ? 'active' : ''; ?>"><?php echo htmlspecialchars($category); ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            
            <div class="sort-filter">
                <label for="sort-by">Sort By:</label>
                <select id="sort-by" class="sort-select">
                    <option value="default">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>
        </div>
        
        <!-- Products Grid -->
        <div class="products-grid">
            <?php if (!empty($products)): ?>
                <?php foreach ($products as $product): ?>
                    <?php if ($categoryFilter === 'all' || $product['category'] === $categoryFilter): ?>
                        <div class="product-card" data-price="<?php echo $product['price']; ?>" data-name="<?php echo htmlspecialchars($product['name']); ?>">
                            <div class="product-image">
                                <img src="<?php echo !empty($product['image']) ? IMAGES_URL . 'products/' . $product['image'] : 'public/placeholder.svg'; ?>" 
                                     alt="<?php echo htmlspecialchars($product['name']); ?>"
                                     onerror="this.src='public/placeholder.svg'">
                                <?php if (!empty($product['sale_price']) && $product['sale_price'] < $product['price']): ?>
                                    <div class="product-tag sale">Sale</div>
                                <?php endif; ?>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name"><?php echo htmlspecialchars($product['name']); ?></h3>
                                <div class="product-category"><?php echo htmlspecialchars($product['category']); ?></div>
                                <div class="product-price">
                                    <?php if (!empty($product['sale_price']) && $product['sale_price'] < $product['price']): ?>
                                        <span class="original-price">₹<?php echo number_format($product['price'], 2); ?></span>
                                        <span class="sale-price">₹<?php echo number_format($product['sale_price'], 2); ?></span>
                                    <?php else: ?>
                                        <span>₹<?php echo number_format($product['price'], 2); ?></span>
                                    <?php endif; ?>
                                </div>
                                <div class="product-actions">
                                    <a href="product-detail.php?id=<?php echo $product['id']; ?>" class="view-btn">View Details</a>
                                    <button class="add-to-cart-btn" data-id="<?php echo $product['id']; ?>">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="no-products">
                    <p>No products found. Please check back later.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="featured-products">
    <div class="container">
        <div class="section-header">
            <h2>Featured Products</h2>
            <p>Our most popular wellness products</p>
        </div>
        
        <div class="featured-grid">
            <?php foreach ($featuredProducts as $product): ?>
                <div class="product-card featured">
                    <div class="product-image">
                        <img src="<?php echo !empty($product['image']) ? IMAGES_URL . 'products/' . $product['image'] : 'public/placeholder.svg'; ?>" 
                             alt="<?php echo htmlspecialchars($product['name']); ?>"
                             onerror="this.src='public/placeholder.svg'">
                        <?php if (!empty($product['sale_price']) && $product['sale_price'] < $product['price']): ?>
                            <div class="product-tag sale">Sale</div>
                        <?php endif; ?>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name"><?php echo htmlspecialchars($product['name']); ?></h3>
                        <div class="product-category"><?php echo htmlspecialchars($product['category']); ?></div>
                        <div class="product-price">
                            <?php if (!empty($product['sale_price']) && $product['sale_price'] < $product['price']): ?>
                                <span class="original-price">₹<?php echo number_format($product['price'], 2); ?></span>
                                <span class="sale-price">₹<?php echo number_format($product['sale_price'], 2); ?></span>
                            <?php else: ?>
                                <span>₹<?php echo number_format($product['price'], 2); ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="product-actions">
                            <a href="product-detail.php?id=<?php echo $product['id']; ?>" class="view-btn">View Details</a>
                            <button class="add-to-cart-btn" data-id="<?php echo $product['id']; ?>">Add to Cart</button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Product Benefits -->
<section class="product-benefits">
    <div class="container">
        <div class="benefits-grid">
            <div class="benefit-card">
                <div class="benefit-icon">
                    <i class="fas fa-truck"></i>
                </div>
                <h3>Free Shipping</h3>
                <p>On all orders over ₹1500</p>
            </div>
            
            <div class="benefit-card">
                <div class="benefit-icon">
                    <i class="fas fa-undo"></i>
                </div>
                <h3>Easy Returns</h3>
                <p>30-day money back guarantee</p>
            </div>
            
            <div class="benefit-card">
                <div class="benefit-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Secure Payments</h3>
                <p>Protected by encryption</p>
            </div>
            
            <div class="benefit-card">
                <div class="benefit-icon">
                    <i class="fas fa-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Contact us anytime</p>
            </div>
        </div>
    </div>
</section>

<!-- Add to Cart Notification -->
<div id="cart-notification" class="cart-notification">
    <div class="notification-icon">
        <i class="fas fa-check-circle"></i>
    </div>
    <div class="notification-content">
        <p>Product added to cart!</p>
    </div>
</div>

<!-- Include footer -->
<?php include VIEWS_PATH . 'includes/footer.php'; ?>

<!-- Product Sorting Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-by');
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        
        productCards.sort(function(a, b) {
            switch(sortValue) {
                case 'price-low':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                    
                case 'price-high':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                    
                case 'name-asc':
                    return a.dataset.name.localeCompare(b.dataset.name);
                    
                case 'name-desc':
                    return b.dataset.name.localeCompare(a.dataset.name);
                    
                default:
                    return 0;
            }
        });
        
        // Remove all current products
        productCards.forEach(card => card.remove());
        
        // Add sorted products
        productCards.forEach(card => productsGrid.appendChild(card));
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartNotification = document.getElementById('cart-notification');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            
            // In a real implementation, you would send an AJAX request to add the product to the cart
            // For demonstration, we'll just show the notification
            
            // Show notification
            cartNotification.classList.add('show');
            
            // Update cart count (for demo purposes)
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);
        });
    });
});
</script>
