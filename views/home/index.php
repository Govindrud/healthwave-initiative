
<?php require_once 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Support for Mental Well-being</title>
    <meta name="description" content="<?php echo SITE_NAME; ?> provides tools, resources and services to support your mental well-being journey.">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <?php include 'includes/header.php'; ?>

    <main>
        <?php include 'views/home/partials/hero.php'; ?>
        <?php include 'views/home/partials/featured_products.php'; ?>
        <?php include 'views/home/partials/services.php'; ?>
        <?php include 'views/home/partials/testimonials.php'; ?>
        <?php include 'views/home/partials/cta.php'; ?>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>

</html>
