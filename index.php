
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
    <link rel="stylesheet" href="css/doctors.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Razorpay SDK -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </head>

  <body>
    <?php include 'includes/header.php'; ?>

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

      <!-- Services Preview Section -->
      <section class="services-preview-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">Our Services</span>
            <h2>Comprehensive <span class="gradient-text">Mental Health</span> Support</h2>
            <p>Discover our range of services designed to support your mental wellness journey.</p>
          </div>
          
          <div class="services-grid">
            <a href="doctors.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-user-md"></i>
              </div>
              <h3>Consult with Doctors</h3>
              <p>Connect with experienced psychiatrists and psychologists for professional care.</p>
            </a>
            
            <a href="student-psychologists.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <h3>Student Psychologists</h3>
              <p>Affordable counseling with supervised psychology students and interns.</p>
            </a>
            
            <a href="webinars.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-laptop"></i>
              </div>
              <h3>Mental Health Webinars</h3>
              <p>Attend live and recorded sessions on various mental health topics.</p>
            </a>
            
            <a href="adventures.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-mountain"></i>
              </div>
              <h3>Stress-Free Adventures</h3>
              <p>Join guided tours and activities designed to reduce stress and anxiety.</p>
            </a>
            
            <a href="games.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-gamepad"></i>
              </div>
              <h3>Mental Health Games</h3>
              <p>Engage with fun activities and games that support mental wellness.</p>
            </a>
            
            <a href="corporate-plans.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-building"></i>
              </div>
              <h3>Corporate Plans</h3>
              <p>Wellness programs and mental health support for organizations.</p>
            </a>
            
            <!-- New Spirituality Card -->
            <a href="spirituality.php" class="service-card">
              <div class="service-icon">
                <i class="fas fa-om"></i>
              </div>
              <h3>Spiritual Guidance</h3>
              <p>Connect with spiritual guides and explore sacred places for inner peace.</p>
            </a>
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

    <?php include 'includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/contact.js"></script>
    <script src="js/razorpay.js"></script>
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  </body>
</html>
