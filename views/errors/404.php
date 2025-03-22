
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 70vh;
            padding: 2rem;
        }
        
        .error-code {
            font-size: 8rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0;
            line-height: 1;
        }
        
        .error-message {
            font-size: 2rem;
            margin: 1rem 0 2rem;
        }
        
        .error-description {
            max-width: 600px;
            margin: 0 auto 2rem;
        }
    </style>
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <main>
        <div class="error-container">
            <h1 class="error-code">404</h1>
            <h2 class="error-message">Page Not Found</h2>
            <p class="error-description">The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" class="btn btn-primary">Return to Home</a>
        </div>
    </main>
    
    <?php include 'includes/footer.php'; ?>
</body>
</html>
