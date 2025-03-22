
<?php
// Include configuration file
require_once 'includes/config.php';

// Simple router based on URL path
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path = substr(parse_url($request_uri, PHP_URL_PATH), strlen($base_path));

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
    include_once 'views/home/index.php';
    exit;
}

// Check if controller file exists
$controller_file = CONTROLLERS_PATH . $controller . 'Controller.php';

if (file_exists($controller_file)) {
    require_once $controller_file;
    
    $controller_class = $controller . 'Controller';
    $controller_instance = new $controller_class($conn);
    
    // Check if the action method exists
    if (method_exists($controller_instance, $action)) {
        // Call the action method
        $controller_instance->$action();
    } else {
        // Action not found, display 404 page
        header("HTTP/1.0 404 Not Found");
        include_once 'views/errors/404.php';
    }
} else {
    // If it's spirituality.php direct access, route to the spirituality controller
    if ($path === '/spirituality.php') {
        require_once CONTROLLERS_PATH . 'SpiritualityController.php';
        $controller_instance = new SpiritualityController($conn);
        $controller_instance->index();
        exit;
    }
    
    // Controller not found, display 404 page
    header("HTTP/1.0 404 Not Found");
    include_once 'views/errors/404.php';
}
?>
