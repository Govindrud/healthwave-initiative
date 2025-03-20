
<?php
// Database connection parameters
$servername = "localhost";
$username = "your_db_username"; // Replace with your actual database username
$password = "your_db_password"; // Replace with your actual database password
$dbname = "meanttohelp";

// Fallback products in case database is not available
$fallbackProducts = [
    [
        'id' => 1,
        'name' => 'Weighted Blanket',
        'description' => 'Experience deep relaxation with our premium weighted blanket designed to reduce anxiety and improve sleep quality. Made with ultra-soft, breathable fabric and evenly distributed weight.',
        'price' => 89.99,
        'image' => 'images/products/weighted-blanket.jpg',
        'category' => 'sleep'
    ],
    [
        'id' => 2,
        'name' => 'Meditation Cushion Set',
        'description' => 'Enhance your meditation practice with our ergonomic cushion set designed for comfort and proper posture. Includes matching zabuton mat for complete comfort during longer sessions.',
        'price' => 59.99,
        'image' => 'images/products/meditation-cushion.jpg',
        'category' => 'meditation'
    ],
    [
        'id' => 3,
        'name' => 'Anxiety Relief Stone Kit',
        'description' => 'Our handcrafted worry stones are made from natural materials to help with grounding and anxiety relief. Set includes 5 different stones in a beautiful wooden box.',
        'price' => 34.99,
        'image' => 'images/products/anxiety-stones.jpg',
        'category' => 'anxiety'
    ]
];

// Try to connect to database
$dbAvailable = false;
$featuredProducts = [];

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Query to get featured products
    $sql = "SELECT * FROM products WHERE featured = 1 LIMIT 3";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $dbAvailable = true;
        while($row = $result->fetch_assoc()) {
            $featuredProducts[] = $row;
        }
    } else {
        throw new Exception("No featured products found");
    }
    
    $conn->close();
} catch (Exception $e) {
    // Log error
    error_log("Database error: " . $e->getMessage());
    
    // Use fallback products
    $featuredProducts = $fallbackProducts;
}

// Display products
$products = $dbAvailable ? $featuredProducts : $fallbackProducts;

foreach ($products as $product) {
    $id = $product['id'];
    $name = $product['name'];
    $description = isset($product['short_description']) ? $product['short_description'] : $product['description'];
    $price = $product['price'];
    $image = $product['image'];
    $category = $product['category'];
    
    // Ensure description is not too long
    if (strlen($description) > 100) {
        $description = substr($description, 0, 97) . '...';
    }
    
    // Output the product card HTML with enhanced image display
    echo '<div class="product-card" data-category="' . $category . '">';
    echo '  <div class="product-image">';
    echo '    <img src="' . $image . '" alt="' . $name . '" loading="lazy" onerror="this.src=\'images/placeholder.svg\';this.onerror=null;" />';
    echo '    <div class="product-badge">' . ucfirst($category) . '</div>';
    echo '  </div>';
    echo '  <h3>' . $name . '</h3>';
    echo '  <p>' . $description . '</p>';
    echo '  <div class="product-price">$' . number_format($price, 2) . '</div>';
    echo '  <a href="product-detail.php?id=' . $id . '" class="view-product-btn">View Details</a>';
    echo '</div>';
}
?>
