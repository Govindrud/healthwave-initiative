
<?php
// Database connection parameters
$servername = "localhost";
$username = "your_db_username"; // Replace with your actual database username
$password = "your_db_password"; // Replace with your actual database password
$dbname = "meanttohelp";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Log the error but don't expose details to user
    error_log("Connection failed: " . $conn->connect_error);
    
    // Redirect with error message
    header("Location: ../index.php?status=error&message=We're experiencing technical difficulties. Please try again later.");
    exit();
}

// Process the form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../index.php?status=error&message=Please enter a valid email address.");
        exit();
    }
    
    // Check if all required fields are filled
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        header("Location: ../index.php?status=error&message=Please fill all required fields.");
        exit();
    }
    
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    
    // Execute the statement
    if ($stmt->execute()) {
        // Send notification email to admin
        $to = "support@meanttohelp.com";
        $emailSubject = "New Contact Form Submission: $subject";
        $emailBody = "Name: $name\n";
        $emailBody .= "Email: $email\n\n";
        $emailBody .= "Message:\n$message";
        $headers = "From: webmaster@meanttohelp.com";
        
        mail($to, $emailSubject, $emailBody, $headers);
        
        // Redirect with success message
        header("Location: ../index.php?status=success&message=Your message has been sent successfully. We'll get back to you soon!");
        exit();
    } else {
        // Log the error
        error_log("Error: " . $stmt->error);
        
        // Redirect with error message
        header("Location: ../index.php?status=error&message=There was a problem sending your message. Please try again.");
        exit();
    }
    
    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
