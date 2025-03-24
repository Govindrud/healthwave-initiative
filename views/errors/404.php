
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - <?php echo SITE_NAME; ?></title>
    <meta name="description" content="The page you are looking for does not exist or has been moved.">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
            padding: 2rem;
        }
        
        .error-code {
            font-size: 8rem;
            font-weight: 700;
            color: var(--meant-200);
            margin: 0;
            line-height: 1;
        }
        
        .error-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            margin: 1rem 0;
            color: var(--meant-700);
        }
        
        .error-message {
            font-size: 1.2rem;
            color: var(--muted-foreground);
            max-width: 600px;
            margin: 1rem auto 2rem;
        }
        
        .error-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
        }
    </style>
</head>

<body>
    <?php include 'includes/header.php'; ?>

    <main>
        <div class="error-container">
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Page Not Found</h2>
            <p class="error-message">The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.</p>
            
            <div class="error-buttons">
                <a href="index.php" class="btn btn-primary">Go to Homepage</a>
                <a href="javascript:history.back()" class="btn btn-outline">Go Back</a>
            </div>
        </div>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>

</html>
