
<?php
require_once 'includes/Controller.php';

class SpiritualityController extends Controller {
    private $spiritualityModel;
    
    public function __construct($conn) {
        parent::__construct($conn);
        require_once 'models/SpiritualityModel.php';
        $this->spiritualityModel = new SpiritualityModel($conn);
    }
    
    public function index() {
        // Get spirituality data
        $priests = $this->spiritualityModel->getPriests();
        $tours = $this->spiritualityModel->getTours();
        $testimonials = $this->spiritualityModel->getTestimonials(3);
        
        // Set page specific variables
        $pageTitle = 'Spiritual Services | ' . SITE_NAME;
        $metaDescription = 'Explore spiritual guidance and services to support your mental well-being journey.';
        $pageSpecificCSS = 'spirituality.css';
        $pageSpecificJS = 'razorpay.js';
        
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
        // Validate and sanitize input
        $priest_id = isset($_POST['priest_id']) ? (int)$_POST['priest_id'] : 0;
        $customer_name = isset($_POST['customer_name']) ? sanitize_input($_POST['customer_name']) : '';
        $customer_email = isset($_POST['customer_email']) ? sanitize_input($_POST['customer_email']) : '';
        $customer_phone = isset($_POST['customer_phone']) ? sanitize_input($_POST['customer_phone']) : '';
        $booking_date = isset($_POST['booking_date']) ? sanitize_input($_POST['booking_date']) : '';
        $booking_time = isset($_POST['booking_time']) ? sanitize_input($_POST['booking_time']) : '';
        $consultation_type = isset($_POST['consultation_type']) ? sanitize_input($_POST['consultation_type']) : '';
        $duration_minutes = isset($_POST['duration_minutes']) ? (int)$_POST['duration_minutes'] : 60;
        $amount = isset($_POST['amount']) ? (float)$_POST['amount'] : 0;
        
        // Validation
        $errors = [];
        
        if ($priest_id <= 0) {
            $errors[] = 'Invalid priest selection';
        }
        
        if (empty($customer_name)) {
            $errors[] = 'Name is required';
        }
        
        if (empty($customer_email) || !filter_var($customer_email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Valid email is required';
        }
        
        if (empty($customer_phone)) {
            $errors[] = 'Phone number is required';
        }
        
        if (empty($booking_date) || empty($booking_time)) {
            $errors[] = 'Booking date and time are required';
        }
        
        // If there are validation errors
        if (!empty($errors)) {
            // Set error message and redirect back
            $error_message = implode(', ', $errors);
            display_message($error_message, 'error');
            redirect('spirituality.php');
            return;
        }
        
        // Create order ID
        $order_id = 'PST' . time() . rand(100, 999);
        
        // Combine date and time
        $booking_datetime = $booking_date . ' ' . $booking_time . ':00';
        
        try {
            // Insert booking into database
            $stmt = $this->conn->prepare("
                INSERT INTO priest_bookings 
                (order_id, priest_id, customer_name, customer_email, customer_phone, 
                 booking_datetime, consultation_type, duration_minutes, amount, payment_status, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            ");
            
            $stmt->bind_param(
                "sisssssid",
                $order_id,
                $priest_id,
                $customer_name,
                $customer_email,
                $customer_phone,
                $booking_datetime,
                $consultation_type,
                $duration_minutes,
                $amount
            );
            
            if ($stmt->execute()) {
                // Redirect to payment page
                $_SESSION['order_data'] = [
                    'order_id' => $order_id,
                    'amount' => $amount,
                    'booking_type' => 'priest_consultation',
                    'priest_id' => $priest_id,
                    'customer_name' => $customer_name,
                    'customer_email' => $customer_email,
                    'customer_phone' => $customer_phone,
                    'booking_datetime' => $booking_datetime,
                    'duration_minutes' => $duration_minutes
                ];
                
                redirect('payment.php?order=' . $order_id);
            } else {
                display_message('Failed to create booking. Please try again.', 'error');
                redirect('spirituality.php');
            }
        } catch (Exception $e) {
            display_message('Error: ' . $e->getMessage(), 'error');
            redirect('spirituality.php');
        }
    }
    
    public function processTourBooking() {
        // Validate and sanitize input
        $tour_id = isset($_POST['tour_id']) ? (int)$_POST['tour_id'] : 0;
        $customer_name = isset($_POST['customer_name']) ? sanitize_input($_POST['customer_name']) : '';
        $customer_email = isset($_POST['customer_email']) ? sanitize_input($_POST['customer_email']) : '';
        $customer_phone = isset($_POST['customer_phone']) ? sanitize_input($_POST['customer_phone']) : '';
        $booking_date = isset($_POST['booking_date']) ? sanitize_input($_POST['booking_date']) : '';
        $participants = isset($_POST['participants']) ? (int)$_POST['participants'] : 1;
        $amount = isset($_POST['amount']) ? (float)$_POST['amount'] : 0;
        
        // Validation
        $errors = [];
        
        if ($tour_id <= 0) {
            $errors[] = 'Invalid tour selection';
        }
        
        if (empty($customer_name)) {
            $errors[] = 'Name is required';
        }
        
        if (empty($customer_email) || !filter_var($customer_email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Valid email is required';
        }
        
        if (empty($customer_phone)) {
            $errors[] = 'Phone number is required';
        }
        
        if (empty($booking_date)) {
            $errors[] = 'Booking date is required';
        }
        
        if ($participants < 1) {
            $errors[] = 'At least one participant is required';
        }
        
        // If there are validation errors
        if (!empty($errors)) {
            // Set error message and redirect back
            $error_message = implode(', ', $errors);
            display_message($error_message, 'error');
            redirect('spirituality.php');
            return;
        }
        
        // Create order ID
        $order_id = 'TUR' . time() . rand(100, 999);
        
        try {
            // Insert booking into database
            $stmt = $this->conn->prepare("
                INSERT INTO tour_bookings 
                (order_id, tour_id, customer_name, customer_email, customer_phone, 
                 booking_date, participants, amount, payment_status, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            ");
            
            $stmt->bind_param(
                "sissssis",
                $order_id,
                $tour_id,
                $customer_name,
                $customer_email,
                $customer_phone,
                $booking_date,
                $participants,
                $amount
            );
            
            if ($stmt->execute()) {
                // Redirect to payment page
                $_SESSION['order_data'] = [
                    'order_id' => $order_id,
                    'amount' => $amount,
                    'booking_type' => 'tour_booking',
                    'tour_id' => $tour_id,
                    'customer_name' => $customer_name,
                    'customer_email' => $customer_email,
                    'customer_phone' => $customer_phone,
                    'booking_date' => $booking_date,
                    'participants' => $participants
                ];
                
                redirect('payment.php?order=' . $order_id);
            } else {
                display_message('Failed to create booking. Please try again.', 'error');
                redirect('spirituality.php');
            }
        } catch (Exception $e) {
            display_message('Error: ' . $e->getMessage(), 'error');
            redirect('spirituality.php');
        }
    }
    
    public function verifyPayment($data) {
        if (!isset($data['payment_id']) || !isset($data['order_id'])) {
            echo json_encode(['status' => 'error', 'message' => 'Missing payment details']);
            return;
        }
        
        $payment_id = sanitize_input($data['payment_id']);
        $order_id = sanitize_input($data['order_id']);
        
        // In a production environment, you would verify the payment with Razorpay
        // For this demo, we'll simulate successful verification
        
        // Update the appropriate booking record
        if (substr($order_id, 0, 3) === 'PST') {
            // Priest consultation booking
            $stmt = $this->conn->prepare("
                UPDATE priest_bookings SET payment_status = 'completed', razorpay_payment_id = ? WHERE order_id = ?
            ");
        } else if (substr($order_id, 0, 3) === 'TUR') {
            // Tour booking
            $stmt = $this->conn->prepare("
                UPDATE tour_bookings SET payment_status = 'completed', razorpay_payment_id = ? WHERE order_id = ?
            ");
        } else {
            // Unknown order type
            echo json_encode(['status' => 'error', 'message' => 'Invalid order ID format']);
            return;
        }
        
        $stmt->bind_param("ss", $payment_id, $order_id);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Payment verified successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update payment status']);
        }
    }
}
?>
