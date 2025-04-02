
<?php
// Include configuration file
require_once 'includes/config.php';

// Set page title and description
$pageTitle = 'Shopping Cart | ' . SITE_NAME;
$metaDescription = 'View your selected wellness products and proceed to checkout.';
$pageSpecificCSS = 'cart.css';

// Include header
include VIEWS_PATH . 'includes/header.php';

// For demo purposes, let's create some dummy cart items
// In a real implementation, you would fetch cart items from session or database
$cartItems = [
    [
        'id' => 1,
        'name' => 'Meditation Cushion',
        'price' => 999.00,
        'quantity' => 1,
        'image' => 'meditation-cushion.jpg'
    ],
    [
        'id' => 3,
        'name' => 'Sleep Mask',
        'price' => 399.00,
        'quantity' => 2,
        'image' => 'sleep-mask.jpg'
    ]
];

// Calculate cart total
$cartSubtotal = 0;
foreach ($cartItems as $item) {
    $cartSubtotal += $item['price'] * $item['quantity'];
}

// Set shipping and tax rates
$shipping = $cartSubtotal > 1500 ? 0 : 100;
$tax = $cartSubtotal * 0.18; // 18% GST
$cartTotal = $cartSubtotal + $shipping + $tax;
?>

<!-- Cart Hero Section -->
<section class="cart-hero">
    <div class="container">
        <div class="hero-content">
            <h1>Your Shopping Cart</h1>
            <div class="breadcrumbs">
                <a href="<?php echo SITE_URL; ?>">Home</a> / 
                <a href="<?php echo SITE_URL; ?>/products.php">Products</a> / 
                <span>Cart</span>
            </div>
        </div>
    </div>
</section>

<!-- Cart Content Section -->
<section class="cart-content">
    <div class="container">
        <?php if (!empty($cartItems)): ?>
            <div class="cart-container">
                <div class="cart-items">
                    <div class="cart-header">
                        <div class="header-product">Product</div>
                        <div class="header-price">Price</div>
                        <div class="header-quantity">Quantity</div>
                        <div class="header-total">Total</div>
                        <div class="header-action"></div>
                    </div>
                    
                    <?php foreach ($cartItems as $item): ?>
                        <div class="cart-item">
                            <div class="item-product">
                                <div class="product-image">
                                    <img src="<?php echo !empty($item['image']) ? IMAGES_URL . 'products/' . $item['image'] : 'public/placeholder.svg'; ?>" 
                                         alt="<?php echo htmlspecialchars($item['name']); ?>"
                                         onerror="this.src='public/placeholder.svg'">
                                </div>
                                <div class="product-name">
                                    <h3><?php echo htmlspecialchars($item['name']); ?></h3>
                                </div>
                            </div>
                            <div class="item-price">₹<?php echo number_format($item['price'], 2); ?></div>
                            <div class="item-quantity">
                                <div class="quantity-control">
                                    <button class="quantity-btn decrease" data-id="<?php echo $item['id']; ?>">-</button>
                                    <input type="number" value="<?php echo $item['quantity']; ?>" min="1" max="10" data-id="<?php echo $item['id']; ?>">
                                    <button class="quantity-btn increase" data-id="<?php echo $item['id']; ?>">+</button>
                                </div>
                            </div>
                            <div class="item-total">₹<?php echo number_format($item['price'] * $item['quantity'], 2); ?></div>
                            <div class="item-action">
                                <button class="remove-item" data-id="<?php echo $item['id']; ?>">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="cart-sidebar">
                    <div class="cart-summary">
                        <h2>Order Summary</h2>
                        
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>₹<?php echo number_format($cartSubtotal, 2); ?></span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span><?php echo $shipping > 0 ? '₹' . number_format($shipping, 2) : 'Free'; ?></span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Tax (18% GST)</span>
                            <span>₹<?php echo number_format($tax, 2); ?></span>
                        </div>
                        
                        <div class="summary-row total">
                            <span>Total</span>
                            <span>₹<?php echo number_format($cartTotal, 2); ?></span>
                        </div>
                        
                        <div class="promo-code">
                            <h3>Promo Code</h3>
                            <div class="promo-input">
                                <input type="text" placeholder="Enter promo code">
                                <button>Apply</button>
                            </div>
                        </div>
                        
                        <div class="checkout-actions">
                            <button class="checkout-btn">Proceed to Checkout</button>
                            <a href="<?php echo SITE_URL; ?>/products.php" class="continue-shopping">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <a href="<?php echo SITE_URL; ?>/products.php" class="shop-now-btn">Shop Now</a>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- Related Products Section -->
