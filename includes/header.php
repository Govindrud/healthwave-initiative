
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : SITE_NAME; ?></title>
    <meta name="description" content="<?php echo isset($metaDescription) ? $metaDescription : SITE_DESCRIPTION; ?>">
    
    <!-- Favicon -->
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="/css/styles.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Additional CSS based on page -->
    <?php if(isset($pageSpecificCSS)): ?>
        <?php $cssFiles = explode(',', $pageSpecificCSS); ?>
        <?php foreach($cssFiles as $cssFile): ?>
            <link rel="stylesheet" href="/css/<?php echo trim($cssFile); ?>">
        <?php endforeach; ?>
    <?php endif; ?>

    <!-- Razorpay Script for Payment -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
    <!-- Session message display -->
    <?php $message = get_message(); ?>
    <?php if($message): ?>
        <div id="session-message" class="toast-notification toast-<?php echo $message['type']; ?>">
            <div class="toast-content">
                <?php if($message['type'] == 'success'): ?>
                    <i class="fas fa-check-circle toast-icon"></i>
                <?php elseif($message['type'] == 'error'): ?>
                    <i class="fas fa-exclamation-circle toast-icon"></i>
                <?php elseif($message['type'] == 'warning'): ?>
                    <i class="fas fa-exclamation-triangle toast-icon"></i>
                <?php else: ?>
                    <i class="fas fa-info-circle toast-icon"></i>
                <?php endif; ?>
                <div class="toast-message"><?php echo $message['message']; ?></div>
            </div>
            <button class="close-message">&times;</button>
        </div>
    <?php endif; ?>
    
    <header>
        <nav class="main-nav">
            <div class="container">
                <div class="logo">
                    <a href="/">
                        <img src="/images/logo-placeholder.png" alt="<?php echo SITE_NAME; ?>" />
                        <span><?php echo SITE_NAME; ?></span>
                    </a>
                </div>
                
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/doctors">Doctors</a></li>
                    <li><a href="/spirituality">Spirituality</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                
                <div class="nav-actions">
                    <a href="/cart" class="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">
                            <?php echo isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0; ?>
                        </span>
                    </a>
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <a href="/account" class="login-btn"><i class="fas fa-user"></i> My Account</a>
                    <?php else: ?>
                        <a href="/login" class="login-btn">Log In</a>
                    <?php endif; ?>
                </div>
            </div>
        </nav>
    </header>
    <div class="content-wrapper">
