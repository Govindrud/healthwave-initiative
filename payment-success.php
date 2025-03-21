
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Successful - MeantToHelp</title>
    <meta name="description" content="Your payment was successful. Thank you for purchasing from MeantToHelp." />
    <meta name="author" content="MeantToHelp" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>

  <body>
    <?php include 'includes/header.php'; ?>

    <main>
      <section class="success-section">
        <div class="container">
          <div class="success-content text-center">
            <div class="success-icon">
              <i class="fa-solid fa-circle-check text-green-500 text-7xl"></i>
            </div>
            <h1 class="my-6 text-3xl font-bold">Payment Successful!</h1>
            <p class="text-lg mb-4">
              <?php 
                $transaction_type = isset($_GET['transaction_type']) ? htmlspecialchars($_GET['transaction_type']) : 'product';
                if ($transaction_type == 'consultation') {
                  echo 'Thank you for booking your appointment. Your consultation has been confirmed and details have been sent to your contact information.';
                } else {
                  echo 'Thank you for your purchase. Your order has been confirmed and your receipt has been sent to your email.';
                }
              ?>
            </p>
            
            <?php
              // Get order ID and payment method from URL parameters
              $order_id = isset($_GET['order_id']) ? htmlspecialchars($_GET['order_id']) : 'Unknown';
              $payment_method = isset($_GET['payment_method']) ? htmlspecialchars($_GET['payment_method']) : 'Online';
              
              echo '<p class="text-md mb-2">Order Reference: <span class="font-semibold">' . $order_id . '</span></p>';
              echo '<p class="text-md mb-8">Payment Method: <span class="font-semibold">' . $payment_method . '</span></p>';
            ?>
            
            <div class="details-card mb-8 p-4 bg-gray-50 rounded-lg mx-auto max-w-md">
              <?php if ($transaction_type == 'consultation'): ?>
                <h3 class="text-xl font-semibold mb-3">Appointment Details</h3>
                <div class="flex justify-between mb-2">
                  <span>Doctor/Service:</span>
                  <span class="font-medium">
                    <?php echo isset($_GET['service']) ? htmlspecialchars($_GET['service']) : 'Consultation'; ?>
                  </span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Date & Time:</span>
                  <span class="font-medium">
                    <?php echo isset($_GET['datetime']) ? htmlspecialchars($_GET['datetime']) : 'To be confirmed'; ?>
                  </span>
                </div>
              <?php else: ?>
                <h3 class="text-xl font-semibold mb-3">Order Details</h3>
                <div class="flex justify-between mb-2">
                  <span>Product:</span>
                  <span class="font-medium">
                    <?php echo isset($_GET['service']) ? htmlspecialchars($_GET['service']) : 'Product'; ?>
                  </span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Delivery:</span>
                  <span class="font-medium">3-5 business days</span>
                </div>
              <?php endif; ?>
              <div class="flex justify-between">
                <span>Amount Paid:</span>
                <span class="font-medium">
                  ₹<?php echo isset($_GET['amount']) ? htmlspecialchars($_GET['amount']) : '0'; ?>
                </span>
              </div>
            </div>
            
            <div class="next-steps bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <h3 class="text-lg font-semibold mb-2">What's Next?</h3>
              <?php if ($transaction_type == 'consultation'): ?>
                <ul class="text-left list-disc list-inside">
                  <li>You'll receive an SMS confirmation with your appointment details</li>
                  <li>Connect to your consultation via the link sent in your email</li>
                  <li>Prepare any questions you want to ask during your session</li>
                </ul>
              <?php else: ?>
                <ul class="text-left list-disc list-inside">
                  <li>You'll receive an email confirmation with your order details</li>
                  <li>Track your order status through the link in your email</li>
                  <li>Your package will be dispatched within 24 hours</li>
                </ul>
              <?php endif; ?>
            </div>
            
            <div class="success-actions mt-8">
              <a href="index.php" class="primary-btn">Return to Home</a>
              <a href="#" class="secondary-btn ml-4" onclick="window.print()">Print Receipt</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
  </body>
</html>
