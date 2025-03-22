
<?php 
require_once 'includes/config.php'; 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeantToHelp - Support for Mental Well-being</title>
    <meta name="description" content="MeantToHelp provides tools, resources and services to support your mental well-being journey.">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <?php include 'includes/header.php'; ?>

    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <span class="badge">Mental Wellbeing</span>
                    <h1 class="font-playfair">Find Your <span class="gradient-text">Inner Peace</span></h1>
                    <p>Products and services designed to support your mental wellbeing journey.</p>
                    <div class="hero-buttons">
                        <a href="#featured-products" class="btn btn-primary">Explore Products</a>
                        <a href="#our-services" class="btn btn-outline">Our Services</a>
                    </div>
                </div>
            </div>
        </section>

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
                    $sql = "SELECT * FROM products WHERE featured = 1 LIMIT 4";
                    $result = $conn->query($sql);
                    
                    if ($result && $result->num_rows > 0) {
                        while($product = $result->fetch_assoc()) {
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

        <!-- Our Services Section -->
        <section id="our-services" class="services-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Services</span>
                    <h2 class="font-playfair">Support for Your <span class="gradient-text">Mental Journey</span></h2>
                    <p>Professional services to guide and support your mental wellbeing.</p>
                </div>

                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <h3>Professional Therapy</h3>
                        <p>Connect with licensed therapists who specialize in various mental health concerns.</p>
                        <a href="doctors.php" class="btn btn-text">Learn More <i class="fas fa-arrow-right"></i></a>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-pray"></i>
                        </div>
                        <h3>Spiritual Guidance</h3>
                        <p>Explore spiritual practices and connect with guides to nurture your spiritual wellbeing.</p>
                        <a href="spirituality.php" class="btn btn-text">Learn More <i class="fas fa-arrow-right"></i></a>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>Support Groups</h3>
                        <p>Join community groups focused on specific mental health topics for shared support.</p>
                        <a href="#" class="btn btn-text">Coming Soon <i class="fas fa-arrow-right"></i></a>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fas fa-book-reader"></i>
                        </div>
                        <h3>Educational Resources</h3>
                        <p>Access articles, guides, and workbooks to better understand mental health concepts.</p>
                        <a href="#" class="btn btn-text">Coming Soon <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge">Testimonials</span>
                    <h2 class="font-playfair">What Our <span class="gradient-text">Clients Say</span></h2>
                    <p>Real experiences from people on their mental wellbeing journey.</p>
                </div>
                
                <div class="testimonials-slider">
                    <div class="testimonial-slide">
                        <div class="testimonial-content">
                            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                            <p>The weighted blanket has significantly improved my sleep quality. I fall asleep faster and stay asleep longer. It's been a game-changer for my anxiety-related insomnia.</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">
                                    <img src="images/testimonials/user1.jpg" alt="Priya M." onerror="this.src='https://via.placeholder.com/50x50?text=PM'">
                                </div>
                                <div class="author-info">
                                    <h4>Priya M.</h4>
                                    <p>Mumbai, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-content">
                            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                            <p>The consultation with Dr. Sharma provided me with practical techniques to manage my work stress. I'm already noticing a positive difference in how I respond to challenging situations.</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">
                                    <img src="images/testimonials/user2.jpg" alt="Rahul K." onerror="this.src='https://via.placeholder.com/50x50?text=RK'">
                                </div>
                                <div class="author-info">
                                    <h4>Rahul K.</h4>
                                    <p>Bangalore, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-content">
                            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                            <p>My spiritual consultation with Swami Anandji has transformed my outlook on life. His wisdom and guidance have helped me find inner peace during a challenging transition in my life.</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">
                                    <img src="images/testimonials/user3.jpg" alt="Anita S." onerror="this.src='https://via.placeholder.com/50x50?text=AS'">
                                </div>
                                <div class="author-info">
                                    <h4>Anita S.</h4>
                                    <p>Delhi, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>Ready to start your mental wellbeing journey?</h2>
                    <p>Explore our products, connect with professionals, or join our community resources.</p>
                    <div class="cta-buttons">
                        <a href="products.php" class="btn btn-light">Shop Products</a>
                        <a href="doctors.php" class="btn btn-outline-light">Meet Our Therapists</a>
                        <a href="spirituality.php" class="btn btn-outline-light">Spiritual Services</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>

</html>