<section class="related-products">
    <div class="container">
        <div class="section-header">
            <h2>You Might Also Like</h2>
            <p>Products recommended for you</p>
        </div>
        
        <div class="related-grid">
            <!-- Product Card 1 -->
            <div class="product-card">
                <div class="product-image">
                    <img src="<?php echo IMAGES_URL; ?>products/aromatherapy-diffuser.jpg" alt="Aromatherapy Diffuser" onerror="this.src='public/placeholder.svg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">Aromatherapy Diffuser</h3>
                    <div class="product-category">Wellness</div>
                    <div class="product-price">
                        <span class="original-price">₹1500.00</span>
                        <span class="sale-price">₹1299.00</span>
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.php?id=2" class="view-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="2">Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Product Card 2 -->
            <div class="product-card">
                <div class="product-image">
                    <img src="<?php echo IMAGES_URL; ?>products/weighted-blanket.jpg" alt="Weighted Blanket" onerror="this.src='public/placeholder.svg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">Weighted Blanket</h3>
                    <div class="product-category">Sleep</div>
                    <div class="product-price">
                        <span class="original-price">₹3500.00</span>
                        <span class="sale-price">₹2999.00</span>
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.php?id=4" class="view-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="4">Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Product Card 3 -->
            <div class="product-card">
                <div class="product-image">
                    <img src="<?php echo IMAGES_URL; ?>products/selfcare-box.jpg" alt="Self Care Gift Box" onerror="this.src='public/placeholder.svg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">Self Care Gift Box</h3>
                    <div class="product-category">Wellness</div>
                    <div class="product-price">
                        <span>₹2500.00</span>
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.php?id=5" class="view-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="5">Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Product Card 4 -->
            <div class="product-card">
                <div class="product-image">
                    <img src="<?php echo IMAGES_URL; ?>products/sound-machine.jpg" alt="White Noise Machine" onerror="this.src='public/placeholder.svg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">White Noise Machine</h3>
                    <div class="product-category">Sleep</div>
                    <div class="product-price">
                        <span>₹1800.00</span>
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.php?id=7" class="view-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="7">Add to Cart</button>
                    </div>
                </div>
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

