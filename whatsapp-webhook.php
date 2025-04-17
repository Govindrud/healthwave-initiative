
<?php
// Include configuration file
require_once 'includes/config.php';

// Create an instance of the WhatsApp Webhook Controller
require_once CONTROLLERS_PATH . 'WhatsAppWebhookController.php';
$controller = new WhatsAppWebhookController($conn);

// Handle the webhook request
$controller->handleWebhook();
?>
