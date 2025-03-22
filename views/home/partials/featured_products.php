
<!-- Featured Products Section -->
<section id="featured-products" class="featured-products-section">
    <div class="container">
        <div class="section-header">
            <span class="badge">Featured</span>
            <h2 class="font-playfair">Products for <span class="gradient-text">Mental Wellbeing</span></h2>
            <p>Carefully selected tools to help you on your journey to better mental health.</p>
        </div>

        <div class="product-grid">
            <?php
            // Get featured products from database
            if (isset($featured_products) && !empty($featured_products)) {
                foreach($featured_products as $product) {
            ?>
            <div class="product-card">
                <div class="product-badge <?php echo $product['badge']; ?>"><?php echo ucfirst($product['badge']); ?></div>
                <div class="product-image">
                    <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" onerror="this.src='https://via.placeholder.com/300x300?text=Product'">
                </div>
                <div class="product-details">
                    <h3><?php echo $product['name']; ?></h3>
                    <p><?php echo $product['short_description']; ?></p>
                    <div class="product-price">
                        <span class="price">₹<?php echo number_format($product['price'], 2); ?></span>
                        <?php if (!empty($product['discount_price'])): ?>
                        <span class="original-price">₹<?php echo number_format($product['discount_price'], 2); ?></span>
                        <?php endif; ?>
                    </div>
                    <a href="product.php?slug=<?php echo $product['slug']; ?>" class="btn btn-outline btn-sm">View Details</a>
                </div>
            </div>
            <?php
                }
            } else {
                echo "<p class='no-products'>No featured products available.</p>";
            }
            ?>
        </div>
        
        <div class="section-cta">
            <a href="products.php" class="btn btn-primary">View All Products</a>
        </div>
    </div>
</section>
