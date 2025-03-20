
<?php
session_start();

// Check if user is already logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    header("Location: admin/dashboard.php");
    exit();
}

// Database connection
$db_error = false;
try {
    $servername = "localhost";
    $username = "your_db_username"; // Replace with your actual database username
    $password = "your_db_password"; // Replace with your actual database password
    $dbname = "meanttohelp";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    $db_error = true;
    error_log("Database connection error: " . $e->getMessage());
}

// Process login form
$login_error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST" && !$db_error) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Validate inputs
    if (empty($username) || empty($password)) {
        $login_error = "Please enter both username and password.";
    } else {
        // Fetch user from database
        $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['logged_in'] = true;
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                
                // Redirect to admin dashboard
                header("Location: admin/dashboard.php");
                exit();
            } else {
                $login_error = "Invalid username or password.";
            }
        } else {
            $login_error = "Invalid username or password.";
        }
        
        $stmt->close();
    }
}

// Close connection
if (!$db_error) {
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - MeantToHelp</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 2rem;
            background-color: var(--card);
            border-radius: var(--radius);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .login-logo {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .error-message {
            background-color: #FEE2E2;
            color: #B91C1C;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .db-error-message {
            background-color: #FEF3C7;
            color: #92400E;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-logo">
            <div class="logo-container">
                <div class="logo-icon">
                    <i class="fa-solid fa-brain"></i>
                    <span class="logo-sparkle logo-sparkle-1"><i class="fa-solid fa-sparkle"></i></span>
                    <span class="logo-sparkle logo-sparkle-2"><i class="fa-solid fa-sparkle"></i></span>
                </div>
                <span class="logo-text">MeantToHelp</span>
            </div>
            <h2>Admin Login</h2>
        </div>
        
        <?php if ($db_error): ?>
            <div class="db-error-message">
                <strong>Database Connection Error:</strong> Unable to connect to the database. Please check your configuration.
            </div>
        <?php endif; ?>
        
        <?php if (!empty($login_error)): ?>
            <div class="error-message">
                <?php echo $login_error; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="submit-btn" style="width: 100%; margin-top: 1.5rem;">
                <i class="fa-solid fa-right-to-bracket"></i> Login
            </button>
        </form>
        
        <div style="text-align: center; margin-top: 1.5rem;">
            <a href="index.php">Return to Website</a>
        </div>
    </div>
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>
</html>
