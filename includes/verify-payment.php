
<?php
// Prevent direct access to this file
if (!defined('BASEPATH')) {
    header('HTTP/1.1 403 Forbidden');
    exit('Direct script access is not allowed');
}

// Database connection settings
$db_host = 'localhost';
$db_user = 'root'; // Replace with your database username
$db_pass = ''; // Replace with your database password
$db_name = 'meantohelp'; // Replace with your database name

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
    $transaction_type = isset($input['transaction_type']) ? $input['transaction_type'] : 'product'; // 'product' or 'consultation'
    $customer_name = isset($input['customer_name']) ? $input['customer_name'] : '';
    $customer_email = isset($input['customer_email']) ? $input['customer_email'] : '';
    $customer_phone = isset($input['customer_phone']) ? $input['customer_phone'] : '';
    $datetime = isset($input['datetime']) ? $input['datetime'] : '';
    
    // For UPI payments, we have a different verification flow
    if (strpos($razorpay_payment_id, 'upi_') === 0) {
        // In a real application, you would verify the UPI payment with your payment gateway
        // For this demo, we'll simulate success but store the transaction
        $paymentVerified = true;
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
            $paymentVerified = true;
        } catch (Exception $e) {
            $paymentVerified = false;
            $response['message'] = $e->getMessage();
        }
        */
        
        // For testing purposes (remove in production)
        $paymentVerified = true;
    }
    
    if ($paymentVerified) {
        try {
            // Connect to database
            $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
            
            if ($conn->connect_error) {
                throw new Exception("Database connection failed: " . $conn->connect_error);
            }
            
            // Determine the table to use based on transaction type
            $table = ($transaction_type == 'consultation') ? 'appointments' : 'orders';
            
            if ($transaction_type == 'consultation') {
                // Insert appointment details
                $stmt = $conn->prepare("INSERT INTO appointments (order_id, razorpay_payment_id, razorpay_order_id, amount, doctor_name, customer_name, customer_email, customer_phone, appointment_datetime, payment_method, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
                $stmt->bind_param("sssdsssss", $order_id, $razorpay_payment_id, $razorpay_order_id, $amount, $product_name, $customer_name, $customer_email, $customer_phone, $datetime, $payment_method);
            } else {
                // Insert order details
                $stmt = $conn->prepare("INSERT INTO orders (order_id, razorpay_payment_id, razorpay_order_id, amount, product_name, customer_name, customer_email, customer_phone, payment_method, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
                $stmt->bind_param("sssdsssss", $order_id, $razorpay_payment_id, $razorpay_order_id, $amount, $product_name, $customer_name, $customer_email, $customer_phone, $payment_method);
            }
            
            if ($stmt->execute()) {
                // Payment successful and saved to database
                $response['success'] = true;
                $response['message'] = 'Payment verified successfully';
                $response['order_id'] = $order_id;
                
                // Send SMS notification if phone number is provided
                if (!empty($customer_phone)) {
                    sendSMS($customer_phone, $transaction_type, $product_name, $order_id, $datetime);
                }
            } else {
                throw new Exception("Error saving payment: " . $stmt->error);
            }
            
            $stmt->close();
            $conn->close();
            
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
        }
    }
}

// Function to send SMS notification
function sendSMS($phone, $type, $product, $order_id, $datetime = '') {
    // Replace with your SMS API credentials and endpoint
    $apiKey = "YOUR_SMS_API_KEY";
    $sender = "MNTHLP"; // Sender ID
    
    // Create appropriate message based on transaction type
    if ($type == 'consultation') {
        $message = "Your appointment for $product has been confirmed. Order ID: $order_id. Scheduled for: $datetime. Thank you for choosing MeantToHelp!";
    } else {
        $message = "Your order for $product has been confirmed. Order ID: $order_id. Thank you for shopping with MeantToHelp!";
    }
    
    // URL encode the message
    $message = urlencode($message);
    
    // SMS API endpoint (replace with your SMS provider's API endpoint)
    $url = "https://api.yoursmsvendor.com/send?apikey=$apiKey&sender=$sender&mobile=$phone&message=$message";
    
    // Send the SMS using cURL
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    
    // Log the SMS sending result (in a production app, you'd save this to a log file)
    if ($err) {
        error_log("SMS sending failed: " . $err);
        return false;
    }
    
    error_log("SMS sent successfully: " . $response);
    return true;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
