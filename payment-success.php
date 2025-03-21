
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
            <p class="text-lg mb-8">
              Thank you for your purchase. Your order has been confirmed and your receipt has been sent to your email.
            </p>
            
            <?php
              // Get order ID from URL parameter
              $order_id = isset($_GET['order_id']) ? htmlspecialchars($_GET['order_id']) : 'Unknown';
              echo '<p class="text-md mb-8">Order Reference: <span class="font-semibold">' . $order_id . '</span></p>';
            ?>
            
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
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  </body>
</html>
