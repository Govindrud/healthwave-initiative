
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
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,500</span>
                  </div>
                  <button class="book-btn razorpay-payment-btn" data-amount="1500" data-product="Consultation with Dr. Sarah Johnson">Book Appointment</button>
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
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,300</span>
                  </div>
                  <button class="book-btn razorpay-payment-btn" data-amount="1300" data-product="Consultation with Dr. Michael Chen">Book Appointment</button>
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
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,400</span>
                  </div>
                  <button class="book-btn razorpay-payment-btn" data-amount="1400" data-product="Consultation with Dr. Amelia Rodriguez">Book Appointment</button>
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
                <div class="doctor-consultation">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation Fee:</span>
                    <span class="fee-amount">₹1,000</span>
                  </div>
                  <button class="book-btn razorpay-payment-btn" data-amount="1000" data-product="Consultation with Dr. James Wilson">Book Appointment</button>
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
      });
    </script>
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
  </body>
</html>
