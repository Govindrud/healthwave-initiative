
<?php
// Prevent direct access to this file
if (!defined('BASEPATH')) {
    header('HTTP/1.1 403 Forbidden');
    exit('Direct script access is not allowed');
}

// Include the Razorpay PHP SDK (you'll need to download this separately)
// require_once('path/to/razorpay-php/Razorpay.php');
// use Razorpay\Api\Api;

// Get payment data from POST request
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Initialize response array
$response = [
    'success' => false,
    'message' => 'Payment verification failed'
];

// Check if all required parameters are present
if (
    isset($input['razorpay_payment_id']) && 
    isset($input['razorpay_order_id']) && 
    isset($input['razorpay_signature']) &&
    isset($input['amount']) &&
    isset($input['product_name']) &&
    isset($input['order_id'])
) {
    $razorpay_payment_id = $input['razorpay_payment_id'];
    $razorpay_order_id = $input['razorpay_order_id'];
    $razorpay_signature = $input['razorpay_signature'];
    $amount = $input['amount'];
    $product_name = $input['product_name'];
    $order_id = $input['order_id'];
    $payment_method = isset($input['payment_method']) ? $input['payment_method'] : 'Razorpay';
    
    // For UPI payments, we have a different verification flow
    if (strpos($razorpay_payment_id, 'upi_') === 0) {
        // In a real application, you would verify the UPI payment with your payment gateway
        // For this demo, we'll simulate success
        $response['success'] = true;
        $response['message'] = 'UPI payment verified successfully';
    } else {
        // Verify the Razorpay payment signature
        $key_id = 'rzp_test_YOUR_KEY_HERE'; // Replace with your Razorpay Key ID
        $key_secret = 'YOUR_KEY_SECRET'; // Replace with your Razorpay Key Secret
        
        // Create an array for signature verification
        $attributes = [
            'razorpay_payment_id' => $razorpay_payment_id,
            'razorpay_order_id' => $razorpay_order_id
        ];
        
        // Verify the signature
        // Uncomment this when you have the Razorpay SDK installed
        /*
        $api = new Api($key_id, $key_secret);
        
        try {
            $api->utility->verifyPaymentSignature($attributes + ['razorpay_signature' => $razorpay_signature]);
            
            // Payment successful, save to database
            // Connect to database
            $conn = new mysqli('localhost', 'username', 'password', 'database_name');
            
            if ($conn->connect_error) {
                throw new Exception("Database connection failed: " . $conn->connect_error);
            }
            
            // Insert payment details
            $stmt = $conn->prepare("INSERT INTO payments (order_id, razorpay_payment_id, razorpay_order_id, amount, product_name, payment_method, payment_date) VALUES (?, ?, ?, ?, ?, ?, NOW())");
            $stmt->bind_param("sssdss", $order_id, $razorpay_payment_id, $razorpay_order_id, $amount, $product_name, $payment_method);
            
            if ($stmt->execute()) {
                $response['success'] = true;
                $response['message'] = 'Payment verified successfully';
            } else {
                throw new Exception("Error saving payment: " . $stmt->error);
            }
            
            $stmt->close();
            $conn->close();
            
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
        }
        */
        
        // For testing purposes (remove in production)
        $response['success'] = true;
        $response['message'] = 'Payment verified successfully';
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
