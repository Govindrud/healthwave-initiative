
<?php
// Application constants
define('SITE_NAME', 'MeantToHelp');
define('SITE_URL', 'https://' . $_SERVER['HTTP_HOST']);
define('SITE_DESCRIPTION', 'Support for Mental Well-being');

// Directory paths
define('UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] . '/uploads/');
define('IMAGES_URL', SITE_URL . '/images/');
define('MODELS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/models/');
define('CONTROLLERS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/controllers/');
define('VIEWS_PATH', $_SERVER['DOCUMENT_ROOT'] . '/views/');

// Payment Gateway credentials
// Replace these with actual credentials in production
define('RAZORPAY_KEY_ID', 'rzp_test_XXXXXXXXXX');
define('RAZORPAY_KEY_SECRET', 'XXXXXXXXXXXXXXXXXXXXXXXX');

// UPI Payment details
define('UPI_ID', 'yourupi@bank');
define('UPI_QR_CODE', '/images/upi-qr.png');

// Email settings
define('EMAIL_FROM', 'noreply@meanttohelp.com');
define('EMAIL_NAME', 'MeantToHelp Support');
?>
