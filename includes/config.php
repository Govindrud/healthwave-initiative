
<?php
// Include Database class
require_once 'Database.php';

// Get database connection
$db = Database::getInstance();
$conn = $db->getConnection();

// Define site constants
define('SITE_NAME', 'MeantToHelp');
define('SITE_URL', 'https://' . $_SERVER['HTTP_HOST']);
define('UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] . '/uploads/');
define('IMAGES_URL', SITE_URL . '/images/');
define('MODELS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/models/');
define('CONTROLLERS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/controllers/');
define('VIEWS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/views/');

// Initialize session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Helper functions
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function redirect($url) {
    header("Location: $url");
    exit();
}

function display_message($message, $type = 'info') {
    $_SESSION['message'] = $message;
    $_SESSION['message_type'] = $type;
}

function get_message() {
    if (isset($_SESSION['message'])) {
        $message = $_SESSION['message'];
        $type = $_SESSION['message_type'];
        unset($_SESSION['message']);
        unset($_SESSION['message_type']);
        return ['message' => $message, 'type' => $type];
    }
    return null;
}

// Create directory structure if it doesn't exist
function ensure_directory_structure() {
    $directories = [
        $_SERVER['DOCUMENT_ROOT'] . '/models',
        $_SERVER['DOCUMENT_ROOT'] . '/controllers',
        $_SERVER['DOCUMENT_ROOT'] . '/views',
        $_SERVER['DOCUMENT_ROOT'] . '/uploads',
        $_SERVER['DOCUMENT_ROOT'] . '/uploads/priests',
        $_SERVER['DOCUMENT_ROOT'] . '/uploads/tours',
        $_SERVER['DOCUMENT_ROOT'] . '/images',
        $_SERVER['DOCUMENT_ROOT'] . '/images/priests',
        $_SERVER['DOCUMENT_ROOT'] . '/images/tours',
        $_SERVER['DOCUMENT_ROOT'] . '/images/testimonials',
        $_SERVER['DOCUMENT_ROOT'] . '/images/products'
    ];
    
    foreach ($directories as $dir) {
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }
    }
}

// Call the function to ensure directory structure
ensure_directory_structure();

// Autoload models and controllers
spl_autoload_register(function ($class_name) {
    // Check if the class is a model
    if (file_exists(MODELS_PATH . $class_name . '.php')) {
        require_once MODELS_PATH . $class_name . '.php';
    }
    // Check if the class is a controller
    else if (file_exists(CONTROLLERS_PATH . $class_name . '.php')) {
        require_once CONTROLLERS_PATH . $class_name . '.php';
    }
});
?>
