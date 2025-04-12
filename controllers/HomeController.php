
<?php
require_once 'includes/Controller.php';

class HomeController extends Controller {
    public function __construct($conn) {
        parent::__construct($conn);
    }
    
    public function index() {
        // Get featured products
        $featured_products = $this->getFeaturedProducts();
        
        // Set page specific variables
        $pageTitle = SITE_NAME . ' - Support for Mental Well-being';
        $metaDescription = SITE_NAME . ' provides tools, resources and services to support your mental well-being journey.';
        $pageSpecificCSS = 'home.css'; // This remains the same since we're using imports in home.css
        $pageSpecificJS = 'slider.js';
        
        // Include the view with data
        $this->render('home/index', [
            'featured_products' => $featured_products,
            'pageTitle' => $pageTitle,
            'metaDescription' => $metaDescription,
            'pageSpecificCSS' => $pageSpecificCSS,
            'pageSpecificJS' => $pageSpecificJS
        ]);
    }
    
    private function getFeaturedProducts() {
        // Use the ProductModel to get the featured products
        require_once 'models/ProductModel.php';
        $productModel = new ProductModel($this->conn);
        return $productModel->getFeaturedProducts(4);
    }
}
?>
