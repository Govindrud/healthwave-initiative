
<?php
class HomeController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function index() {
        // Get featured products
        $featured_products = $this->getFeaturedProducts();
        
        // Include the view
        include_once(VIEWS_PATH . 'home/index.php');
    }
    
    private function getFeaturedProducts() {
        $products = [];
        $sql = "SELECT * FROM products WHERE featured = 1 LIMIT 4";
        $result = $this->conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }
        
        return $products;
    }
}
?>
