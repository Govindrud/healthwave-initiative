
<?php
// Include configuration file
require_once 'includes/config.php';

// Create an instance of the HomeController
require_once 'controllers/HomeController.php';
$controller = new HomeController($conn);

// Display the home page
$controller->index();
?>
