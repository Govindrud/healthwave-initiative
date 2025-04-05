
<?php
// Include configuration file
require_once 'includes/config.php';

// Create an instance of the Spirituality Controller
require_once CONTROLLERS_PATH . 'SpiritualityController.php';
$controller = new SpiritualityController($conn);

// Route based on action requested
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data for API requests
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    // Check if this is a regular form submission or API request
    if (isset($_POST['action'])) {
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
    } 
    // API request (like payment verification)
    else if ($data && isset($data['payment_id'])) {
        $controller->verifyPayment($data);
    } 
    else {
        $controller->index();
    }
} else {
    // Default to showing the spirituality page
    $controller->index();
}
?>
