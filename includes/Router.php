<?php
class Router {
    private $routes = [];
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
        
        // Register default routes
        $this->registerDefaultRoutes();
    }
    
    private function registerDefaultRoutes() {
        // Home route
        $this->addRoute('/', 'Home', 'index');
        $this->addRoute('/index.php', 'Home', 'index');
        
        // Spirituality route
        $this->addRoute('/spirituality', 'Spirituality', 'index');
        $this->addRoute('/spirituality.php', 'Spirituality', 'index');
        
        // Products route
        $this->addRoute('/products', 'Product', 'index');
        $this->addRoute('/products.php', 'Product', 'index');
        $this->addRoute('/products/detail', 'Product', 'detail');
        
        // Contact route
        $this->addRoute('/contact', 'Contact', 'index');
        $this->addRoute('/contact.php', 'Contact', 'index');
        
        // Cart route
        $this->addRoute('/cart', 'Cart', 'index');
        $this->addRoute('/cart.php', 'Cart', 'index');
    }
    
    public function addRoute($path, $controller, $action = 'index') {
        $this->routes[$path] = [
            'controller' => $controller,
            'action' => $action
        ];
    }
    
    public function dispatch($path) {
        // Default controller and action
        $controller = 'Home';
        $action = 'index';
        
        // Clean the path
        $path = strtok($path, '?');
        
        // Check if we have a direct match in routes
        if (isset($this->routes[$path])) {
            $controller = $this->routes[$path]['controller'];
            $action = $this->routes[$path]['action'];
        } else {
            // Parse the path to extract controller and action
            if (!empty($path) && $path !== '/') {
                $path_parts = explode('/', trim($path, '/'));
                
                if (!empty($path_parts[0])) {
                    $controller = ucfirst($path_parts[0]);
                }
                
                if (!empty($path_parts[1])) {
                    $action = $path_parts[1];
                }
            }
        }
        
        $this->loadController($controller, $action);
    }
    
    private function loadController($controller, $action) {
        // Check if controller file exists
        $controller_file = CONTROLLERS_PATH . $controller . 'Controller.php';
        
        if (file_exists($controller_file)) {
            require_once $controller_file;
            
            $controller_class = $controller . 'Controller';
            $controller_instance = new $controller_class($this->conn);
            
            // Check if the action method exists
            if (method_exists($controller_instance, $action)) {
                // Call the action method
                $controller_instance->$action();
            } else {
                // Action not found, display 404 page
                $this->showNotFound();
            }
        } else {
            // Controller not found, display 404 page
            $this->showNotFound();
        }
    }
    
    private function showNotFound() {
        header("HTTP/1.0 404 Not Found");
        include_once VIEWS_PATH . 'errors/404.php';
    }
}
?>
