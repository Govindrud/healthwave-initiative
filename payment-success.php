
<?php
require_once 'includes/config.php';

// Retrieve order details
$order_id = isset($_GET['order_id']) ? sanitize_input($_GET['order_id']) : '';
$type = isset($_GET['type']) ? sanitize_input($_GET['type']) : '';

$booking_details = [];
$error_message = '';

// Validate inputs
if (empty($order_id) || empty($type)) {
    $error_message = 'Invalid request. Missing order information.';
} else {
    try {
        if ($type === 'priest_consultation') {
            // Get priest booking details
            $stmt = $conn->prepare("SELECT b.*, p.name as priest_name 
                                  FROM priest_bookings b 
                                  JOIN spiritual_priests p ON b.priest_id = p.id 
                                  WHERE b.order_id = ? AND b.payment_status = 'completed'");
            $stmt->bind_param("s", $order_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $booking_details = $result->fetch_assoc();
            } else {
                $error_message = 'Booking not found or payment not completed.';
            }
        } elseif ($type === 'tour_booking') {
            // Get tour booking details
            $stmt = $conn->prepare("SELECT b.*, t.name as tour_name 
                                  FROM tour_bookings b 
                                  JOIN spiritual_tours t ON b.tour_id = t.id 
                                  WHERE b.order_id = ? AND b.payment_status = 'completed'");
            $stmt->bind_param("s", $order_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $booking_details = $result->fetch_assoc();
            } else {
                $error_message = 'Booking not found or payment not completed.';
            }
        } else {
            $error_message = 'Invalid booking type.';
        }
    } catch (Exception $e) {
        $error_message = 'An error occurred: ' . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Success - MeantToHelp</title>
    <meta name="description" content="Your payment was successful!" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        .success-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .success-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background-color: #4CAF50;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2.5rem;
        }
        
        .success-details {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-label {
            width: 40%;
            font-weight: 600;
            color: #555;
        }
        
        .detail-value {
            width: 60%;
        }
        
        .next-steps {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 1.5rem;
        }
        
        .next-steps h3 {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        
        .next-steps ul {
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .success-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .success-button {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .primary-button {
            background-color: var(--meant-600);
            color: white;
        }
        
        .primary-button:hover {
            background-color: var(--meant-700);
        }
        
        .secondary-button {
            background-color: white;
            color: var(--meant-600);
            border: 1px solid var(--meant-600);
        }
        
        .secondary-button:hover {
            background-color: #f5f5f5;
        }
        
        .error-container {
            text-align: center;
            padding: 3rem 1rem;
        }
        
        .error-icon {
            color: #f44336;
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <main class="page-main">
        <section class="page-section">
            <div class="container">
                <?php if (empty($error_message) && !empty($booking_details)): ?>
                    <div class="success-container">
                        <div class="success-header">
                            <div class="success-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <h1>Payment Successful!</h1>
                            <p>Thank you for your booking. Your transaction has been completed successfully.</p>
                        </div>
                        
                        <div class="success-details">
                            <?php if ($type === 'priest_consultation'): ?>
                                <div class="detail-row">
                                    <div class="detail-label">Booking Reference:</div>
                                    <div class="detail-value"><?php echo $booking_details['order_id']; ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Spiritual Guide:</div>
                                    <div class="detail-value"><?php echo $booking_details['priest_name']; ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Consultation Date:</div>
                                    <div class="detail-value"><?php echo $booking_details['booking_datetime']; ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Duration:</div>
                                    <div class="detail-value"><?php echo $booking_details['duration_minutes']; ?> minutes</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Amount Paid:</div>
                                    <div class="detail-value">₹<?php echo number_format($booking_details['amount'], 2); ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Payment ID:</div>
                                    <div class="detail-value"><?php echo $booking_details['razorpay_payment_id']; ?></div>
                                </div>
                            <?php elseif ($type === 'tour_booking'): ?>
                                <div class="detail-row">
                                    <div class="detail-label">Booking Reference:</div>
                                    <div class="detail-value"><?php echo $booking_details['order_id']; ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Tour:</div>
                                    <div class="detail-value"><?php echo $booking_details['tour_name']; ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Tour Date:</div>
                                    <div class="detail-value"><?php echo date('d M Y', strtotime($booking_details['booking_date'])); ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Participants:</div>
                                    <div class="detail-value"><?php echo $booking_details['participants']; ?> person(s)</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Amount Paid:</div>
                                    <div class="detail-value">₹<?php echo number_format($booking_details['amount'], 2); ?></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Payment ID:</div>
                                    <div class="detail-value"><?php echo $booking_details['razorpay_payment_id']; ?></div>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="next-steps">
                            <h3>Next Steps</h3>
                            <?php if ($type === 'priest_consultation'): ?>
                                <ul>
                                    <li>You will receive a confirmation email with the booking details shortly.</li>
                                    <li>A confirmation SMS has been sent to your registered mobile number.</li>
                                    <li>Our team will contact you 24 hours before your scheduled consultation with connection details.</li>
                                    <li>Please ensure you have a stable internet connection for the consultation.</li>
                                </ul>
                            <?php elseif ($type === 'tour_booking'): ?>
                                <ul>
                                    <li>You will receive a confirmation email with the booking details shortly.</li>
                                    <li>A confirmation SMS has been sent to your registered mobile number.</li>
                                    <li>Our tour coordinator will contact you 3 days before your tour date with meeting point details.</li>
                                    <li>Don't forget to check the recommended items to bring for your spiritual journey.</li>
                                </ul>
                            <?php endif; ?>
                        </div>
                        
                        <div class="success-buttons">
                            <a href="spirituality.php" class="success-button secondary-button">Back to Spirituality</a>
                            <a href="index.php" class="success-button primary-button">Return to Home</a>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="error-container">
                        <div class="error-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <h1>Something went wrong</h1>
                        <p><?php echo $error_message ?: 'We couldn\'t find the booking details for this transaction.'; ?></p>
                        <div class="success-buttons">
                            <a href="spirituality.php" class="success-button secondary-button">Back to Spirituality</a>
                            <a href="index.php" class="success-button primary-button">Return to Home</a>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </section>
    </main>
    
    <?php include 'includes/footer.php'; ?>
    
    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
