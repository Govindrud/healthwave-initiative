
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
        // Use the ProductModel to get the featured products
        require_once 'models/ProductModel.php';
        $productModel = new ProductModel($this->conn);
        return $productModel->getFeaturedProducts(4);
    }
}
?>
