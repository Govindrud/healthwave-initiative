
<?php
require_once 'includes/Controller.php';
require_once 'models/SpiritualityModel.php';
require_once 'models/OrderModel.php';

class SpiritualityController extends Controller {
    private $spiritualityModel;
    private $orderModel;
    
    public function __construct($conn) {
        parent::__construct($conn);
        $this->spiritualityModel = new SpiritualityModel($conn);
        $this->orderModel = new OrderModel($conn);
    }
    
    public function index() {
        // Get data for the spirituality page
        $priests = $this->spiritualityModel->getPriests();
        $tours = $this->spiritualityModel->getTours();
        $testimonials = $this->spiritualityModel->getTestimonials();
        
        // Set page specific variables
        $pageTitle = SITE_NAME . ' - Spiritual Guidance & Sacred Tours';
        $metaDescription = 'Explore spiritual guidance services and sacred tours to enhance your mental well-being.';
        $pageSpecificCSS = 'spirituality.css';
        $pageSpecificJS = 'spirituality.js';
        
        // Include the view with data
        $this->render('spirituality/index', [
            'priests' => $priests,
            'tours' => $tours,
            'testimonials' => $testimonials,
            'pageTitle' => $pageTitle,
            'metaDescription' => $metaDescription,
            'pageSpecificCSS' => $pageSpecificCSS,
            'pageSpecificJS' => $pageSpecificJS
        ]);
    }
    
    public function processPriestBooking() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validate input
            $priest_id = isset($_POST['priest_id']) ? intval($_POST['priest_id']) : 0;
            $customer_name = isset($_POST['customer_name']) ? sanitize_input($_POST['customer_name']) : '';
            $customer_email = isset($_POST['customer_email']) ? sanitize_input($_POST['customer_email']) : '';
            $customer_phone = isset($_POST['customer_phone']) ? sanitize_input($_POST['customer_phone']) : '';
            $duration = isset($_POST['duration']) ? intval($_POST['duration']) : 60;
            $booking_date = isset($_POST['booking_date']) ? sanitize_input($_POST['booking_date']) : '';
            $booking_time = isset($_POST['booking_time']) ? sanitize_input($_POST['booking_time']) : '';
            $special_requests = isset($_POST['special_requests']) ? sanitize_input($_POST['special_requests']) : '';
            $priest_rate = isset($_POST['priest_rate']) ? floatval($_POST['priest_rate']) : 0;
            
            // Calculate amount
            $amount = ($priest_rate * $duration) / 60;
            
            // Format booking datetime
            $booking_datetime = $booking_date . ' ' . $booking_time . ':00';
            
            // Create order
            $order_data = [
                'order_type' => 'priest_consultation',
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'customer_phone' => $customer_phone,
                'amount' => $amount,
                'item_id' => $priest_id,
                'booking_datetime' => $booking_datetime,
                'duration' => $duration,
                'notes' => $special_requests,
                'status' => 'pending'
            ];
            
            // Create order and get order_id
            $order_id = $this->orderModel->createOrder($order_data);
            
