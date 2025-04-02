
<?php
// Include configuration file
require_once 'includes/config.php';

// Set page title and description
$pageTitle = 'Contact Us | ' . SITE_NAME;
$metaDescription = 'Get in touch with our team for any questions about our mental wellbeing services.';
$pageSpecificCSS = 'contact.css';

// Process form submission
$success = false;
$error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate form data
    $name = sanitize_input($_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $subject = sanitize_input($_POST['subject'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');
    
    if (empty($name) || empty($email) || empty($message)) {
        $error = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email address.';
    } else {
        // Process the form (in a real application, send email)
        // For demonstration, we'll just show success message
        $success = 'Thank you for your message. We will get back to you soon!';
        
        // In a real application, you might do:
        // mail('your@email.com', 'Contact Form: ' . $subject, $message, 'From: ' . $email);
    }
}

// Include header
include VIEWS_PATH . 'includes/header.php';
?>

<!-- Contact Section -->
<section class="contact-section">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">Contact Us</h1>
            <p class="section-subtitle">We're here to help you on your mental wellbeing journey</p>
        </div>
        
        <div class="contact-content">
            <div class="contact-info">
                <div class="contact-card">
                    <div class="icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="info">
                        <h3>Our Location</h3>
                        <p>123 Wellness Street<br>Mental Health District<br>Mumbai, India 400001</p>
                    </div>
                </div>
                
                <div class="contact-card">
                    <div class="icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <div class="info">
                        <h3>Phone Number</h3>
                        <p>+91 98765 43210</p>
                        <p>+91 12345 67890</p>
                    </div>
                </div>
                
                <div class="contact-card">
                    <div class="icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="info">
                        <h3>Email Address</h3>
                        <p>info@meanttohelp.com</p>
                        <p>support@meanttohelp.com</p>
                    </div>
                </div>
                
                <div class="contact-card">
                    <div class="icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="info">
                        <h3>Working Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                        <p>Saturday: 10:00 AM - 5:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-container">
                <?php if ($success): ?>
                    <div class="alert alert-success">
                        <?php echo $success; ?>
                    </div>
                <?php endif; ?>
                
                <?php if ($error): ?>
                    <div class="alert alert-error">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>
                
                <form class="contact-form" method="post" action="contact.php">
                    <div class="form-group">
                        <label for="name">Your Name*</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address*</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject">
                    </div>
                    
                    <div class="form-group full-width">
                        <label for="message">Your Message*</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- Map Section -->
<section class="map-section">
    <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1626789845349!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
</section>

<?php
// Include footer
include VIEWS_PATH . 'includes/footer.php';
?>
