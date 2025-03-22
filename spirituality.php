
<?php
// Include configuration file
require_once 'includes/config.php';

// Create an instance of the Spirituality Controller
require_once CONTROLLERS_PATH . 'SpiritualityController.php';
$controller = new SpiritualityController($conn);

// Route based on action requested
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'create_priest_order':
            $controller->processPriestBooking();
            break;
            
        case 'create_tour_order':
            $controller->processTourBooking();
            break;
            
        default:
            // Default to showing the page
            $controller->index();
            break;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // For JSON data in request body (like verify-payment)
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data && isset($data['payment_id'])) {
        $controller->verifyPayment();
    } else {
        $controller->index();
    }
} else {
    // Default to showing the spirituality page
    $controller->index();
}
?>