            if ($order_id) {
                // Generate Razorpay order
                require_once 'includes/RazorpayApi.php';
                $razorpay = new RazorpayApi();
                $razorpay_order = $razorpay->createOrder($amount * 100, $order_id); // Amount in paise
                
                if ($razorpay_order) {
                    // Update order with razorpay_order_id
                    $this->orderModel->updateOrder($order_id, [
                        'razorpay_order_id' => $razorpay_order['id']
                    ]);
                    
                    // Return success response
                    $response = [
                        'status' => 'success',
                        'message' => 'Order created successfully',
                        'order_id' => $razorpay_order['id'],
                        'amount' => $amount * 100, // Amount in paise
                        'customer_name' => $customer_name,
                        'customer_email' => $customer_email,
                        'customer_phone' => $customer_phone
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to create payment order'
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to create order'
                ];
                
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function processTourBooking() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validate input
            $tour_id = isset($_POST['tour_id']) ? intval($_POST['tour_id']) : 0;
            $customer_name = isset($_POST['customer_name']) ? sanitize_input($_POST['customer_name']) : '';
            $customer_email = isset($_POST['customer_email']) ? sanitize_input($_POST['customer_email']) : '';
            $customer_phone = isset($_POST['customer_phone']) ? sanitize_input($_POST['customer_phone']) : '';
            $booking_date = isset($_POST['booking_date']) ? sanitize_input($_POST['booking_date']) : '';
            $participants = isset($_POST['participants']) ? intval($_POST['participants']) : 1;
            $special_requests = isset($_POST['special_requests']) ? sanitize_input($_POST['special_requests']) : '';
            $tour_price = isset($_POST['tour_price']) ? floatval($_POST['tour_price']) : 0;
            
            // Calculate amount
            $amount = $tour_price * $participants;
            
            // Create order
            $order_data = [
                'order_type' => 'tour_booking',
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'customer_phone' => $customer_phone,
                'amount' => $amount,
                'item_id' => $tour_id,
                'booking_datetime' => $booking_date,
                'participants' => $participants,
                'notes' => $special_requests,
                'status' => 'pending'
            ];
            
            // Create order and get order_id
            $order_id = $this->orderModel->createOrder($order_data);
            
            if ($order_id) {
                // Generate Razorpay order
                require_once 'includes/RazorpayApi.php';
                $razorpay = new RazorpayApi();
                $razorpay_order = $razorpay->createOrder($amount * 100, $order_id); // Amount in paise
                
                if ($razorpay_order) {
                    // Update order with razorpay_order_id
                    $this->orderModel->updateOrder($order_id, [
                        'razorpay_order_id' => $razorpay_order['id']
                    ]);
                    
                    // Return success response
                    $response = [
                        'status' => 'success',
                        'message' => 'Order created successfully',
                        'order_id' => $razorpay_order['id'],
                        'amount' => $amount * 100, // Amount in paise
                        'customer_name' => $customer_name,
                        'customer_email' => $customer_email,
                        'customer_phone' => $customer_phone
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to create payment order'
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to create order'
                ];
                
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function verifyPayment($data) {
        if ($data && isset($data['payment_id']) && isset($data['razorpay_order_id']) && isset($data['signature'])) {
            require_once 'includes/RazorpayApi.php';
            $razorpay = new RazorpayApi();
            
            $isValid = $razorpay->verifyPaymentSignature($data);
            
            if ($isValid) {
                // Update order status
                $order = $this->orderModel->getOrderByRazorpayId($data['razorpay_order_id']);
                
                if ($order) {
                    $update_data = [
                        'payment_id' => $data['payment_id'],
                        'status' => 'confirmed',
                        'payment_date' => date('Y-m-d H:i:s')
                    ];
                    
                    $this->orderModel->updateOrder($order['id'], $update_data);
                    
                    // Send confirmation email
                    $this->sendConfirmationEmail($order['id']);
                    
                    $response = [
                        'status' => 'success',
                        'message' => 'Payment verified successfully',
                        'order_id' => $order['id']
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Order not found'
                    ];
                    
                    header('Content-Type: application/json');
                    echo json_encode($response);
                    exit;
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Payment verification failed'
                ];
                
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Invalid payment data'
            ];
            
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }
    }
    
    private function sendConfirmationEmail($order_id) {
        // Get order details
        $order = $this->orderModel->getOrder($order_id);
        
        if ($order) {
            $to = $order['customer_email'];
            $subject = 'Booking Confirmation - ' . SITE_NAME;
            
            // Build email content based on order type
            if ($order['order_type'] === 'priest_consultation') {
                $priest = $this->spiritualityModel->getPriest($order['item_id']);
                $product_name = 'Consultation with ' . $priest['name'];
                $details = 'Date & Time: ' . date('F j, Y \a\t g:i A', strtotime($order['booking_datetime'])) . '<br>'
                         . 'Duration: ' . $order['duration'] . ' minutes';
            } else {
                $tour = $this->spiritualityModel->getTour($order['item_id']);
                $product_name = $tour['name'] . ' Tour';
                $details = 'Date: ' . date('F j, Y', strtotime($order['booking_datetime'])) . '<br>'
                         . 'Participants: ' . $order['participants'];
            }
            
            $message = '
                <html>
                <head>
                    <title>Booking Confirmation</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #6D4C41; padding: 20px; color: white; text-align: center; }
                        .content { padding: 20px; background-color: #f9f9f9; }
                        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
                        .details { margin: 20px 0; padding: 15px; border: 1px solid #ddd; background-color: white; }
                        .amount { font-size: 20px; font-weight: bold; color: #6D4C41; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Booking Confirmation</h1>
                        </div>
                        <div class="content">
                            <p>Dear ' . $order['customer_name'] . ',</p>
                            <p>Thank you for your booking with ' . SITE_NAME . '. Your payment has been successfully processed.</p>
                            
                            <div class="details">
                                <h2>Booking Details</h2>
                                <p><strong>Order ID:</strong> ' . $order['id'] . '</p>
                                <p><strong>Service:</strong> ' . $product_name . '</p>
                                <p><strong>Details:</strong><br> ' . $details . '</p>
                                <p><strong>Amount Paid:</strong> <span class="amount">₹' . number_format($order['amount'], 2) . '</span></p>
                            </div>
                            
                            <p>If you have any questions regarding your booking, please contact us at support@' . $_SERVER['HTTP_HOST'] . '.</p>
                            
                            <p>We look forward to serving you!</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ' . date('Y') . ' ' . SITE_NAME . '. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            ';
            
            // Headers for HTML email
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: " . SITE_NAME . " <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
            
            // Send email
            mail($to, $subject, $message, $headers);
        }
    }
}
?>
