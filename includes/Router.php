
<?php
class Router {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function dispatch($path) {
        // Remove trailing slash
        $path = rtrim($path, '/');
        
        // Default to home when path is empty
        if ($path === '') {
            $path = '/';
        }
        
        // Route the request
        switch ($path) {
            case '/':
                require_once 'controllers/HomeController.php';
                $controller = new HomeController($this->conn);
                $controller->index();
                break;
                
            case '/products':
                require_once 'controllers/ProductController.php';
                $controller = new ProductController($this->conn);
                $controller->index();
                break;
                
            case '/doctors':
                require_once 'controllers/DoctorController.php';
                $controller = new DoctorController($this->conn);
                $controller->index();
                break;
                
            case '/spirituality':
                require_once 'controllers/SpiritualityController.php';
                $controller = new SpiritualityController($this->conn);
                $controller->index();
                break;
                
            case '/contact':
                require_once 'controllers/ContactController.php';
                $controller = new ContactController($this->conn);
                $controller->index();
                break;
                
            case '/cart':
                require_once 'controllers/CartController.php';
                $controller = new CartController($this->conn);
                $controller->index();
                break;
                
            case '/login':
                require_once 'controllers/AuthController.php';
                $controller = new AuthController($this->conn);
                $controller->login();
                break;
                
            case '/register':
                require_once 'controllers/AuthController.php';
                $controller = new AuthController($this->conn);
                $controller->register();
                break;
                
            case '/logout':
                require_once 'controllers/AuthController.php';
                $controller = new AuthController($this->conn);
                $controller->logout();
                break;
                
            case '/payment-success':
                require_once 'controllers/PaymentController.php';
                $controller = new PaymentController($this->conn);
                $controller->success();
                break;
                
            default:
                // Check if it's a specific product page
                if (preg_match('/^\/products\/(\d+)$/', $path, $matches)) {
                    require_once 'controllers/ProductController.php';
                    $controller = new ProductController($this->conn);
                    $controller->show($matches[1]);
                }
                // Check if it's a specific doctor page
                else if (preg_match('/^\/doctors\/(\d+)$/', $path, $matches)) {
                    require_once 'controllers/DoctorController.php';
                    $controller = new DoctorController($this->conn);
                    $controller->show($matches[1]);
                }
                // If no specific route matched, show 404
                else {
                    $this->notFound();
                }
                break;
        }
    }
    
    private function notFound() {
        header("HTTP/1.0 404 Not Found");
        require_once 'controllers/ErrorController.php';
        $controller = new ErrorController($this->conn);
        $controller->notFound();
    }
}
?>
