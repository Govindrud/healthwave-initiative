
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MeantToHelp | Consult with Doctors</title>
    <meta name="description" content="Consult with our experienced mental health professionals to support your mental wellbeing." />
    <meta name="author" content="MeantToHelp" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Razorpay SDK -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </head>

  <body>
    <?php include 'includes/header.php'; ?>

    <main>
      <section class="page-header">
        <div class="container">
          <h1>Consult with Doctors</h1>
          <p>Connect with our expert mental health professionals for personalized care and support.</p>
        </div>
      </section>
      
      <section class="doctors-listing">
        <div class="container">
          <div class="filter-section mb-6">
            <div class="filter-controls">
              <select class="filter-dropdown" id="specialization-filter">
                <option value="">All Specializations</option>
                <option value="psychiatrist">Psychiatrist</option>
                <option value="psychologist">Psychologist</option>
                <option value="therapist">Therapist</option>
                <option value="counselor">Counselor</option>
              </select>
              
              <select class="filter-dropdown" id="experience-filter">
                <option value="">All Experience Levels</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            
            <div class="search-box">
              <input type="text" id="doctor-search" placeholder="Search by name or keyword..." />
              <button type="button"><i class="fas fa-search"></i></button>
            </div>
          </div>
          
          <div class="doctors-grid">
            <!-- Doctor Card 1 -->
            <div class="doctor-card" data-specialization="psychiatrist" data-experience="15">
              <div class="doctor-image">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Dr. Sarah Johnson" />
              </div>
              <div class="doctor-info">
                <h3>Dr. Sarah Johnson</h3>
                <p class="doctor-title">Psychiatrist, MD</p>
                <div class="doctor-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                  <span>(4.8)</span>
                </div>
                <p class="doctor-experience"><i class="fas fa-briefcase"></i> 15 years experience</p>
                <p class="doctor-bio">Specializes in anxiety disorders, depression, and ADHD treatment with a compassionate, patient-centered approach.</p>
                
                <!-- Available time slots -->
                <div class="time-slots mt-3 mb-2">
                  <p class="time-slots-title mb-1"><i class="fas fa-calendar-alt"></i> Available Today:</p>
                  <div class="time-slots-container">
                    <button class="time-slot-btn" data-time="10:00 AM">10:00 AM</button>
                    <button class="time-slot-btn" data-time="02:30 PM">02:30 PM</button>
                    <button class="time-slot-btn" data-time="05:15 PM">05:15 PM</button>
                  </div>
                </div>
                
                <!-- Customer Info Form -->
                <div class="customer-info-toggle mt-2 mb-2">
                  <a href="#" class="show-customer-form">+ Add your contact information</a>
                  <div class="customer-info-form" style="display: none;">
                    <div class="form-group mt-2 mb-1">
                      <input type="text" name="customer_name" placeholder="Your Name" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="email" name="customer_email" placeholder="Your Email" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="tel" name="customer_phone" placeholder="Your Phone" class="form-control">
                    </div>
                  </div>
                </div>
                
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,500</span>
                  </div>
                  <button class="book-btn payment-btn" data-amount="1500" data-product="Consultation with Dr. Sarah Johnson">Book Appointment</button>
                </div>
              </div>
            </div>
            
            <!-- Doctor Card 2 -->
            <div class="doctor-card" data-specialization="psychologist" data-experience="8">
              <div class="doctor-image">
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Dr. Michael Chen" />
              </div>
              <div class="doctor-info">
                <h3>Dr. Michael Chen</h3>
                <p class="doctor-title">Clinical Psychologist, PhD</p>
                <div class="doctor-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <span>(4.9)</span>
                </div>
                <p class="doctor-experience"><i class="fas fa-briefcase"></i> 8 years experience</p>
                <p class="doctor-bio">Expert in cognitive behavioral therapy for stress, anxiety management, and trauma recovery.</p>
                
                <!-- Available time slots -->
                <div class="time-slots mt-3 mb-2">
                  <p class="time-slots-title mb-1"><i class="fas fa-calendar-alt"></i> Available Today:</p>
                  <div class="time-slots-container">
                    <button class="time-slot-btn" data-time="09:15 AM">09:15 AM</button>
                    <button class="time-slot-btn" data-time="12:45 PM">12:45 PM</button>
                    <button class="time-slot-btn" data-time="06:30 PM">06:30 PM</button>
                  </div>
                </div>
                
                <!-- Customer Info Form -->
                <div class="customer-info-toggle mt-2 mb-2">
                  <a href="#" class="show-customer-form">+ Add your contact information</a>
                  <div class="customer-info-form" style="display: none;">
                    <div class="form-group mt-2 mb-1">
                      <input type="text" name="customer_name" placeholder="Your Name" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="email" name="customer_email" placeholder="Your Email" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="tel" name="customer_phone" placeholder="Your Phone" class="form-control">
                    </div>
                  </div>
                </div>
                
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,300</span>
                  </div>
                  <button class="book-btn payment-btn" data-amount="1300" data-product="Consultation with Dr. Michael Chen">Book Appointment</button>
                </div>
              </div>
            </div>
            
            <!-- Doctor Card 3 -->
            <div class="doctor-card" data-specialization="therapist" data-experience="12">
              <div class="doctor-image">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Dr. Amelia Rodriguez" />
              </div>
              <div class="doctor-info">
                <h3>Dr. Amelia Rodriguez</h3>
                <p class="doctor-title">Family Therapist, LMFT</p>
                <div class="doctor-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <span>(4.2)</span>
                </div>
                <p class="doctor-experience"><i class="fas fa-briefcase"></i> 12 years experience</p>
                <p class="doctor-bio">Specializes in family dynamics, relationship counseling, and conflict resolution with a holistic approach.</p>
                
                <!-- Available time slots -->
                <div class="time-slots mt-3 mb-2">
                  <p class="time-slots-title mb-1"><i class="fas fa-calendar-alt"></i> Available Today:</p>
                  <div class="time-slots-container">
                    <button class="time-slot-btn" data-time="11:30 AM">11:30 AM</button>
                    <button class="time-slot-btn" data-time="03:45 PM">03:45 PM</button>
                    <button class="time-slot-btn" data-time="07:00 PM">07:00 PM</button>
                  </div>
                </div>
                
                <!-- Customer Info Form -->
                <div class="customer-info-toggle mt-2 mb-2">
                  <a href="#" class="show-customer-form">+ Add your contact information</a>
                  <div class="customer-info-form" style="display: none;">
                    <div class="form-group mt-2 mb-1">
                      <input type="text" name="customer_name" placeholder="Your Name" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="email" name="customer_email" placeholder="Your Email" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="tel" name="customer_phone" placeholder="Your Phone" class="form-control">
                    </div>
                  </div>
                </div>
                
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,400</span>
                  </div>
                  <button class="book-btn payment-btn" data-amount="1400" data-product="Consultation with Dr. Amelia Rodriguez">Book Appointment</button>
                </div>
              </div>
            </div>
            
            <!-- Doctor Card 4 -->
            <div class="doctor-card" data-specialization="counselor" data-experience="5">
              <div class="doctor-image">
                <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Dr. James Wilson" />
              </div>
              <div class="doctor-info">
                <h3>Dr. James Wilson</h3>
                <p class="doctor-title">Mental Health Counselor, LPC</p>
                <div class="doctor-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <span>(4.0)</span>
                </div>
                <p class="doctor-experience"><i class="fas fa-briefcase"></i> 5 years experience</p>
                <p class="doctor-bio">Focused on youth mental health, self-esteem issues, and academic stress management.</p>
                
                <!-- Available time slots -->
                <div class="time-slots mt-3 mb-2">
                  <p class="time-slots-title mb-1"><i class="fas fa-calendar-alt"></i> Available Today:</p>
                  <div class="time-slots-container">
                    <button class="time-slot-btn" data-time="08:30 AM">08:30 AM</button>
                    <button class="time-slot-btn" data-time="01:00 PM">01:00 PM</button>
                    <button class="time-slot-btn" data-time="04:30 PM">04:30 PM</button>
                  </div>
                </div>
                
                <!-- Customer Info Form -->
                <div class="customer-info-toggle mt-2 mb-2">
                  <a href="#" class="show-customer-form">+ Add your contact information</a>
                  <div class="customer-info-form" style="display: none;">
                    <div class="form-group mt-2 mb-1">
                      <input type="text" name="customer_name" placeholder="Your Name" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="email" name="customer_email" placeholder="Your Email" class="form-control">
                    </div>
                    <div class="form-group mb-1">
                      <input type="tel" name="customer_phone" placeholder="Your Phone" class="form-control">
                    </div>
                  </div>
                </div>
                
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,000</span>
                  </div>
                  <button class="book-btn payment-btn" data-amount="1000" data-product="Consultation with Dr. James Wilson">Book Appointment</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pagination-container">
            <div class="pagination">
              <a href="#" class="pagination-prev disabled"><i class="fas fa-chevron-left"></i></a>
              <a href="#" class="pagination-number active">1</a>
              <a href="#" class="pagination-number">2</a>
              <a href="#" class="pagination-number">3</a>
              <a href="#" class="pagination-next"><i class="fas fa-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- Toast notification for messages -->
    <div id="toast" class="toast-notification">
      <div class="toast-content">
        <i class="fas fa-info-circle toast-icon"></i>
        <div class="toast-message">This is a notification message</div>
        <button class="toast-close">&times;</button>
      </div>
    </div>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/razorpay.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Filter functionality
        const doctorCards = document.querySelectorAll('.doctor-card');
        const specializationFilter = document.getElementById('specialization-filter');
        const experienceFilter = document.getElementById('experience-filter');
        const searchInput = document.getElementById('doctor-search');
        
        function filterDoctors() {
          const specializationValue = specializationFilter.value;
          const experienceValue = experienceFilter.value;
          const searchValue = searchInput.value.toLowerCase();
          
          doctorCards.forEach(card => {
            const specialization = card.getAttribute('data-specialization');
            const experience = parseInt(card.getAttribute('data-experience'));
            const doctorName = card.querySelector('h3').textContent.toLowerCase();
            const doctorBio = card.querySelector('.doctor-bio').textContent.toLowerCase();
            
            let showBySpecialization = !specializationValue || specialization === specializationValue;
            let showByExperience = true;
            
            if (experienceValue) {
              if (experienceValue === '0-5') {
                showByExperience = experience >= 0 && experience <= 5;
              } else if (experienceValue === '5-10') {
                showByExperience = experience > 5 && experience <= 10;
              } else if (experienceValue === '10+') {
                showByExperience = experience > 10;
              }
            }
            
            const showBySearch = !searchValue || 
                               doctorName.includes(searchValue) || 
                               doctorBio.includes(searchValue);
            
            if (showBySpecialization && showByExperience && showBySearch) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        }
        
        specializationFilter.addEventListener('change', filterDoctors);
        experienceFilter.addEventListener('change', filterDoctors);
        searchInput.addEventListener('input', filterDoctors);
        
        // Time slot selection
        const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
        
        timeSlotButtons.forEach(button => {
          button.addEventListener('click', function() {
            // Remove active class from all buttons in this doctor card
            const parentCard = this.closest('.doctor-card');
            parentCard.querySelectorAll('.time-slot-btn').forEach(btn => {
              btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store selected time in data attribute for payment processing
            const bookButton = parentCard.querySelector('.book-btn');
            const doctorName = parentCard.querySelector('h3').textContent;
            const selectedTime = this.getAttribute('data-time');
            const today = new Date().toLocaleDateString();
            
            bookButton.setAttribute('data-datetime', `${today} at ${selectedTime}`);
            
            // Create or update hidden span for selected date/time
            let dateTimeElement = parentCard.querySelector('.selected-date-time');
            if (!dateTimeElement) {
              dateTimeElement = document.createElement('span');
              dateTimeElement.className = 'selected-date-time';
              dateTimeElement.style.display = 'none';
              parentCard.appendChild(dateTimeElement);
            }
            dateTimeElement.textContent = `${today} at ${selectedTime}`;
          });
        });
        
        // Customer info form toggling
        const showFormLinks = document.querySelectorAll('.show-customer-form');
        
        showFormLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle customer info form
            const form = this.nextElementSibling;
            if (form.style.display === 'none' || !form.style.display) {
              form.style.display = 'block';
              this.textContent = '- Hide contact information';
            } else {
              form.style.display = 'none';
              this.textContent = '+ Add your contact information';
            }
          });
        });
        
        // Pagination functionality
        const paginationNumbers = document.querySelectorAll('.pagination-number');
        
        paginationNumbers.forEach(num => {
          num.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all numbers
            paginationNumbers.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked number
            this.classList.add('active');
            
            // Here you would normally load the appropriate page of doctors
            // For now, we'll just simulate by scrolling to top
            window.scrollTo({
              top: document.querySelector('.doctors-listing').offsetTop - 100,
              behavior: 'smooth'
            });
          });
        });
        
        // Toast close button
        const toastCloseBtn = document.querySelector('.toast-close');
        if (toastCloseBtn) {
          toastCloseBtn.addEventListener('click', function() {
            document.getElementById('toast').classList.remove('show');
          });
        }
      });
    </script>
  </body>
</html>
