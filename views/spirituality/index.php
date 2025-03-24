
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : 'Spiritual Services | MeantToHelp'; ?></title>
    <meta name="description" content="<?php echo isset($metaDescription) ? $metaDescription : 'Connect with spiritual guides and explore sacred tours for your mental wellbeing journey.'; ?>">
    
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
    
    <!-- Page Specific CSS -->
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>/css/spirituality-improved.css">
    
    <!-- Razorpay JavaScript -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
    <!-- Include Header -->
    <?php include VIEWS_PATH . 'includes/header.php'; ?>
    
    <!-- Hero Section -->
    <section class="spirituality-hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Nurture Your Spiritual Wellbeing</h1>
                <p class="hero-subtitle">Connect with experienced spiritual guides and explore sacred journeys to enhance your mental and spiritual health.</p>
                <div class="hero-buttons">
                    <a href="#priest-tab" class="btn btn-primary btn-lg tab-scroll" data-tab="priests">Meet Our Guides</a>
                    <a href="#tour-tab" class="btn btn-outline-light btn-lg tab-scroll" data-tab="tours">Explore Sacred Tours</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Main Content -->
    <div class="container">
        <!-- Tabs Section -->
        <div class="spirituality-tabs">
            <div class="tab-buttons">
                <button class="tab-button active" data-tab="priests">
                    <i class="fas fa-pray"></i> Spiritual Guides
                </button>
                <button class="tab-button" data-tab="tours">
                    <i class="fas fa-place-of-worship"></i> Sacred Tours
                </button>
            </div>
            
            <div class="tab-content">
                <!-- Priests Tab -->
                <div id="priests-tab" class="tab-pane active">
                    <div class="section-intro">
                        <h2>Connect with Spiritual Guides</h2>
                        <p>Our spiritual guides offer personal consultations to help you on your journey towards inner peace and mental wellbeing.</p>
                    </div>
                    
                    <div class="priests-grid">
                        <?php if (!empty($priests)): ?>
                            <?php foreach ($priests as $priest): ?>
                                <div class="priest-card">
                                    <div class="priest-image">
                                        <img src="<?php echo !empty($priest['image']) ? IMAGES_URL . 'priests/' . $priest['image'] : IMAGES_URL . 'priest-placeholder.jpg'; ?>" 
                                             alt="<?php echo htmlspecialchars($priest['name']); ?>"
                                             onerror="this.src='<?php echo IMAGES_URL; ?>priest-placeholder.jpg'">
                                    </div>
                                    <div class="priest-details">
                                        <h3 class="priest-name"><?php echo htmlspecialchars($priest['name']); ?></h3>
                                        <p class="priest-expertise"><?php echo htmlspecialchars($priest['expertise']); ?></p>
                                        
                                        <div class="priest-rating">
                                            <div class="stars">
                                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                                    <?php if ($i <= floor($priest['rating'])): ?>
                                                        <i class="fas fa-star"></i>
                                                    <?php elseif ($i - 0.5 <= $priest['rating']): ?>
                                                        <i class="fas fa-star-half-alt"></i>
                                                    <?php else: ?>
                                                        <i class="far fa-star"></i>
                                                    <?php endif; ?>
                                                <?php endfor; ?>
                                            </div>
                                            <span><?php echo number_format($priest['rating'], 1); ?></span>
                                        </div>
                                        
                                        <div class="experience">
                                            <i class="fas fa-history"></i>
                                            <span><?php echo $priest['experience_years']; ?> years of experience</span>
                                        </div>
                                        
                                        <p class="priest-description">
                                            <?php echo htmlspecialchars(substr($priest['description'], 0, 150)); ?>...
                                        </p>
                                        
                                        <p class="priest-rate">₹<?php echo number_format($priest['hourly_rate']); ?> per hour</p>
                                        
                                        <button class="book-priest-btn" 
                                                data-id="<?php echo $priest['id']; ?>" 
                                                data-name="<?php echo htmlspecialchars($priest['name']); ?>" 
                                                data-rate="<?php echo $priest['hourly_rate']; ?>">
                                            Book Consultation
                                        </button>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="empty-message">
                                <p>No spiritual guides are currently available. Please check back later.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Tours Tab -->
                <div id="tours-tab" class="tab-pane">
                    <div class="section-intro">
                        <h2>Sacred Spiritual Tours</h2>
                        <p>Experience the energy of sacred places with our guided spiritual tours designed to rejuvenate your mind and soul.</p>
                    </div>
                    
                    <div class="tours-grid">
                        <?php if (!empty($tours)): ?>
                            <?php foreach ($tours as $tour): ?>
                                <div class="tour-card">
                                    <div class="tour-image">
                                        <img src="<?php echo !empty($tour['image']) ? IMAGES_URL . 'tours/' . $tour['image'] : IMAGES_URL . 'tour-placeholder.jpg'; ?>" 
                                             alt="<?php echo htmlspecialchars($tour['name']); ?>"
                                             onerror="this.src='<?php echo IMAGES_URL; ?>tour-placeholder.jpg'">
                                        <div class="tour-location">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <?php echo htmlspecialchars($tour['location']); ?>
                                        </div>
                                    </div>
                                    <div class="tour-details">
                                        <h3 class="tour-name"><?php echo htmlspecialchars($tour['name']); ?></h3>
                                        
                                        <div class="tour-info">
                                            <div class="tour-duration">
                                                <i class="fas fa-clock"></i>
                                                <span><?php echo htmlspecialchars($tour['duration']); ?></span>
                                            </div>
                                            <div class="tour-participants">
                                                <i class="fas fa-users"></i>
                                                <span>Max <?php echo $tour['max_participants']; ?> people</span>
                                            </div>
                                        </div>
                                        
                                        <p class="tour-description">
                                            <?php echo htmlspecialchars(substr($tour['description'], 0, 150)); ?>...
                                        </p>
                                        
                                        <p class="tour-price">₹<?php echo number_format($tour['price']); ?> per person</p>
                                        
                                        <button class="book-tour-btn" 
                                                data-id="<?php echo $tour['id']; ?>" 
                                                data-name="<?php echo htmlspecialchars($tour['name']); ?>" 
                                                data-price="<?php echo $tour['price']; ?>"
                                                data-dates="<?php echo htmlspecialchars($tour['available_dates']); ?>"
                                                data-max="<?php echo $tour['max_participants']; ?>">
                                            Book This Tour
                                        </button>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="empty-message">
                                <p>No tours are currently available. Please check back later.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <div class="testimonials-container">
            <div class="section-title">
                <h2>What Our Clients Say</h2>
                <p>Hear from those who have experienced our spiritual services</p>
            </div>
            
            <div class="testimonial-slider">
                <div class="testimonial-slide" style="display: block;">
                    <p class="testimonial-quote">My consultation with Swami Anandji was truly transformative. His wisdom and guidance have helped me find clarity in the most difficult times of my life.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="<?php echo IMAGES_URL; ?>testimonials/testimonial-1.jpg" alt="Priya Sharma" onerror="this.src='<?php echo IMAGES_URL; ?>user-placeholder.jpg'">
                        </div>
                        <div class="author-info">
                            <h4 class="author-name">Priya Sharma</h4>
                            <p class="author-title">IT Professional, Bangalore</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-slide">
                    <p class="testimonial-quote">The Varanasi Sacred Journey was a life-changing experience. The spiritual energy of the place combined with the knowledgeable guide made it unforgettable.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="<?php echo IMAGES_URL; ?>testimonials/testimonial-2.jpg" alt="Rajesh Khanna" onerror="this.src='<?php echo IMAGES_URL; ?>user-placeholder.jpg'">
                        </div>
                        <div class="author-info">
                            <h4 class="author-name">Rajesh Khanna</h4>
                            <p class="author-title">Business Owner, Mumbai</p>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-slide">
                    <p class="testimonial-quote">Acharya Priya's insights into the Bhagavad Gita helped me navigate through a challenging phase of my career with resilience and clarity.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="<?php echo IMAGES_URL; ?>testimonials/testimonial-3.jpg" alt="Amit Verma" onerror="this.src='<?php echo IMAGES_URL; ?>user-placeholder.jpg'">
                        </div>
                        <div class="author-info">
                            <h4 class="author-name">Amit Verma</h4>
                            <p class="author-title">Professor, Delhi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <div class="faq-container">
                <div class="section-title">
                    <h2>Frequently Asked Questions</h2>
                    <p>Find answers to common questions about our spiritual services</p>
                </div>
                
                <div class="accordion">
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="accordion-title">How do online consultations with spiritual guides work?</h3>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>After booking, you'll receive a confirmation email with a link to a secure video conferencing platform. At the scheduled time, you'll connect with your guide for a private consultation. You can discuss your concerns, ask questions, and receive guidance tailored to your situation.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="accordion-title">What should I prepare before a spiritual consultation?</h3>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>It's helpful to reflect on specific questions or areas of your life where you seek guidance. Find a quiet, private space for your consultation, and consider having a journal nearby to take notes. Come with an open mind and heart to receive the maximum benefit from your session.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="accordion-title">Can I reschedule or cancel my booking?</h3>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>Yes, you can reschedule or cancel your booking. For consultations, please provide at least 24 hours notice for rescheduling. For tours, our cancellation policy allows full refunds up to 7 days before the tour date, and 50% refund between 3-7 days. Please contact our support team for assistance with rescheduling or cancellations.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="accordion-title">What does a spiritual tour include?</h3>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>Our spiritual tours include expert guidance, transportation between sites, accommodation if applicable, and entrance fees to temples or sacred places. Some tours may include meditation sessions, yoga classes, or participation in traditional rituals. Each tour description provides specific details about what's included.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <div class="accordion-header">
                            <h3 class="accordion-title">How are the spiritual guides selected?</h3>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p>Our spiritual guides undergo a rigorous selection process that evaluates their expertise, experience, and commitment to ethical practice. We verify their credentials, assess their communication skills, and collect feedback from previous clients. We only partner with guides who demonstrate a genuine dedication to supporting others on their spiritual journey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Priest Booking Modal -->
    <div id="priest-booking-modal" class="booking-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Book a Consultation</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="priest-booking-form" method="post" action="spirituality.php">
                    <input type="hidden" name="action" value="create_priest_order">
                    <input type="hidden" id="priest-id" name="priest_id">
                    <input type="hidden" id="priest-name" name="priest_name">
                    <input type="hidden" id="priest-rate" name="priest_rate">
                    
                    <div class="booking-form">
                        <div class="form-group">
                            <label for="customer_name">Your Name</label>
                            <input type="text" id="customer_name" name="customer_name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="customer_email">Email Address</label>
                            <input type="email" id="customer_email" name="customer_email" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="customer_phone">Phone Number</label>
                            <input type="tel" id="customer_phone" name="customer_phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="priest-consultation-duration">Consultation Duration</label>
                            <select id="priest-consultation-duration" name="duration" class="form-control" required>
                                <option value="30">30 minutes</option>
                                <option value="60" selected>1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="priest-booking-date">Date</label>
                            <input type="date" id="priest-booking-date" name="booking_date" class="form-control" required min="<?php echo date('Y-m-d'); ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="priest-booking-time">Time</label>
                            <input type="time" id="priest-booking-time" name="booking_time" class="form-control" required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="notes">Special Requests or Questions</label>
                            <textarea id="notes" name="notes" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    
                    <div class="booking-summary">
                        <h3 class="summary-title">Booking Summary</h3>
                        
                        <div class="summary-item">
                            <span class="summary-label">Guide:</span>
                            <span class="summary-value" id="summary-priest-name"></span>
                        </div>
                        
                        <div class="summary-item">
                            <span class="summary-label">Duration:</span>
                            <span class="summary-value" id="summary-duration">1 hour</span>
                        </div>
                        
                        <div class="summary-item">
                            <span class="summary-label">Date & Time:</span>
                            <span class="summary-value" id="summary-datetime">-</span>
                        </div>
                        
                        <div class="summary-item summary-total">
                            <span class="summary-label">Total Amount:</span>
                            <span class="summary-value" id="summary-amount">₹0.00</span>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="submit" class="book-btn">Proceed to Payment</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Tour Booking Modal -->
    <div id="tour-booking-modal" class="booking-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Book a Spiritual Tour</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="tour-booking-form" method="post" action="spirituality.php">
                    <input type="hidden" name="action" value="create_tour_order">
                    <input type="hidden" id="tour-id" name="tour_id">
                    <input type="hidden" id="tour-name" name="tour_name">
                    <input type="hidden" id="tour-price" name="tour_price">
                    
                    <div class="booking-form">
                        <div class="form-group">
                            <label for="customer-name-tour">Your Name</label>
                            <input type="text" id="customer-name-tour" name="customer_name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="customer-email-tour">Email Address</label>
                            <input type="email" id="customer-email-tour" name="customer_email" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="customer-phone-tour">Phone Number</label>
                            <input type="tel" id="customer-phone-tour" name="customer_phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="tour-date">Tour Date</label>
                            <select id="tour-date" name="booking_date" class="form-control" required>
                                <option value="">Select Date</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="tour-participants">Number of Participants</label>
                            <select id="tour-participants" name="participants" class="form-control" required>
                                <option value="1">1 person</option>
                            </select>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="tour-notes">Special Requests or Questions</label>
                            <textarea id="tour-notes" name="notes" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    
                    <div class="booking-summary">
                        <h3 class="summary-title">Booking Summary</h3>
                        
                        <div class="summary-item">
                            <span class="summary-label">Tour:</span>
                            <span class="summary-value" id="summary-tour-name"></span>
                        </div>
                        
                        <div class="summary-item">
                            <span class="summary-label">Date:</span>
                            <span class="summary-value" id="summary-tour-date">-</span>
                        </div>
                        
                        <div class="summary-item">
                            <span class="summary-label">Participants:</span>
                            <span class="summary-value" id="summary-participants">1 person</span>
                        </div>
                        
                        <div class="summary-item summary-total">
                            <span class="summary-label">Total Amount:</span>
                            <span class="summary-value" id="summary-tour-amount">₹0.00</span>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="submit" class="book-btn">Proceed to Payment</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Toast Notification -->
    <div id="toast" class="toast-notification">
        <i class="fas fa-info-circle toast-icon"></i>
        <span class="toast-message">Notification message</span>
    </div>
    
    <!-- Include Footer -->
    <?php include VIEWS_PATH . 'includes/footer.php'; ?>
    
    <!-- Page Scripts -->
    <script src="<?php echo SITE_URL; ?>/js/spirituality.js"></script>
    <script src="<?php echo SITE_URL; ?>/js/razorpay-config.js"></script>
    
    <script>
        // Additional JavaScript for Accordion
        document.addEventListener('DOMContentLoaded', function() {
            const accordionItems = document.querySelectorAll('.accordion-item');
            
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                
                header.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            });
            
            // Tab scroll functionality
            const tabScrollLinks = document.querySelectorAll('.tab-scroll');
            
            tabScrollLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const tabId = link.getAttribute('data-tab');
                    
                    // Activate corresponding tab
                    document.querySelectorAll('.tab-button').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('data-tab') === tabId) {
                            btn.classList.add('active');
                        }
                    });
                    
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('active');
                    });
                    
                    document.getElementById(`${tabId}-tab`).classList.add('active');
                    
                    // Scroll to tabs section
                    const tabsSection = document.querySelector('.spirituality-tabs');
                    tabsSection.scrollIntoView({ behavior: 'smooth' });
                });
            });
        });
    </script>
</body>
</html>
