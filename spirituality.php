
<?php
// Include configuration file
require_once 'includes/config.php';

// Controller logic for spirituality page
class SpiritualityController {
    private $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function getPriests() {
        $priests = [];
        $sql = "SELECT * FROM spiritual_priests ORDER BY rating DESC";
        $result = $this->conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $priests[] = $row;
            }
        }
        
        return $priests;
    }
    
    public function getTours() {
        $tours = [];
        $sql = "SELECT * FROM spiritual_tours ORDER BY price";
        $result = $this->conn->query($sql);
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $tours[] = $row;
            }
        }
        
        return $tours;
    }
    
    public function formatDate($date) {
        return date('d M Y', strtotime($date));
    }
}

// Instantiate controller
$controller = new SpiritualityController($conn);

// Get data
$priests = $controller->getPriests();
$tours = $controller->getTours();

// Check if we need to handle form submission (API endpoint logic)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');
    
    switch ($_POST['action']) {
        case 'create_priest_order':
            // Process priest booking request
            $response = processPriestBooking($_POST);
            echo json_encode($response);
            exit;
            
        case 'create_tour_order':
            // Process tour booking request
            $response = processTourBooking($_POST);
            echo json_encode($response);
            exit;
            
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
            exit;
    }
}

// Helper function to process priest booking
function processPriestBooking($data) {
    global $conn;
    
    try {
        // Generate a unique order ID
        $orderId = 'PRIEST_' . uniqid();
        
        // Insert booking into database
        $stmt = $conn->prepare("INSERT INTO priest_bookings 
            (order_id, priest_id, customer_name, customer_email, customer_phone, 
            booking_datetime, duration_minutes, amount, payment_method, payment_status, booking_status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Razorpay', 'pending', 'scheduled', ?)");
        
        $stmt->bind_param(
            "ssssssdss",
            $orderId,
            $data['priest_id'],
            $data['customer_name'],
            $data['customer_email'],
            $data['customer_phone'],
            $data['booking_datetime'],
            $data['duration'],
            $data['amount'],
            $data['notes']
        );
        
        if ($stmt->execute()) {
            return [
                'status' => 'success',
                'order_id' => $orderId,
                'amount' => $data['amount'],
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'message' => 'Booking created successfully'
            ];
        } else {
            return ['status' => 'error', 'message' => 'Database error: ' . $stmt->error];
        }
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error: ' . $e->getMessage()];
    }
}

// Helper function to process tour booking
function processTourBooking($data) {
    global $conn;
    
    try {
        // Generate a unique order ID
        $orderId = 'TOUR_' . uniqid();
        
        // Insert booking into database
        $stmt = $conn->prepare("INSERT INTO tour_bookings 
            (order_id, tour_id, customer_name, customer_email, customer_phone, 
            booking_date, participants, amount, payment_method, payment_status, booking_status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Razorpay', 'pending', 'confirmed', ?)");
        
        $stmt->bind_param(
            "ssssssdss",
            $orderId,
            $data['tour_id'],
            $data['customer_name'],
            $data['customer_email'],
            $data['customer_phone'],
            $data['booking_date'],
            $data['participants'],
            $data['amount'],
            $data['notes']
        );
        
        if ($stmt->execute()) {
            return [
                'status' => 'success',
                'order_id' => $orderId,
                'amount' => $data['amount'],
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'message' => 'Tour booking created successfully'
            ];
        } else {
            return ['status' => 'error', 'message' => 'Database error: ' . $stmt->error];
        }
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error: ' . $e->getMessage()];
    }
}
?>

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
                  <?php if (empty($priests)): ?>
                    <p class="no-results">No spiritual guides available at the moment. Please check back later.</p>
                  <?php else: ?>
                    <?php foreach ($priests as $priest): ?>
                      <div class="priest-card">
                        <div class="priest-image">
                          <?php if (!empty($priest['image']) && file_exists('images/priests/' . $priest['image'])): ?>
                            <img src="images/priests/<?php echo $priest['image']; ?>" alt="<?php echo $priest['name']; ?>" />
                          <?php else: ?>
                            <img src="images/priest-placeholder.jpg" alt="<?php echo $priest['name']; ?>" onerror="this.src='https://via.placeholder.com/300x300?text=Spiritual+Guide'" />
                          <?php endif; ?>
                          <span class="priest-rating"><i class="fas fa-star"></i> <?php echo $priest['rating']; ?></span>
                        </div>
                        <div class="priest-info">
                          <h3><?php echo $priest['name']; ?></h3>
                          <p class="priest-expertise"><?php echo $priest['expertise']; ?></p>
                          <p class="priest-description"><?php echo $priest['description']; ?></p>
                          <div class="priest-details">
                            <p><i class="fas fa-clock"></i> <?php echo $priest['availability']; ?></p>
                            <p><i class="fas fa-history"></i> <?php echo $priest['experience_years']; ?> years experience</p>
                          </div>
                          <div class="priest-booking">
                            <p class="priest-rate">₹<?php echo number_format($priest['hourly_rate']); ?>/hour</p>
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
              
              <!-- Sacred Tours Tab -->
              <div class="tab-pane" id="tours-tab">
                <div class="tours-grid">
                  <?php if (empty($tours)): ?>
                    <p class="no-results">No tours available at the moment. Please check back later.</p>
                  <?php else: ?>
                    <?php foreach ($tours as $tour): ?>
                      <div class="tour-card">
                        <div class="tour-image">
                          <?php if (!empty($tour['image']) && file_exists('images/tours/' . $tour['image'])): ?>
                            <img src="images/tours/<?php echo $tour['image']; ?>" alt="<?php echo $tour['name']; ?>" />
                          <?php else: ?>
                            <img src="images/tour-placeholder.jpg" alt="<?php echo $tour['name']; ?>" onerror="this.src='https://via.placeholder.com/800x500?text=Spiritual+Tour'" />
                          <?php endif; ?>
                          <span class="tour-duration"><i class="fas fa-clock"></i> <?php echo $tour['duration']; ?></span>
                        </div>
                        <div class="tour-info">
                          <h3><?php echo $tour['name']; ?></h3>
                          <p class="tour-location"><i class="fas fa-map-marker-alt"></i> <?php echo $tour['location']; ?></p>
                          <p class="tour-description"><?php echo $tour['description']; ?></p>
                          <div class="tour-details">
                            <p><i class="fas fa-users"></i> Max <?php echo $tour['max_participants']; ?> participants</p>
                            <?php 
                              $dates = explode(',', $tour['available_dates']);
                              $formatted_dates = [];
                              foreach ($dates as $date) {
                                $formatted_dates[] = $controller->formatDate($date);
                              }
                            ?>
                            <p><i class="fas fa-calendar"></i> Next date: <?php echo reset($formatted_dates); ?></p>
                          </div>
                          <div class="tour-booking">
                            <p class="tour-price">₹<?php echo number_format($tour['price']); ?>/person</p>
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
            <input type="hidden" name="action" value="create_priest_order">
            
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
            <input type="hidden" name="action" value="create_tour_order">
            
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
                <select id="tour-date" name="booking_date" required>
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
    <script src="js/razorpay-config.js"></script>
  </body>
</html>