<!-- Cart Page Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Quantity control
    const quantityInputs = document.querySelectorAll('.quantity-control input');
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    // Handle quantity decrease
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (value > 1) {
                input.value = value - 1;
                updateCartItem(input.dataset.id, input.value);
            }
        });
    });
    
    // Handle quantity increase
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (value < parseInt(input.max)) {
                input.value = value + 1;
                updateCartItem(input.dataset.id, input.value);
            }
        });
    });
    
    // Handle direct input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            if (value < 1) {
                this.value = 1;
                value = 1;
            } else if (value > parseInt(this.max)) {
                this.value = this.max;
                value = parseInt(this.max);
            }
            
            updateCartItem(this.dataset.id, value);
        });
    });
    
    // Handle item removal
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            
            // In a real implementation, you would send an AJAX request to remove the item
            // For demonstration, we'll just remove the item from the DOM and update totals
            
            const cartItem = this.closest('.cart-item');
            cartItem.classList.add('removing');
            
            // Animate removal
            setTimeout(() => {
                cartItem.remove();
                
                // Check if cart is empty after removal
                const remainingItems = document.querySelectorAll('.cart-item');
                if (remainingItems.length === 0) {
                    const cartContainer = document.querySelector('.cart-container');
                    
                    if (cartContainer) {
                        // Create empty cart message
                        const emptyCart = document.createElement('div');
                        emptyCart.className = 'empty-cart';
                        emptyCart.innerHTML = `
                            <div class="empty-cart-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <h2>Your Cart is Empty</h2>
                            <p>Looks like you haven't added any products to your cart yet.</p>
                            <a href="${SITE_URL}/products.php" class="shop-now-btn">Shop Now</a>
                        `;
                        
                        // Replace cart container with empty message
                        cartContainer.parentNode.replaceChild(emptyCart, cartContainer);
                    }
                } else {
                    // Update cart totals
                    updateCartTotals();
                }
            }, 300);
        });
    });
    
    // Update cart item (would be an AJAX call in real implementation)
    function updateCartItem(productId, quantity) {
        // In a real implementation, you would send an AJAX request to update the cart
        // For demonstration, we'll just update the UI
        
        const cartItem = document.querySelector(`.cart-item .item-quantity input[data-id="${productId}"]`).closest('.cart-item');
        const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace('₹', '').replace(',', ''));
        const totalElement = cartItem.querySelector('.item-total');
        
        const itemTotal = price * quantity;
        totalElement.textContent = `₹${itemTotal.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Update overall cart totals
        updateCartTotals();
    }
    
    // Update cart totals
    function updateCartTotals() {
        const itemTotals = Array.from(document.querySelectorAll('.item-total')).map(el => {
            return parseFloat(el.textContent.replace('₹', '').replace(',', ''));
        });
        
        const subtotal = itemTotals.reduce((acc, val) => acc + val, 0);
        const shipping = subtotal > 1500 ? 0 : 100;
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + shipping + tax;
        
        // Update summary display
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `₹${subtotal.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = shipping > 0 ? `₹${shipping.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'Free';
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `₹${tax.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        document.querySelector('.summary-row.total span:last-child').textContent = `₹${total.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Handle promo code application
    const promoButton = document.querySelector('.promo-input button');
    
    if (promoButton) {
        promoButton.addEventListener('click', function() {
            const promoInput = document.querySelector('.promo-input input');
            const promoCode = promoInput.value.trim();
            
            if (promoCode) {
                // In a real implementation, you would validate the promo code via AJAX
                // For demonstration, we'll just show a message
                
                if (promoCode.toUpperCase() === 'WELCOME10') {
                    // Create discount row if it doesn't exist
                    let discountRow = document.querySelector('.summary-row.discount');
                    
                    if (!discountRow) {
                        const totalRow = document.querySelector('.summary-row.total');
                        discountRow = document.createElement('div');
                        discountRow.className = 'summary-row discount';
                        discountRow.innerHTML = `
                            <span>Discount (10%)</span>
                            <span>-₹0.00</span>
                        `;
                        totalRow.parentNode.insertBefore(discountRow, totalRow);
                    }
                    
                    // Calculate discount
                    const subtotalText = document.querySelector('.summary-row:nth-child(1) span:last-child').textContent;
                    const subtotal = parseFloat(subtotalText.replace('₹', '').replace(',', ''));
                    const discount = subtotal * 0.1; // 10% discount
                    
                    // Update discount and total
                    discountRow.querySelector('span:last-child').textContent = `-₹${discount.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                    // Recalculate total
                    const shippingText = document.querySelector('.summary-row:nth-child(2) span:last-child').textContent;
                    const shipping = shippingText === 'Free' ? 0 : parseFloat(shippingText.replace('₹', '').replace(',', ''));
                    const taxText = document.querySelector('.summary-row:nth-child(3) span:last-child').textContent;
                    const tax = parseFloat(taxText.replace('₹', '').replace(',', ''));
                    
                    const total = subtotal + shipping + tax - discount;
                    document.querySelector('.summary-row.total span:last-child').textContent = `₹${total.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                    // Show success message
                    showToast('Promo code applied successfully!', 'success');
                    
                    // Disable input and button
                    promoInput.disabled = true;
                    promoButton.disabled = true;
                } else {
                    // Show error message
                    showToast('Invalid promo code. Please try again.', 'error');
                }
            } else {
                // Show error message
                showToast('Please enter a promo code.', 'warning');
            }
        });
    }
    
    // Handle checkout button
    const checkoutButton = document.querySelector('.checkout-btn');
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // In a real implementation, you would redirect to checkout page
            // For demonstration, we'll just show a message
            alert('Proceeding to checkout...');
        });
    }
    
    // Add to cart functionality for recommended products
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
