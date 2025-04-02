
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : SITE_NAME; ?></title>
    <meta name="description" content="<?php echo isset($metaDescription) ? $metaDescription : 'MeantToHelp - Supporting your mental wellbeing journey'; ?>">
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php echo SITE_URL; ?>/favicon.ico" type="image/x-icon">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/css/styles.css">
    
    <?php if (isset($pageSpecificCSS)): ?>
    <!-- Page Specific CSS -->
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/css/<?php echo $pageSpecificCSS; ?>">
    <?php endif; ?>
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <div class="container">
            <div class="header-inner">
                <div class="logo">
                    <a href="<?php echo SITE_URL; ?>">
                        <img src="<?php echo SITE_URL; ?>/images/logo.png" alt="<?php echo SITE_NAME; ?>" onerror="this.src='<?php echo SITE_URL; ?>/images/logo-placeholder.png'; this.onerror=null;">
                        <span><?php echo SITE_NAME; ?></span>
                    </a>
                </div>
                
                <nav class="main-nav">
                    <ul>
                        <li><a href="<?php echo SITE_URL; ?>">Home</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/doctors.php">Doctors</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/spirituality.php">Spirituality</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/products.php">Products</a></li>
                        <li><a href="<?php echo SITE_URL; ?>/contact.php">Contact</a></li>
                    </ul>
                </nav>
                
                <div class="header-actions">
                    <a href="<?php echo SITE_URL; ?>/cart.php" class="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </a>
                    <button class="mobile-menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <div class="mobile-menu-header">
            <div class="logo">
                <a href="<?php echo SITE_URL; ?>">
                    <img src="<?php echo SITE_URL; ?>/images/logo.png" alt="<?php echo SITE_NAME; ?>" onerror="this.src='<?php echo SITE_URL; ?>/images/logo-placeholder.png'; this.onerror=null;">
                    <span><?php echo SITE_NAME; ?></span>
                </a>
            </div>
            <button class="mobile-menu-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <nav class="mobile-nav">
            <ul>
                <li><a href="<?php echo SITE_URL; ?>">Home</a></li>
                <li><a href="<?php echo SITE_URL; ?>/doctors.php">Doctors</a></li>
                <li><a href="<?php echo SITE_URL; ?>/spirituality.php">Spirituality</a></li>
                <li><a href="<?php echo SITE_URL; ?>/products.php">Products</a></li>
                <li><a href="<?php echo SITE_URL; ?>/contact.php">Contact</a></li>
            </ul>
        </nav>
    </div>
    
    <!-- Main Content -->
    <main>
