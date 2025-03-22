
<?php
// Include configuration file
require_once 'includes/config.php';
require_once 'includes/Router.php';

// Simple router based on URL path
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path = substr(parse_url($request_uri, PHP_URL_PATH), strlen($base_path));

// Initialize the router
$router = new Router($conn);

// Dispatch the request
$router->dispatch($path);
?>
