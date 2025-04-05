
<?php
$pageSpecificCSS = 'spirituality.css';
$pageSpecificJS = 'spirituality.js';
?>

<?php include 'includes/header.php'; ?>

<div class="spirituality-hero-section">
    <div class="container">
        <div class="spirituality-hero-content">
            <h1 class="font-playfair">Spiritual Well-being</h1>
            <p>Connect with spiritual guides and explore sacred journeys to enhance your mental well-being</p>
            <div class="hero-buttons">
                <a href="#priests-section" class="btn btn-primary">Consult with Priests</a>
                <a href="#tours-section" class="btn btn-outline">Explore Sacred Tours</a>
            </div>
        </div>
    </div>
</div>

<div class="container section-padding">
    <div class="spirituality-tabs">
        <div class="tab-buttons">
            <button class="tab-button active" data-tab="priests">Spiritual Guides</button>
            <button class="tab-button" data-tab="tours">Sacred Tours</button>
        </div>
        
        <div class="tab-content">
            <div id="priests-tab" class="tab-pane active">
                <div class="section-header text-center mb-5">
                    <h2 class="font-playfair">Connect with Spiritual Guides</h2>
                    <p>Our network of experienced priests and spiritual guides can provide guidance and perform rituals</p>
                </div>
                
                <div class="priests-grid">
                    <?php if(empty($priests)): ?>
                        <div class="empty-state">
                            <i class="fas fa-user-tie fa-4x mb-3"></i>
                            <h3>No spiritual guides available</h3>
                            <p>Please check back soon as we expand our network of spiritual guides.</p>
                        </div>
                    <?php else: ?>
                        <?php foreach($priests as $priest): ?>
                            <div class="priest-card">
                                <div class="priest-image">
                                    <img src="<?php echo !empty($priest['image']) ? $priest['image'] : '/images/priest-placeholder.jpg'; ?>" alt="<?php echo $priest['name']; ?>">
                                    <div class="priest-rating">
                                        <i class="fas fa-star"></i> <?php echo number_format($priest['rating'], 1); ?>
                                    </div>
                                </div>
                                <div class="priest-info">
                                    <h3><?php echo $priest['name']; ?></h3>
                                    <div class="priest-expertise"><?php echo $priest['expertise']; ?></div>
                                    <div class="priest-description"><?php echo $priest['description']; ?></div>
                                    <div class="priest-details">
                                        <p><i class="fas fa-user-clock"></i> <?php echo $priest['experience']; ?> years experience</p>
                                        <p><i class="fas fa-map-marker-alt"></i> <?php echo $priest['location']; ?></p>
                                        <p><i class="fas fa-language"></i> <?php echo $priest['languages']; ?></p>
                                    </div>
                                    <div class="priest-booking">
                                        <p class="priest-rate">₹<?php echo $priest['hourly_rate']; ?>/hour</p>
                                        <button class="book-priest-btn" 
                                            data-id="<?php echo $priest['id']; ?>" 
                                            data-name="<?php echo $priest['name']; ?>" 
                                            data-rate="<?php echo $priest['hourly_rate']; ?>">
                                            Book Consultation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            
            <div id="tours-tab" class="tab-pane">
                <div class="section-header text-center mb-5">
                    <h2 class="font-playfair">Sacred Tours and Pilgrimages</h2>
                    <p>Explore spiritual destinations with our guided tours designed to promote mental well-being</p>
                </div>
                
                <div class="tours-grid">
                    <?php if(empty($tours)): ?>
                        <div class="empty-state">
                            <i class="fas fa-mountain fa-4x mb-3"></i>
                            <h3>No tours available</h3>
                            <p>Please check back soon as we add spiritual journeys to our offerings.</p>
                        </div>
                    <?php else: ?>
                        <?php foreach($tours as $tour): ?>
                            <div class="tour-card">
                                <div class="tour-image">
                                    <img src="<?php echo !empty($tour['image']) ? $tour['image'] : '/images/tour-placeholder.jpg'; ?>" alt="<?php echo $tour['name']; ?>">
                                    <div class="tour-duration">
                                        <i class="fas fa-clock"></i> <?php echo $tour['duration']; ?>
                                    </div>
                                </div>
                                <div class="tour-info">
                                    <h3><?php echo $tour['name']; ?></h3>
                                    <div class="tour-location">
                                        <i class="fas fa-map-marker-alt"></i> <?php echo $tour['location']; ?>
                                    </div>
                                    <div class="tour-description"><?php echo $tour['description']; ?></div>
                                    <div class="tour-details">
                                        <p><i class="fas fa-calendar-alt"></i> Available dates: <?php echo implode(', ', array_map(function($date) use ($controller) { 
                                            return $controller->formatDate($date); 
                                        }, explode(',', $tour['available_dates']))); ?></p>
                                        <p><i class="fas fa-users"></i> Max <?php echo $tour['max_participants']; ?> participants</p>
                                    </div>
                                    <div class="tour-booking">
                                        <p class="tour-price">₹<?php echo $tour['price']; ?> per person</p>
                                        <button class="book-tour-btn" 
                                            data-id="<?php echo $tour['id']; ?>" 
                                            data-name="<?php echo $tour['name']; ?>" 
                                            data-price="<?php echo $tour['price']; ?>"
                                            data-dates="<?php echo $tour['available_dates']; ?>"
                                            data-max="<?php echo $tour['max_participants']; ?>">
                                            Book Tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Testimonials Section -->
