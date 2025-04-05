
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : SITE_NAME; ?></title>
    <meta name="description" content="<?php echo isset($metaDescription) ? $metaDescription : SITE_DESCRIPTION; ?>">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    <?php if(isset($pageSpecificCSS)): ?>
        <link rel="stylesheet" href="css/<?php echo $pageSpecificCSS; ?>">
    <?php endif; ?>
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Header -->
    <header>
        <nav class="main-nav">
            <div class="container">
                <div class="logo">
                    <a href="/">
                        <img src="images/logo.png" alt="MeantToHelp Logo" onerror="this.src='public/placeholder.svg'">
                        <span>MeantToHelp</span>
                    </a>
                </div>
                
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="products.php">Products</a></li>
                    <li><a href="doctors.php">Consult</a></li>
                    <li><a href="spirituality.php">Spiritual</a></li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
                
                <div class="nav-actions">
                    <a href="cart.php" class="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </a>
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <a href="account.php" class="login-btn">My Account</a>
                    <?php else: ?>
                        <a href="login.php" class="login-btn">Login</a>
                    <?php endif; ?>
                </div>
            </div>
        </nav>
    </header>
    
    <div class="content-wrapper">
