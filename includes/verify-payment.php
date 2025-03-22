
<?php
// Include configuration file
require_once 'config.php';

// Create an instance of the Spirituality Controller
require_once CONTROLLERS_PATH . 'SpiritualityController.php';
$controller = new SpiritualityController($conn);

// Process the payment verification
$controller->verifyPayment();
?>