<section class="testimonials-section">
    <div class="container">
        <div class="section-title">
            <h2>What Our Clients Say</h2>
            <p>Hear from people who have experienced spiritual transformation with us</p>
        </div>
        
        <div class="testimonials-slider">
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <span class="testimonial-quote">"</span>
                    <p>The spiritual guidance I received completely changed my perspective on life. I found inner peace that I had been searching for.</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="/images/user-placeholder.jpg" alt="User">
                        </div>
                        <div class="author-info">
                            <h4>Priya Sharma</h4>
                            <p>Delhi</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <span class="testimonial-quote">"</span>
                    <p>The Varanasi spiritual tour was life-changing. The rituals and meditations helped me overcome my anxiety that medications couldn't fix.</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="/images/user-placeholder.jpg" alt="User">
                        </div>
                        <div class="author-info">
                            <h4>Rajesh Kumar</h4>
                            <p>Mumbai</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <span class="testimonial-quote">"</span>
                    <p>I was going through a difficult time in my life, and the guidance from Pandit Sharma gave me clarity and strength to move forward.</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="/images/user-placeholder.jpg" alt="User">
                        </div>
                        <div class="author-info">
                            <h4>Anita Desai</h4>
                            <p>Bangalore</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Booking Modal for Priests -->
<div id="priest-booking-modal" class="booking-modal">
    <div class="booking-modal-content">
        <div class="booking-modal-header">
            <h3>Book Spiritual Consultation</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="booking-modal-body">
            <form action="/spirituality.php" method="POST" id="priest-booking-form">
                <input type="hidden" name="action" value="create_priest_order">
                <input type="hidden" name="priest_id" id="priest-id">
                <input type="hidden" name="priest_name" id="priest-name">
                <input type="hidden" name="priest_rate" id="priest-rate">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer_name">Your Name</label>
                        <input type="text" class="form-control" id="customer_name" name="customer_name" required>
                    </div>
                    <div class="form-group">
                        <label for="customer_email">Email</label>
                        <input type="email" class="form-control" id="customer_email" name="customer_email" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer_phone">Phone Number</label>
                        <input type="tel" class="form-control" id="customer_phone" name="customer_phone" required>
                    </div>
                    <div class="form-group">
                        <label for="priest-consultation-duration">Consultation Duration</label>
                        <select class="form-control" id="priest-consultation-duration" name="duration" required>
                            <option value="30">30 Minutes</option>
                            <option value="60" selected>1 Hour</option>
                            <option value="90">1.5 Hours</option>
                            <option value="120">2 Hours</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="priest-booking-date">Preferred Date</label>
                        <input type="date" class="form-control" id="priest-booking-date" name="booking_date" required min="<?php echo date('Y-m-d'); ?>">
                    </div>
                    <div class="form-group">
                        <label for="priest-booking-time">Preferred Time</label>
                        <input type="time" class="form-control" id="priest-booking-time" name="booking_time" required>
                    </div>
                </div>
                
                <div class="form-group full-width">
                    <label for="special_requests">Special Requests or Questions</label>
                    <textarea class="form-control" id="special_requests" name="special_requests" rows="3"></textarea>
                </div>
                
                <div class="booking-summary">
                    <h4>Booking Summary</h4>
                    <div class="summary-item">
                        <span class="summary-label">Spiritual Guide:</span>
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
                    <div class="summary-item total">
                        <span class="summary-label">Total Amount:</span>
                        <span class="summary-value" id="summary-amount"></span>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="submit" class="book-btn">Proceed to Payment</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Booking Modal for Tours -->
<div id="tour-booking-modal" class="booking-modal">
    <div class="booking-modal-content">
        <div class="booking-modal-header">
            <h3>Book Sacred Tour</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="booking-modal-body">
            <form action="/spirituality.php" method="POST" id="tour-booking-form">
                <input type="hidden" name="action" value="create_tour_order">
                <input type="hidden" name="tour_id" id="tour-id">
                <input type="hidden" name="tour_name" id="tour-name">
                <input type="hidden" name="tour_price" id="tour-price">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tour_customer_name">Your Name</label>
                        <input type="text" class="form-control" id="tour_customer_name" name="customer_name" required>
                    </div>
                    <div class="form-group">
                        <label for="tour_customer_email">Email</label>
                        <input type="email" class="form-control" id="tour_customer_email" name="customer_email" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tour_customer_phone">Phone Number</label>
                        <input type="tel" class="form-control" id="tour_customer_phone" name="customer_phone" required>
                    </div>
                    <div class="form-group">
                        <label for="tour-participants">Number of Participants</label>
                        <select class="form-control" id="tour-participants" name="participants" required>
                            <option value="1">1 Person</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tour-date">Tour Date</label>
                        <select class="form-control" id="tour-date" name="booking_date" required>
                            <option value="">Select Date</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group full-width">
                    <label for="tour_special_requests">Special Requests or Questions</label>
                    <textarea class="form-control" id="tour_special_requests" name="special_requests" rows="3"></textarea>
                </div>
                
                <div class="booking-summary">
                    <h4>Booking Summary</h4>
                    <div class="summary-item">
                        <span class="summary-label">Tour:</span>
                        <span class="summary-value" id="summary-tour-name"></span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Participants:</span>
                        <span class="summary-value" id="summary-participants">1 person</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Date:</span>
                        <span class="summary-value" id="summary-tour-date">-</span>
                    </div>
                    <div class="summary-item total">
                        <span class="summary-label">Total Amount:</span>
                        <span class="summary-value" id="summary-tour-amount"></span>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="submit" class="book-btn">Proceed to Payment</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
