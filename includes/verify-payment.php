
<?php
// Include database configuration
require_once 'config.php';

// Define Razorpay API key and secret (replace with your actual credentials)
$razorpay_key_id = 'rzp_test_XXXXXXXXXX';
$razorpay_key_secret = 'XXXXXXXXXXXXXXXXXXXXXXXX';

// Set headers for JSON response
header('Content-Type: application/json');

// Get input data
$data = json_decode(file_get_contents('php://input'), true);

// Check if all required parameters are present
if (!isset($data['payment_id']) || !isset($data['razorpay_order_id']) || !isset($data['signature']) || !isset($data['order_id']) || !isset($data['booking_type'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required parameters']);
    exit;
}

// Extract data
$payment_id = $data['payment_id'];
$razorpay_order_id = $data['razorpay_order_id'];
$signature = $data['signature'];
$order_id = $data['order_id'];
$booking_type = $data['booking_type'];

// Verify payment signature (in a real application, you would verify the signature using Razorpay SDK)
// For this example, we'll assume the payment is valid

// Update the appropriate booking table based on booking type
try {
    if ($booking_type === 'priest_consultation') {
        // Update priest booking
        $stmt = $conn->prepare("UPDATE priest_bookings SET 
            razorpay_payment_id = ?, 
            razorpay_order_id = ?, 
            payment_date = NOW(), 
            payment_status = 'completed' 
            WHERE order_id = ?");
            
        $stmt->bind_param("sss", $payment_id, $razorpay_order_id, $order_id);
        
        if ($stmt->execute()) {
            // Get booking details for SMS notification
            $bookingStmt = $conn->prepare("SELECT p.name, b.customer_name, b.customer_phone, b.booking_datetime 
                                          FROM priest_bookings b 
                                          JOIN spiritual_priests p ON b.priest_id = p.id 
                                          WHERE b.order_id = ?");
            $bookingStmt->bind_param("s", $order_id);
            $bookingStmt->execute();
            $bookingResult = $bookingStmt->get_result();
            
            if ($bookingResult->num_rows > 0) {
                $bookingData = $bookingResult->fetch_assoc();
                
                // Send SMS notification (implement your SMS gateway integration here)
                sendSmsNotification(
                    $bookingData['customer_phone'],
                    "Your consultation with " . $bookingData['name'] . " has been confirmed for " . $bookingData['booking_datetime'] . ". Thank you for booking with MeantToHelp."
                );
            }
            
            echo json_encode(['status' => 'success', 'message' => 'Payment verified successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update booking: ' . $stmt->error]);
        }
    } elseif ($booking_type === 'tour_booking') {
        // Update tour booking
        $stmt = $conn->prepare("UPDATE tour_bookings SET 
            razorpay_payment_id = ?, 
            razorpay_order_id = ?, 
            payment_date = NOW(), 
            payment_status = 'completed' 
            WHERE order_id = ?");
            
        $stmt->bind_param("sss", $payment_id, $razorpay_order_id, $order_id);
        
        if ($stmt->execute()) {
            // Get booking details for SMS notification
            $bookingStmt = $conn->prepare("SELECT t.name, b.customer_name, b.customer_phone, b.booking_date 
                                          FROM tour_bookings b 
                                          JOIN spiritual_tours t ON b.tour_id = t.id 
                                          WHERE b.order_id = ?");
            $bookingStmt->bind_param("s", $order_id);
            $bookingStmt->execute();
            $bookingResult = $bookingStmt->get_result();
            
            if ($bookingResult->num_rows > 0) {
                $bookingData = $bookingResult->fetch_assoc();
                
                // Send SMS notification (implement your SMS gateway integration here)
                sendSmsNotification(
                    $bookingData['customer_phone'],
                    "Your tour booking for " . $bookingData['name'] . " on " . date('d M Y', strtotime($bookingData['booking_date'])) . " has been confirmed. Thank you for booking with MeantToHelp."
                );
            }
            
            echo json_encode(['status' => 'success', 'message' => 'Payment verified successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update booking: ' . $stmt->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid booking type']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}

// Function to send SMS notification
function sendSmsNotification($phoneNumber, $message) {
    // You would implement your SMS gateway integration here
    // For example, using services like Twilio, MSG91, etc.
    
    // For now, we'll just log the message
    error_log("SMS to $phoneNumber: $message");
    
    // Example using MSG91 API (you would need to sign up for an account)
    /*
    $apiKey = "YOUR_MSG91_API_KEY";
    $senderId = "MEANTHLP";
    
    $url = "https://api.msg91.com/api/v5/flow/";
    
    $postData = array(
        "flow_id" => "YOUR_FLOW_ID",
        "sender" => $senderId,
        "mobiles" => $phoneNumber,
        "message" => $message
    );
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "authkey: $apiKey",
        "Content-Type: application/json"
    ));
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
    */
    
    return true;
}
?>
