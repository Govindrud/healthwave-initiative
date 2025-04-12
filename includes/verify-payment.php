
<?php
require_once 'config.php';

// Check if this is an AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    if (!$data) {
        sendResponse(['status' => 'error', 'message' => 'Invalid request format']);
        exit;
    }
    
    // Get required data
    $payment_id = isset($data['razorpay_payment_id']) ? sanitize_input($data['razorpay_payment_id']) : '';
    $order_id = isset($data['order_id']) ? sanitize_input($data['order_id']) : '';
    $amount = isset($data['amount']) ? (float)$data['amount'] : 0;
    $payment_method = isset($data['payment_method']) ? sanitize_input($data['payment_method']) : '';
    $transaction_type = isset($data['transaction_type']) ? sanitize_input($data['transaction_type']) : '';
    $customer_name = isset($data['customer_name']) ? sanitize_input($data['customer_name']) : '';
    $customer_email = isset($data['customer_email']) ? sanitize_input($data['customer_email']) : '';
    $customer_phone = isset($data['customer_phone']) ? sanitize_input($data['customer_phone']) : '';
    $booking_datetime = isset($data['datetime']) ? sanitize_input($data['datetime']) : '';
    
    // Validate required fields
    if (empty($order_id) || empty($payment_method) || $amount <= 0) {
        sendResponse(['status' => 'error', 'message' => 'Missing required payment details']);
        exit;
    }
    
    // Process based on payment method
    if ($payment_method === 'Razorpay') {
        // Razorpay verification (would include signature verification in production)
        // For demo purposes, we'll just verify the payment ID exists
        if (empty($payment_id)) {
            sendResponse(['status' => 'error', 'message' => 'Invalid Razorpay payment ID']);
            exit;
        }
        
        // In a real implementation, you would verify the signature using Razorpay's API
        $verified = true;  // Simulating verification success
    } elseif ($payment_method === 'UPI') {
        // For UPI, we'll simulate verification since we don't have a real API in this demo
        $verified = true;  // Simulating verification success
    } else {
        sendResponse(['status' => 'error', 'message' => 'Unsupported payment method']);
        exit;
    }
    
    // If payment is verified, record it in the database
    if ($verified) {
        try {
            // First, check if this is a doctor consultation booking
            if ($transaction_type === 'consultation' && isset($data['booking_type']) && $data['booking_type'] === 'doctor_consultation') {
                $doctor_id = isset($data['doctor_id']) ? (int)$data['doctor_id'] : 1; // Default to doctor ID 1 if not specified
                $duration_minutes = isset($data['duration_minutes']) ? (int)$data['duration_minutes'] : 30;
                
                // Insert booking into doctor_bookings table
                $stmt = $conn->prepare("
                    INSERT INTO doctor_bookings 
                    (order_id, doctor_id, customer_name, customer_email, customer_phone, booking_datetime, duration_minutes, amount, payment_method, payment_status, payment_id, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?, NOW())
                ");
                
                $stmt->bind_param(
                    "sissssidss",
                    $order_id,
                    $doctor_id,
                    $customer_name,
                    $customer_email,
                    $customer_phone,
                    $booking_datetime,
                    $duration_minutes,
                    $amount,
                    $payment_method,
                    $payment_id
                );
                
                $success = $stmt->execute();
            } 
            // Check if this is a priest consultation
            elseif ($transaction_type === 'consultation' && isset($data['booking_type']) && $data['booking_type'] === 'priest_consultation') {
                $priest_id = isset($data['priest_id']) ? (int)$data['priest_id'] : 0;
                $duration = isset($data['duration_minutes']) ? (int)$data['duration_minutes'] : 60;
                
                // Insert booking into priest_bookings table
                $stmt = $conn->prepare("
                    INSERT INTO priest_bookings 
                    (order_id, priest_id, customer_name, customer_email, customer_phone, booking_datetime, duration_minutes, amount, payment_method, payment_status, razorpay_payment_id, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?, NOW())
                ");
                
                $stmt->bind_param(
                    "sissssidss",
                    $order_id,
                    $priest_id,
                    $customer_name,
                    $customer_email,
                    $customer_phone,
                    $booking_datetime,
                    $duration,
                    $amount,
                    $payment_method,
                    $payment_id
                );
                
                $success = $stmt->execute();
            } 
            // Check if this is a tour booking
            elseif ($transaction_type === 'consultation' && isset($data['booking_type']) && $data['booking_type'] === 'tour_booking') {
                $tour_id = isset($data['tour_id']) ? (int)$data['tour_id'] : 0;
                $booking_date = isset($data['datetime']) ? $data['datetime'] : date('Y-m-d');
                $participants = isset($data['participants']) ? (int)$data['participants'] : 1;
                
                // Insert booking into tour_bookings table
                $stmt = $conn->prepare("
                    INSERT INTO tour_bookings 
                    (order_id, tour_id, customer_name, customer_email, customer_phone, booking_date, participants, amount, payment_method, payment_status, razorpay_payment_id, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?, NOW())
                ");
                
                $stmt->bind_param(
                    "sissssiiss",
                    $order_id,
                    $tour_id,
                    $customer_name,
                    $customer_email,
                    $customer_phone,
                    $booking_date,
                    $participants,
                    $amount,
                    $payment_method,
                    $payment_id
                );
                
                $success = $stmt->execute();
            }
            // Normal product order
            else {
                // Insert order into orders table
                $stmt = $conn->prepare("
                    INSERT INTO orders 
                    (order_id, customer_name, customer_email, customer_phone, amount, payment_method, payment_status, razorpay_payment_id, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, 'completed', ?, NOW())
                ");
                
                $stmt->bind_param(
                    "ssssiss",
                    $order_id,
                    $customer_name,
                    $customer_email,
                    $customer_phone,
                    $amount,
                    $payment_method,
                    $payment_id
                );
                
                $success = $stmt->execute();
            }
            
            if ($success) {
                sendResponse(['status' => 'success', 'message' => 'Payment verified and recorded successfully']);
            } else {
                sendResponse(['status' => 'error', 'message' => 'Failed to record payment: ' . $conn->error]);
            }
        } catch (Exception $e) {
            sendResponse(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
        }
    } else {
        sendResponse(['status' => 'error', 'message' => 'Payment verification failed']);
    }
} else {
    // Not a POST request
    sendResponse(['status' => 'error', 'message' => 'Invalid request method']);
}

// Function to send JSON response
function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
