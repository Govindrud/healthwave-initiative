
<?php
require_once 'includes/Controller.php';

class WhatsAppWebhookController extends Controller {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function handleWebhook() {
        // Handle GET request for webhook verification
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $this->verifyWebhook();
            return;
        }
        
        // Handle POST request for incoming messages
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->processIncomingMessage();
            return;
        }
        
        // If neither GET nor POST, return 405 Method Not Allowed
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
    
    private function verifyWebhook() {
        // Get query parameters from Facebook/WhatsApp
        $mode = $_GET['hub_mode'] ?? '';
        $token = $_GET['hub_verify_token'] ?? '';
        $challenge = $_GET['hub_challenge'] ?? '';
        
        // Log verification attempt
        $this->logWebhookAction("Verification attempt. Mode: $mode, Token: $token");
        
        // Verify token against the stored token
        // In a real implementation, you'd check against a database or config file
        $verify_token = "your_verify_token"; // Replace with actual verification
        
        if ($mode === 'subscribe' && $token === $verify_token) {
            // Respond with the challenge code to confirm verification
            $this->logWebhookAction("Verification successful");
            http_response_code(200);
            echo $challenge;
        } else {
            // Return 403 Forbidden if verification fails
            $this->logWebhookAction("Verification failed");
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Verification failed']);
        }
    }
    
    private function processIncomingMessage() {
        // Get the raw POST data
        $rawData = file_get_contents('php://input');
        
        // Parse the JSON data
        $data = json_decode($rawData, true);
        
        // Log the incoming webhook data
        $this->logWebhookAction("Incoming webhook received: " . json_encode($data));
        
        // Check if this is a valid WhatsApp message
        if (empty($data['entry']) || empty($data['entry'][0]['changes']) || empty($data['entry'][0]['changes'][0]['value'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid webhook data']);
            return;
        }
        
        $value = $data['entry'][0]['changes'][0]['value'];
        
        // Check if this is a message or a status update
        if (isset($value['messages'])) {
            // Handle incoming messages
            $messages = $value['messages'];
            $this->handleMessages($messages, $value['contacts'] ?? []);
        } else if (isset($value['statuses'])) {
            // Handle status updates
            $statuses = $value['statuses'];
            $this->handleStatusUpdates($statuses);
        }
        
        // Always respond with 200 OK to acknowledge receipt
        http_response_code(200);
        echo json_encode(['status' => 'success']);
    }
    
    private function handleMessages($messages, $contacts) {
        foreach ($messages as $message) {
            $messageId = $message['id'] ?? '';
            $from = $message['from'] ?? '';
            $timestamp = $message['timestamp'] ?? '';
            $type = $message['type'] ?? '';
            
            // Get contact information
            $contactName = "Unknown";
            foreach ($contacts as $contact) {
                if (isset($contact['wa_id']) && $contact['wa_id'] === $from) {
                    $contactName = $contact['profile']['name'] ?? 'Unknown';
                    break;
                }
            }
            
            // Process different message types
            switch ($type) {
                case 'text':
                    $text = $message['text']['body'] ?? '';
                    $this->processTextMessage($from, $contactName, $text, $messageId);
                    break;
                    
                case 'image':
                case 'document':
                case 'audio':
                case 'video':
                    $this->processMediaMessage($from, $contactName, $type, $message, $messageId);
                    break;
                    
                case 'button':
                    $this->processButtonMessage($from, $contactName, $message, $messageId);
                    break;
                    
                default:
                    $this->logWebhookAction("Unknown message type: $type from $from ($contactName)");
                    break;
            }
        }
    }
    
    private function processTextMessage($from, $contactName, $text, $messageId) {
        $this->logWebhookAction("Received text message from $from ($contactName): $text");
        
        // Store the message in database
        $sql = "INSERT INTO whatsapp_messages (phone_number, contact_name, message_type, message_content, message_id, received_at) 
                VALUES (?, ?, 'text', ?, ?, NOW())";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssss", $from, $contactName, $text, $messageId);
        $stmt->execute();
        
        // Process automated responses based on keywords
        $lowerText = strtolower($text);
        
        if (strpos($lowerText, 'help') !== false) {
            $this->sendAutomatedResponse($from, 'help');
        } else if (strpos($lowerText, 'booking') !== false || strpos($lowerText, 'appointment') !== false) {
            $this->sendAutomatedResponse($from, 'booking');
        } else if (strpos($lowerText, 'cancel') !== false) {
            $this->sendAutomatedResponse($from, 'cancel');
        } else if (strpos($lowerText, 'contact') !== false) {
            $this->sendAutomatedResponse($from, 'contact');
        } else {
            $this->sendAutomatedResponse($from, 'default');
        }
    }
    
    private function processMediaMessage($from, $contactName, $type, $message, $messageId) {
        $mediaId = $message[$type]['id'] ?? '';
        $mimeType = $message[$type]['mime_type'] ?? '';
        
        $this->logWebhookAction("Received $type message from $from ($contactName), ID: $mediaId, Type: $mimeType");
        
        // Store the media message info in database
        $sql = "INSERT INTO whatsapp_messages (phone_number, contact_name, message_type, message_content, media_id, message_id, received_at) 
                VALUES (?, ?, ?, ?, ?, ?, NOW())";
        
        $messageContent = "Media message of type $mimeType";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssss", $from, $contactName, $type, $messageContent, $mediaId, $messageId);
        $stmt->execute();
        
        // In a real implementation, you might download the media using the Media API
    }
    
    private function processButtonMessage($from, $contactName, $message, $messageId) {
        $buttonText = $message['button']['text'] ?? '';
        
        $this->logWebhookAction("Received button response from $from ($contactName): $buttonText");
        
        // Store the button message in database
        $sql = "INSERT INTO whatsapp_messages (phone_number, contact_name, message_type, message_content, message_id, received_at) 
                VALUES (?, ?, 'button', ?, ?, NOW())";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssss", $from, $contactName, $buttonText, $messageId);
        $stmt->execute();
        
        // Process button response
        switch ($buttonText) {
            case 'Book Now':
                $this->sendAutomatedResponse($from, 'booking_init');
                break;
                
            case 'Contact Support':
                $this->sendAutomatedResponse($from, 'contact');
                break;
                
            default:
                $this->sendAutomatedResponse($from, 'button_response');
                break;
        }
    }
    
    private function handleStatusUpdates($statuses) {
        foreach ($statuses as $status) {
            $recipientId = $status['recipient_id'] ?? '';
            $statusType = $status['status'] ?? '';
            $messageId = $status['id'] ?? '';
            $timestamp = $status['timestamp'] ?? '';
            
            $this->logWebhookAction("Message status update for $recipientId: $statusType (ID: $messageId)");
            
            // Store status update in database
            $sql = "INSERT INTO whatsapp_message_statuses (phone_number, message_id, status, status_timestamp) 
                    VALUES (?, ?, ?, FROM_UNIXTIME(?))";
            
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("sssi", $recipientId, $messageId, $statusType, $timestamp);
            $stmt->execute();
        }
    }
    
    private function sendAutomatedResponse($to, $responseType) {
        // In a real implementation, this would send an API request to WhatsApp
        // For now, we'll just log the automated response
        $responseText = $this->getResponseTemplate($responseType);
        
        $this->logWebhookAction("Sending automated response to $to: $responseType");
        
        // Store the outgoing message
        $sql = "INSERT INTO whatsapp_messages (phone_number, contact_name, message_type, message_content, is_outgoing, sent_at) 
                VALUES (?, 'System', 'text', ?, 1, NOW())";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $to, $responseText);
        $stmt->execute();
    }
    
    private function getResponseTemplate($type) {
        switch ($type) {
            case 'help':
                return "Hello! Here's how I can help you:\n- Book an appointment\n- Check appointment status\n- Cancel an appointment\n- Contact customer support";
                
            case 'booking':
                return "To book an appointment, please visit our website at https://meanttohelp.com/services or reply with the service you're interested in.";
                
            case 'cancel':
                return "To cancel an appointment, please provide your booking reference number or the date and time of your appointment.";
                
            case 'contact':
                return "Our support team is available Mon-Fri, 9am-5pm. You can call us at +91 9876543210 or email support@meanttohelp.com";
                
            case 'booking_init':
                return "Thanks for choosing to book with us! Please let us know which service you're interested in: Doctors, Student Psychologists, or Spiritual Services?";
                
            case 'button_response':
                return "Thanks for your response. Our team will get back to you shortly.";
                
            case 'default':
                return "Thank you for your message. Our team will respond shortly. If you need immediate assistance, please visit our website at https://meanttohelp.com";
                
            default:
                return "Thank you for contacting MeantToHelp. How can we assist you today?";
        }
    }
    
    private function logWebhookAction($message) {
        $logFile = $_SERVER['DOCUMENT_ROOT'] . '/logs/whatsapp_webhook.log';
        $logDir = dirname($logFile);
        
        // Create logs directory if it doesn't exist
        if (!file_exists($logDir)) {
            mkdir($logDir, 0755, true);
        }
        
        $timestamp = date('Y-m-d H:i:s');
        $logMessage = "[$timestamp] $message\n";
        
        // Append to log file
        file_put_contents($logFile, $logMessage, FILE_APPEND);
    }
}
?>
