
<?php
require_once 'includes/Controller.php';

class HomeController extends Controller {
    public function __construct($conn) {
        parent::__construct($conn);
    }
    
    public function index() {
        // Get featured products
        $featured_products = $this->getFeaturedProducts();
        
        // Include the view
        $this->render('home/index', ['featured_products' => $featured_products]);
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
