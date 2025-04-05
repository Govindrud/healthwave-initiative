
<?php require_once 'includes/config.php'; ?>
<?php include 'includes/header.php'; ?>

<main>
    <section class="spirituality-header">
        <div class="container">
            <h1>Spiritual Journey</h1>
            <p>Explore our spiritual services and embark on a journey to inner peace and mental well-being through ancient wisdom and practices.</p>
        </div>
    </section>
    
    <div class="container">
        <div class="tabs">
            <button class="tab-button active" data-tab="priests">Spiritual Guidance</button>
            <button class="tab-button" data-tab="tours">Sacred Tours</button>
        </div>
        
        <div class="tab-pane active" id="priests-tab">
            <div class="section-header">
                <h2>Spiritual Consultations</h2>
                <p>Connect with our experienced spiritual guides for personal guidance</p>
            </div>
            
            <div class="priests-grid">
                <?php foreach($priests as $priest): ?>
                <div class="priest-card">
                    <img src="<?php echo $priest['image']; ?>" alt="<?php echo $priest['name']; ?>" class="priest-image">
                    <div class="priest-details">
                        <h3 class="priest-name"><?php echo $priest['name']; ?></h3>
                        <p class="priest-specialty"><?php echo $priest['specialty']; ?></p>
                        <p class="priest-description"><?php echo $priest['description']; ?></p>
                        <p class="priest-rate">₹<?php echo $priest['rate']; ?>/hr</p>
                        <button class="btn btn-primary book-priest-btn" 
                                data-id="<?php echo $priest['id']; ?>"
                                data-name="<?php echo $priest['name']; ?>"
                                data-rate="<?php echo $priest['rate']; ?>">
                            Book Consultation
                        </button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="tab-pane" id="tours-tab">
            <div class="section-header">
                <h2>Sacred Tours</h2>
                <p>Experience the spiritual energy of sacred sites with our guided tours</p>
            </div>
            
            <div class="tours-grid">
                <?php foreach($tours as $tour): ?>
                <div class="tour-card">
                    <img src="<?php echo $tour['image']; ?>" alt="<?php echo $tour['name']; ?>" class="tour-image">
                    <div class="tour-details">
                        <h3 class="tour-name"><?php echo $tour['name']; ?></h3>
                        <p class="tour-location">
                            <i class="fas fa-map-marker-alt"></i> <?php echo $tour['location']; ?>
                        </p>
                        <p class="tour-dates">
                            <strong>Available Dates:</strong> <?php echo implode(', ', explode(',', $tour['dates'])); ?>
                        </p>
                        <p class="tour-description"><?php echo $tour['description']; ?></p>
                        <p class="tour-price">₹<?php echo $tour['price']; ?> per person</p>
                        <button class="btn btn-primary book-tour-btn"
                                data-id="<?php echo $tour['id']; ?>"
                                data-name="<?php echo $tour['name']; ?>"
                                data-price="<?php echo $tour['price']; ?>"
                                data-dates="<?php echo $tour['dates']; ?>"
                                data-max="<?php echo $tour['max_participants']; ?>">
                            Book Tour
                        </button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    
    <section class="spirituality-testimonial">
        <div class="container">
            <div class="section-header">
                <h2>Spiritual Experiences</h2>
                <p>Hear from people who found peace through our spiritual services</p>
            </div>
            
            <div class="testimonial-slider">
                <?php foreach($testimonials as $index => $testimonial): ?>
                <div class="testimonial-slide <?php echo $index === 0 ? 'active' : ''; ?>">
                    <div class="testimonial-quote">
                        <?php echo $testimonial['message']; ?>
                    </div>
                    <div class="testimonial-author">
                        <img src="<?php echo $testimonial['avatar']; ?>" alt="<?php echo $testimonial['name']; ?>" class="testimonial-avatar">
                        <div class="author-details">
                            <h4><?php echo $testimonial['name']; ?></h4>
                            <p><?php echo $testimonial['location']; ?></p>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    
    <!-- Priest booking modal -->
    <div class="modal" id="priest-booking-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Spiritual Consultation</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="priest-booking-form" method="post">
                    <input type="hidden" name="action" value="create_priest_order">
                    <input type="hidden" name="priest_id" id="priest-id">
                    <input type="hidden" name="priest_name" id="priest-name">
                    <input type="hidden" name="priest_rate" id="priest-rate">
                    
                    <div class="form-group">
                        <label for="priest-consultation-duration">Consultation Duration</label>
                        <select class="form-control" id="priest-consultation-duration" name="duration" required>
                            <option value="30">30 minutes</option>
                            <option value="60" selected>60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">120 minutes</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="priest-booking-date">Select Date</label>
                        <input type="date" class="form-control" id="priest-booking-date" name="booking_date" required min="<?php echo date('Y-m-d'); ?>">
                    </div>
                    
                    <div class="form-group">
                        <label for="priest-booking-time">Select Time</label>
                        <input type="time" class="form-control" id="priest-booking-time" name="booking_time" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_name">Your Name</label>
                        <input type="text" class="form-control" name="customer_name" id="customer_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_email">Email Address</label>
                        <input type="email" class="form-control" name="customer_email" id="customer_email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_phone">Phone Number</label>
                        <input type="tel" class="form-control" name="customer_phone" id="customer_phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="special_requests">Special Requests (Optional)</label>
                        <textarea class="form-control" name="special_requests" id="special_requests" rows="3"></textarea>
                    </div>
                    
                    <div class="booking-summary">
                        <h4>Booking Summary</h4>
                        <div class="summary-row">
                            <span>Priest:</span>
                            <span id="summary-priest-name"></span>
                        </div>
                        <div class="summary-row">
                            <span>Duration:</span>
                            <span id="summary-duration">60 minutes</span>
                        </div>
                        <div class="summary-row">
                            <span>Date & Time:</span>
                            <span id="summary-datetime">Please select a date and time</span>
                        </div>
                        <div class="summary-row">
                            <span>Total Amount:</span>
                            <span id="summary-amount"></span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Tour booking modal -->
    <div class="modal" id="tour-booking-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Sacred Tour</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="tour-booking-form" method="post">
                    <input type="hidden" name="action" value="create_tour_order">
                    <input type="hidden" name="tour_id" id="tour-id">
                    <input type="hidden" name="tour_name" id="tour-name">
                    <input type="hidden" name="tour_price" id="tour-price">
                    
                    <div class="form-group">
                        <label for="tour-date">Select Tour Date</label>
                        <select class="form-control" id="tour-date" name="booking_date" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="tour-participants">Number of Participants</label>
                        <select class="form-control" id="tour-participants" name="participants" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_name">Your Name</label>
                        <input type="text" class="form-control" name="customer_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_email">Email Address</label>
                        <input type="email" class="form-control" name="customer_email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer_phone">Phone Number</label>
                        <input type="tel" class="form-control" name="customer_phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="special_requests">Special Requests (Optional)</label>
                        <textarea class="form-control" name="special_requests" rows="3"></textarea>
                    </div>
                    
                    <div class="booking-summary">
                        <h4>Booking Summary</h4>
                        <div class="summary-row">
                            <span>Tour:</span>
                            <span id="summary-tour-name"></span>
                        </div>
                        <div class="summary-row">
                            <span>Date:</span>
                            <span id="summary-tour-date">Please select a date</span>
                        </div>
                        <div class="summary-row">
                            <span>Participants:</span>
                            <span id="summary-participants">1 person</span>
                        </div>
                        <div class="summary-row">
                            <span>Total Amount:</span>
                            <span id="summary-tour-amount"></span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
