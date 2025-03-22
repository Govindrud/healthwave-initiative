
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Spiritual Services - MeantToHelp</title>
    <meta name="description" content="Connect with spiritual priests and embark on sacred tours to enhance your spiritual journey." />
    <meta name="author" content="MeantToHelp" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/spirituality.css">
    
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
      <section class="spirituality-hero-section">
        <div class="container">
          <div class="spirituality-hero-content">
            <span class="badge">Spiritual Guidance</span>
            <h1 class="font-playfair">Nurture Your <span class="gradient-text">Spiritual Journey</span></h1>
            <p>Connect with experienced spiritual guides and explore sacred destinations for inner peace and growth.</p>
          </div>
        </div>
      </section>

      <!-- Spiritual Services Tabs -->
      <section class="spirituality-services-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">Our Services</span>
            <h2 class="font-playfair">Spiritual <span class="gradient-text">Offerings</span></h2>
            <p>Choose from our range of spiritual services designed to support your inner journey.</p>
          </div>
          
          <div class="spirituality-tabs">
            <div class="tab-buttons">
              <button class="tab-button active" data-tab="priests">Spiritual Guides</button>
              <button class="tab-button" data-tab="tours">Sacred Tours</button>
            </div>
            
            <div class="tab-content">
              <!-- Spiritual Guides Tab -->
              <div class="tab-pane active" id="priests-tab">
                <div class="priests-grid">
                  <?php
                    // Database connection
                    $db_host = 'localhost';
                    $db_user = 'root';
                    $db_pass = '';
                    $db_name = 'meantohelp';
                    
                    // Create connection
                    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
                    
                    // Check connection
                    if ($conn->connect_error) {
                      echo "<p class='error-message'>Could not connect to the database. Please try again later.</p>";
                    } else {
                      // Fetch priests data
                      $sql = "SELECT * FROM spiritual_priests ORDER BY rating DESC";
                      $result = $conn->query($sql);
                      
                      if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                          echo '<div class="priest-card">';
                          echo '<div class="priest-image">';
                          
                          if (!empty($row['image']) && file_exists('images/priests/' . $row['image'])) {
                            echo '<img src="images/priests/' . $row['image'] . '" alt="' . $row['name'] . '" />';
                          } else {
                            echo '<img src="images/priest-placeholder.jpg" alt="' . $row['name'] . '" onerror="this.src=\'https://via.placeholder.com/300x300?text=Spiritual+Guide\'" />';
                          }
                          
                          echo '<span class="priest-rating"><i class="fas fa-star"></i> ' . $row['rating'] . '</span>';
                          echo '</div>';
                          echo '<div class="priest-info">';
                          echo '<h3>' . $row['name'] . '</h3>';
                          echo '<p class="priest-expertise">' . $row['expertise'] . '</p>';
                          echo '<p class="priest-description">' . $row['description'] . '</p>';
                          echo '<div class="priest-details">';
                          echo '<p><i class="fas fa-clock"></i> ' . $row['availability'] . '</p>';
                          echo '<p><i class="fas fa-history"></i> ' . $row['experience_years'] . ' years experience</p>';
                          echo '</div>';
                          echo '<div class="priest-booking">';
                          echo '<p class="priest-rate">₹' . number_format($row['hourly_rate']) . '/hour</p>';
                          echo '<button class="book-priest-btn" data-id="' . $row['id'] . '" data-name="' . $row['name'] . '" data-rate="' . $row['hourly_rate'] . '">Book Consultation</button>';
                          echo '</div>';
                          echo '</div>';
                          echo '</div>';
                        }
                      } else {
                        echo "<p class='no-results'>No spiritual guides available at the moment. Please check back later.</p>";
                      }
                    }
                  ?>
                </div>
              </div>
              
              <!-- Sacred Tours Tab -->
              <div class="tab-pane" id="tours-tab">
                <div class="tours-grid">
                  <?php
                    if (!$conn->connect_error) {
                      // Fetch tours data
                      $sql = "SELECT * FROM spiritual_tours ORDER BY price";
                      $result = $conn->query($sql);
                      
                      if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                          echo '<div class="tour-card">';
                          echo '<div class="tour-image">';
                          
                          if (!empty($row['image']) && file_exists('images/tours/' . $row['image'])) {
                            echo '<img src="images/tours/' . $row['image'] . '" alt="' . $row['name'] . '" />';
                          } else {
                            echo '<img src="images/tour-placeholder.jpg" alt="' . $row['name'] . '" onerror="this.src=\'https://via.placeholder.com/800x500?text=Spiritual+Tour\'" />';
                          }
                          
                          echo '<span class="tour-duration"><i class="fas fa-clock"></i> ' . $row['duration'] . '</span>';
                          echo '</div>';
                          echo '<div class="tour-info">';
                          echo '<h3>' . $row['name'] . '</h3>';
                          echo '<p class="tour-location"><i class="fas fa-map-marker-alt"></i> ' . $row['location'] . '</p>';
                          echo '<p class="tour-description">' . $row['description'] . '</p>';
                          echo '<div class="tour-details">';
                          echo '<p><i class="fas fa-users"></i> Max ' . $row['max_participants'] . ' participants</p>';
                          
                          // Convert available dates to array and format them
                          $dates = explode(',', $row['available_dates']);
                          $formatted_dates = array();
                          foreach ($dates as $date) {
                            $formatted_dates[] = date('d M Y', strtotime($date));
                          }
                          echo '<p><i class="fas fa-calendar"></i> Next date: ' . reset($formatted_dates) . '</p>';
                          
                          echo '</div>';
                          echo '<div class="tour-booking">';
                          echo '<p class="tour-price">₹' . number_format($row['price']) . '/person</p>';
                          echo '<button class="book-tour-btn" data-id="' . $row['id'] . '" data-name="' . $row['name'] . '" data-price="' . $row['price'] . '" data-dates="' . $row['available_dates'] . '" data-max="' . $row['max_participants'] . '">Book Tour</button>';
                          echo '</div>';
                          echo '</div>';
                          echo '</div>';
                        }
                      } else {
                        echo "<p class='no-results'>No tours available at the moment. Please check back later.</p>";
                      }
                      
                      // Close connection
                      $conn->close();
                    }
                  ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <span class="badge">Testimonials</span>
            <h2 class="font-playfair">What Our <span class="gradient-text">Clients Say</span></h2>
            <p>Read about the experiences of those who have embarked on spiritual journeys with us.</p>
          </div>
          
          <div class="testimonials-slider">
            <div class="testimonial-slide">
              <div class="testimonial-content">
                <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                <p>The consultation with Swami Anandji was truly transformative. His wisdom and guidance helped me navigate a difficult phase in my life with clarity and purpose.</p>
                <div class="testimonial-author">
                  <div class="author-avatar">
                    <img src="images/testimonials/user1.jpg" alt="Rajiv Sharma" onerror="this.src='https://via.placeholder.com/50x50?text=RS'" />
                  </div>
                  <div class="author-info">
                    <h4>Rajiv Sharma</h4>
                    <p>Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="testimonial-slide">
              <div class="testimonial-content">
                <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                <p>The Varanasi Sacred Journey was beyond words. The spiritual energy of the place combined with the knowledgeable guides made it an unforgettable experience that has deepened my spiritual practice.</p>
                <div class="testimonial-author">
                  <div class="author-avatar">
                    <img src="images/testimonials/user2.jpg" alt="Priya Desai" onerror="this.src='https://via.placeholder.com/50x50?text=PD'" />
                  </div>
                  <div class="author-info">
                    <h4>Priya Desai</h4>
                    <p>Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="testimonial-slide">
              <div class="testimonial-content">
                <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                <p>Acharya Priya's insights into the Bhagavad Gita have completely changed how I approach life's challenges. Her ability to make ancient wisdom relevant to modern problems is remarkable.</p>
                <div class="testimonial-author">
                  <div class="author-avatar">
                    <img src="images/testimonials/user3.jpg" alt="Amar Singh" onerror="this.src='https://via.placeholder.com/50x50?text=AS'" />
                  </div>
                  <div class="author-info">
                    <h4>Amar Singh</h4>
                    <p>Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Booking Modal - Priests -->
    <div class="booking-modal" id="priest-booking-modal">
      <div class="booking-modal-content">
        <div class="booking-modal-header">
          <h3>Book a Spiritual Consultation</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="booking-modal-body">
          <form id="priest-booking-form">
            <input type="hidden" id="priest-id" name="priest_id">
            <input type="hidden" id="priest-name" name="priest_name">
            <input type="hidden" id="priest-rate" name="priest_rate">
            
            <div class="form-group">
              <label for="priest-customer-name">Your Name</label>
              <input type="text" id="priest-customer-name" name="customer_name" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="priest-customer-email">Email</label>
                <input type="email" id="priest-customer-email" name="customer_email" required>
              </div>
              <div class="form-group">
                <label for="priest-customer-phone">Phone</label>
                <input type="tel" id="priest-customer-phone" name="customer_phone" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="priest-booking-date">Preferred Date</label>
                <input type="date" id="priest-booking-date" name="booking_date" required min="<?php echo date('Y-m-d'); ?>">
              </div>
              <div class="form-group">
                <label for="priest-booking-time">Preferred Time</label>
                <select id="priest-booking-time" name="booking_time" required>
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="priest-consultation-duration">Duration</label>
                <select id="priest-consultation-duration" name="duration" required>
                  <option value="30">30 minutes</option>
                  <option value="60" selected>1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              <div class="form-group">
                <label>Consultation Mode</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" name="consultation_mode" value="video" checked>
                    <span>Video Call</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" name="consultation_mode" value="audio">
                    <span>Audio Call</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="priest-booking-notes">Special Requests or Questions</label>
              <textarea id="priest-booking-notes" name="notes" rows="3"></textarea>
            </div>
            
            <div class="booking-summary">
              <h4>Booking Summary</h4>
              <div class="summary-item">
                <span>Spiritual Guide:</span>
                <span id="summary-priest-name">-</span>
              </div>
              <div class="summary-item">
                <span>Date & Time:</span>
                <span id="summary-datetime">-</span>
              </div>
              <div class="summary-item">
                <span>Duration:</span>
                <span id="summary-duration">1 hour</span>
              </div>
              <div class="summary-item total">
                <span>Total Amount:</span>
                <span id="summary-amount">₹0</span>
              </div>
            </div>
            
            <button type="submit" class="proceed-payment-btn">Proceed to Payment</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Booking Modal - Tours -->
    <div class="booking-modal" id="tour-booking-modal">
      <div class="booking-modal-content">
        <div class="booking-modal-header">
          <h3>Book a Spiritual Tour</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="booking-modal-body">
          <form id="tour-booking-form">
            <input type="hidden" id="tour-id" name="tour_id">
            <input type="hidden" id="tour-name" name="tour_name">
            <input type="hidden" id="tour-price" name="tour_price">
            
            <div class="form-group">
              <label for="tour-customer-name">Your Name</label>
              <input type="text" id="tour-customer-name" name="customer_name" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="tour-customer-email">Email</label>
                <input type="email" id="tour-customer-email" name="customer_email" required>
              </div>
              <div class="form-group">
                <label for="tour-customer-phone">Phone</label>
                <input type="tel" id="tour-customer-phone" name="customer_phone" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="tour-date">Tour Date</label>
                <select id="tour-date" name="tour_date" required>
                  <option value="">Select Date</option>
                  <!-- Dates will be populated by JavaScript -->
                </select>
              </div>
              <div class="form-group">
                <label for="tour-participants">Number of Participants</label>
                <select id="tour-participants" name="participants" required>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <!-- More options will be added by JavaScript based on max participants -->
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="tour-booking-notes">Special Requests or Questions</label>
              <textarea id="tour-booking-notes" name="notes" rows="3"></textarea>
            </div>
            
            <div class="booking-summary">
              <h4>Booking Summary</h4>
              <div class="summary-item">
                <span>Tour:</span>
                <span id="summary-tour-name">-</span>
              </div>
              <div class="summary-item">
                <span>Date:</span>
                <span id="summary-tour-date">-</span>
              </div>
              <div class="summary-item">
                <span>Participants:</span>
                <span id="summary-participants">1 person</span>
              </div>
              <div class="summary-item total">
                <span>Total Amount:</span>
                <span id="summary-tour-amount">₹0</span>
              </div>
            </div>
            
            <button type="submit" class="proceed-payment-btn">Proceed to Payment</button>
          </form>
        </div>
      </div>
    </div>

    <?php include 'includes/footer.php'; ?>

    <!-- Toast Notification -->
    <div id="toast" class="toast-notification">
      <div class="toast-content">
        <i class="fas fa-info-circle toast-icon"></i>
        <span class="toast-message">Message goes here</span>
      </div>
      <div class="toast-progress"></div>
    </div>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/spirituality.js"></script>
    <script src="js/razorpay.js"></script>
  </body>
</html>
