<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MeantToHelp - Mental Health Support</title>
    <meta name="description" content="Mental health support and resources to help you on your journey to wellness." />
    <meta name="author" content="MeantToHelp" />
    <meta property="og:image" content="/images/og-image.png" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>

  <body>
    <!-- Navigation Bar -->
    <header class="nav-header">
      <div class="container">
        <nav class="navbar">
          <div class="logo">
            <a href="index.php">
              <div class="logo-container">
                <div class="logo-icon">
                  <i class="fa-solid fa-brain"></i>
                  <span class="logo-sparkle logo-sparkle-1"><i class="fa-solid fa-sparkle"></i></span>
                  <span class="logo-sparkle logo-sparkle-2"><i class="fa-solid fa-sparkle"></i></span>
                </div>
                <span class="logo-text">MeantToHelp</span>
              </div>
            </a>
          </div>
          
          <button class="mobile-menu-btn" aria-label="Toggle menu">
            <i class="fa-solid fa-bars"></i>
          </button>
          
          <div class="nav-links">
            <a href="#about" class="nav-link">About</a>
            <a href="services.php" class="nav-link">Services</a>
            <a href="products.php" class="nav-link">Products</a>
            <a href="#contact" class="nav-link">Contact</a>
            <a href="login.php" class="login-btn">Login</a>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <span class="badge">Mental Health Support</span>
            <h1>Empowering Your <span class="gradient-text">Mental Health</span> Journey</h1>
            <p>Professional support, resources, and community to help you navigate your mental wellness path with confidence and care.</p>
            <div class="hero-buttons">
              <a href="#contact" class="primary-btn">Get Started</a>
              <a href="#about" class="secondary-btn">Learn More</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="images/hero-image.jpg" alt="Mental health support illustration" />
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="about-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">About Us</span>
            <h2>Our <span class="gradient-text">Mission</span></h2>
            <p>We're dedicated to making mental health support accessible to everyone through innovative solutions and compassionate care.</p>
          </div>
          
          <div class="about-cards">
            <div class="about-card">
              <div class="card-icon">
                <i class="fa-solid fa-heart-pulse"></i>
              </div>
              <h3>Professional Care</h3>
              <p>Our team of certified professionals provides personalized care tailored to your needs.</p>
            </div>
            <div class="about-card">
              <div class="card-icon">
                <i class="fa-solid fa-users"></i>
              </div>
              <h3>Supportive Community</h3>
              <p>Join our community of individuals supporting each other on their mental health journeys.</p>
            </div>
            <div class="about-card">
              <div class="card-icon">
                <i class="fa-solid fa-lightbulb"></i>
              </div>
              <h3>Innovative Resources</h3>
              <p>Access cutting-edge tools and resources designed to enhance your mental wellbeing.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section class="products-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">Products</span>
            <h2>Mental Wellness <span class="gradient-text">Products</span></h2>
            <p>Discover tools and resources designed to support your mental wellbeing journey.</p>
          </div>
          
          <div class="product-cards">
            <?php include 'includes/featured-products.php'; ?>
          </div>
          
          <div class="view-all-container">
            <a href="products.php" class="view-all-btn">View All Products</a>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="contact-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">Get In Touch</span>
            <h2>We're Here To <span class="gradient-text">Support You</span></h2>
            <p>Have questions about our services or need assistance with your mental health journey? Our team is here to help.</p>
          </div>
          
          <div class="contact-cards">
            <div class="contact-card">
              <div class="card-icon">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>support@meanttohelp.com</p>
              <button class="copy-btn" data-copy="support@meanttohelp.com">Copy Email Address</button>
            </div>
            
            <div class="contact-card">
              <div class="card-icon">
                <i class="fa-solid fa-phone"></i>
              </div>
              <h3>Call Us</h3>
              <p>+918329116329</p>
              <button class="copy-btn" data-copy="+918329116329">Copy Phone Number</button>
            </div>
            
            <div class="contact-card">
              <div class="card-icon">
                <i class="fa-solid fa-comment"></i>
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time</p>
              <button class="chat-btn">Start Chat</button>
            </div>
          </div>
          
          <div class="contact-content">
            <div class="location-container">
              <div class="location-header">
                <h3>Our Location</h3>
              </div>
              <div class="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0926253167197!2d73.76252347498663!3d18.48428758274636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc85d0cd699%3A0x45d6f19dd7261bb9!2sBhugaon%2C%20Pune%2C%20Maharashtra%20411042!5e0!3m2!1sen!2sin!4v1698338226587!5m2!1sen!2sin"
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  title="TechD Office Location">
                </iframe>
              </div>
              <div class="location-details">
                <i class="fa-solid fa-location-dot"></i>
                <div>
                  <h4>TechD Headquarters</h4>
                  <p>
                    TechD, Bhugaon<br />
                    Near Chandni Chowk<br />
                    Pune, Maharashtra<br />
                    India - 411042
                  </p>
                </div>
              </div>
            </div>
            
            <div class="contact-form-container">
              <h3>Send Us a Message</h3>
              <form action="includes/process-contact.php" method="POST" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required>
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required>
                  </div>
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="How can we help you?" required>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" placeholder="Please share your questions or feedback..." rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn pulse-animation">
                  <i class="fa-solid fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <div class="logo-container">
              <div class="logo-icon">
                <i class="fa-solid fa-brain"></i>
              </div>
              <span class="logo-text">MeantToHelp</span>
            </div>
            <p>Supporting your mental health journey with compassion and care.</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="services.php">Services</a></li>
                <li><a href="products.php">Products</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="faq.php">FAQ</a></li>
                <li><a href="privacy.php">Privacy Policy</a></li>
                <li><a href="terms.php">Terms of Service</a></li>
                <li><a href="careers.php">Careers</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h4>Connect</h4>
              <div class="social-links">
                <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
              </div>
              <p>Email: support@meanttohelp.com</p>
              <p>Phone: +918329116329</p>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; <?php echo date("Y"); ?> MeantToHelp. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Toast Notification -->
    <div id="toast" class="toast-notification">
      <div class="toast-content">
        <i class="fas fa-check-circle toast-icon"></i>
        <div class="toast-message">Message sent successfully!</div>
      </div>
      <div class="toast-progress"></div>
    </div>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/contact.js"></script>
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  </body>
</html>
