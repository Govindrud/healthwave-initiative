
<?php
require_once 'includes/Model.php';

class SpiritualityModel extends Model {
    
    public function __construct($conn) {
        parent::__construct($conn);
    }
    
    public function getPriests() {
        $priests = [];
        $sql = "SELECT * FROM spiritual_priests ORDER BY rating DESC";
        $result = $this->conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $priests[] = $row;
            }
        }
        
        return $priests;
    }
    
    public function getTours() {
        $tours = [];
        $sql = "SELECT * FROM spiritual_tours ORDER BY price";
        $result = $this->conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $tours[] = $row;
            }
        }
        
        return $tours;
    }
    
    public function createPriestBooking($data) {
        try {
            // Generate a unique order ID
            $orderId = 'PRIEST_' . uniqid();
            
            // Insert booking into database
            $stmt = $this->conn->prepare("INSERT INTO priest_bookings 
                (order_id, priest_id, customer_name, customer_email, customer_phone, 
                booking_datetime, duration_minutes, amount, payment_method, payment_status, booking_status, notes) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Razorpay', 'pending', 'scheduled', ?)");
            
            $stmt->bind_param(
                "ssssssdss",
                $orderId,
                $data['priest_id'],
                $data['customer_name'],
                $data['customer_email'],
                $data['customer_phone'],
                $data['booking_datetime'],
                $data['duration'],
                $data['amount'],
                $data['notes']
            );
            
            if ($stmt->execute()) {
                return [
                    'status' => 'success',
                    'order_id' => $orderId,
                    'amount' => $data['amount'],
                    'customer_name' => $data['customer_name'],
                    'customer_email' => $data['customer_email'],
                    'customer_phone' => $data['customer_phone'],
                    'message' => 'Booking created successfully'
                ];
            } else {
                return ['status' => 'error', 'message' => 'Database error: ' . $stmt->error];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Error: ' . $e->getMessage()];
        }
    }
    
    public function createTourBooking($data) {
        try {
            // Generate a unique order ID
            $orderId = 'TOUR_' . uniqid();
            
            // Insert booking into database
            $stmt = $this->conn->prepare("INSERT INTO tour_bookings 
                (order_id, tour_id, customer_name, customer_email, customer_phone, 
                booking_date, participants, amount, payment_method, payment_status, booking_status, notes) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Razorpay', 'pending', 'confirmed', ?)");
            
            $stmt->bind_param(
                "ssssssdss",
                $orderId,
                $data['tour_id'],
                $data['customer_name'],
                $data['customer_email'],
                $data['customer_phone'],
                $data['booking_date'],
                $data['participants'],
                $data['amount'],
                $data['notes']
            );
            
            if ($stmt->execute()) {
                return [
                    'status' => 'success',
                    'order_id' => $orderId,
                    'amount' => $data['amount'],
                    'customer_name' => $data['customer_name'],
                    'customer_email' => $data['customer_email'],
                    'customer_phone' => $data['customer_phone'],
                    'message' => 'Tour booking created successfully'
                ];
            } else {
                return ['status' => 'error', 'message' => 'Database error: ' . $stmt->error];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Error: ' . $e->getMessage()];
        }
    }
    
    public function verifyPayment($data) {
        try {
            if ($data['booking_type'] === 'priest_consultation') {
                // Update priest booking
                $stmt = $this->conn->prepare("UPDATE priest_bookings SET 
                    razorpay_payment_id = ?, 
                    razorpay_order_id = ?, 
                    payment_date = NOW(), 
                    payment_status = 'completed' 
                    WHERE order_id = ?");
                    
                $stmt->bind_param("sss", $data['payment_id'], $data['razorpay_order_id'], $data['order_id']);
                
                if ($stmt->execute()) {
                    return $this->sendPriestBookingConfirmation($data['order_id']);
                } else {
                    return ['status' => 'error', 'message' => 'Failed to update booking: ' . $stmt->error];
                }
            } elseif ($data['booking_type'] === 'tour_booking') {
                // Update tour booking
                $stmt = $this->conn->prepare("UPDATE tour_bookings SET 
                    razorpay_payment_id = ?, 
                    razorpay_order_id = ?, 
                    payment_date = NOW(), 
                    payment_status = 'completed' 
                    WHERE order_id = ?");
                    
                $stmt->bind_param("sss", $data['payment_id'], $data['razorpay_order_id'], $data['order_id']);
                
                if ($stmt->execute()) {
                    return $this->sendTourBookingConfirmation($data['order_id']);
                } else {
                    return ['status' => 'error', 'message' => 'Failed to update booking: ' . $stmt->error];
                }
            } else {
                return ['status' => 'error', 'message' => 'Invalid booking type'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()];
        }
    }
    
    private function sendPriestBookingConfirmation($orderId) {
        // Get booking details for SMS notification
        $bookingStmt = $this->conn->prepare("SELECT p.name, b.customer_name, b.customer_phone, b.booking_datetime 
                                      FROM priest_bookings b 
                                      JOIN spiritual_priests p ON b.priest_id = p.id 
                                      WHERE b.order_id = ?");
        $bookingStmt->bind_param("s", $orderId);
        $bookingStmt->execute();
        $bookingResult = $bookingStmt->get_result();
        
        if ($bookingResult->num_rows > 0) {
            $bookingData = $bookingResult->fetch_assoc();
            
            // Send SMS notification
            $this->sendSmsNotification(
                $bookingData['customer_phone'],
                "Your consultation with " . $bookingData['name'] . " has been confirmed for " . $bookingData['booking_datetime'] . ". Thank you for booking with " . SITE_NAME . "."
            );
            
            return ['status' => 'success', 'message' => 'Payment verified successfully'];
        }
        
        return ['status' => 'success', 'message' => 'Payment verified successfully, but failed to send confirmation'];
    }
    
    private function sendTourBookingConfirmation($orderId) {
        // Get booking details for SMS notification
        $bookingStmt = $this->conn->prepare("SELECT t.name, b.customer_name, b.customer_phone, b.booking_date 
                                      FROM tour_bookings b 
                                      JOIN spiritual_tours t ON b.tour_id = t.id 
                                      WHERE b.order_id = ?");
        $bookingStmt->bind_param("s", $orderId);
        $bookingStmt->execute();
        $bookingResult = $bookingStmt->get_result();
        
        if ($bookingResult->num_rows > 0) {
            $bookingData = $bookingResult->fetch_assoc();
            
            // Send SMS notification
            $this->sendSmsNotification(
                $bookingData['customer_phone'],
                "Your tour booking for " . $bookingData['name'] . " on " . date('d M Y', strtotime($bookingData['booking_date'])) . " has been confirmed. Thank you for booking with " . SITE_NAME . "."
            );
            
            return ['status' => 'success', 'message' => 'Payment verified successfully'];
        }
        
        return ['status' => 'success', 'message' => 'Payment verified successfully, but failed to send confirmation'];
    }
    
    private function sendSmsNotification($phoneNumber, $message) {
        // You would implement your SMS gateway integration here
        // For now, we'll just log the message
        error_log("SMS to $phoneNumber: $message");
        return true;
    }
    
    public function formatDate($date) {
        return date('d M Y', strtotime($date));
    }
}
?>
