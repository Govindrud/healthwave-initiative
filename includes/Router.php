
<?php
class Router {
    private $routes = [];
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
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
        
        // Special case for the root URL
        if ($path === '/' || $path === '') {
            // Display the home page
            $controller = 'Home';
            $action = 'index';
        }
        
        // Legacy support for direct file access
        if ($path === '/spirituality.php') {
            $controller = 'Spirituality';
            $action = 'index';
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
