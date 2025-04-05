
<?php
require_once 'includes/Controller.php';
require_once 'models/ProductModel.php';

class ProductController extends Controller {
    private $model;
    
    public function __construct($conn) {
        parent::__construct($conn);
        $this->model = new ProductModel($conn);
    }
    
    public function index() {
        // Get products data
        $products = $this->model->getAllProducts();
        $featuredProducts = $this->model->getFeaturedProducts(4);
        $categories = $this->model->getCategories();
        
        // Set page specific variables
        $pageTitle = 'Wellness Products | ' . SITE_NAME;
        $metaDescription = 'Explore our curated collection of wellness products to support your mental health journey.';
        $pageSpecificCSS = 'products.css';
        
        // Include the view with data
        $this->render('products/index', [
            'products' => $products,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'pageTitle' => $pageTitle,
            'metaDescription' => $metaDescription,
            'pageSpecificCSS' => $pageSpecificCSS
        ]);
    }
    
    public function detail($id = null) {
        // Get product ID from request if not provided as parameter
        if ($id === null) {
            $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        }
        
        // Get product details
        $product = $this->model->getById($id);
        
        if (!$product) {
            // Product not found
            $this->render('errors/404', [
                'pageTitle' => 'Product Not Found | ' . SITE_NAME,
                'metaDescription' => 'The requested product could not be found.'
            ]);
            return;
        }
        
        // Get related products
        $relatedProducts = $this->model->getRelatedProducts($product['category'], $id, 4);
        
        // Set page specific variables
        $pageTitle = htmlspecialchars($product['name']) . ' | ' . SITE_NAME;
        $metaDescription = substr(htmlspecialchars($product['description']), 0, 160);
        $pageSpecificCSS = 'product-detail.css';
        
        // Include the view with data
        $this->render('products/detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'pageTitle' => $pageTitle,
            'metaDescription' => $metaDescription,
            'pageSpecificCSS' => $pageSpecificCSS
        ]);
    }
    
    public function addToCart() {
        header('Content-Type: application/json');
        
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
            exit;
        }
        
        $productId = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
        $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
        
        // Add product to cart (in a real implementation, would handle cart logic)
        $success = $this->model->addToCart($productId, $quantity);
        
        if ($success) {
            echo json_encode(['status' => 'success', 'message' => 'Product added to cart successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add product to cart.']);
        }
        exit;
    }
    
    public function getAllProducts() {
        return $this->model->getAllProducts();
    }
    
    public function getFeaturedProducts($limit = 4) {
        return $this->model->getFeaturedProducts($limit);
    }
    
    public function getCategories() {
        return $this->model->getCategories();
    }
}
?>
