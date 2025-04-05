
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality with smoother transitions
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => {
        pane.style.opacity = 0;
        setTimeout(() => {
          pane.classList.remove('active');
        }, 300);
      });
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      const activeTab = document.getElementById(`${tabId}-tab`);
      
      setTimeout(() => {
        activeTab.classList.add('active');
        setTimeout(() => {
          activeTab.style.opacity = 1;
        }, 10);
      }, 300);
    });
  });
  
  // Initialize tab panes with opacity
  tabPanes.forEach(pane => {
    if(pane.classList.contains('active')) {
      pane.style.opacity = 1;
    } else {
      pane.style.opacity = 0;
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if(target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Book Priest Buttons with improved modal handling
  const bookPriestButtons = document.querySelectorAll('.book-priest-btn');
  const priestBookingModal = document.getElementById('priest-booking-modal');
  
  if(bookPriestButtons.length > 0 && priestBookingModal) {
    bookPriestButtons.forEach(button => {
      button.addEventListener('click', () => {
        const priestId = button.getAttribute('data-id');
        const priestName = button.getAttribute('data-name');
        const priestRate = button.getAttribute('data-rate');
        
        // Set hidden input values
        document.getElementById('priest-id').value = priestId;
        document.getElementById('priest-name').value = priestName;
        document.getElementById('priest-rate').value = priestRate;
        
        // Update summary
        document.getElementById('summary-priest-name').textContent = priestName;
        updatePriestBookingSummary();
        
        // Show modal with animation
        priestBookingModal.style.display = 'flex';
        setTimeout(() => {
          priestBookingModal.style.opacity = 1;
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 10);
      });
    });
  }
  
  // Book Tour Buttons with improved modal handling
  const bookTourButtons = document.querySelectorAll('.book-tour-btn');
  const tourBookingModal = document.getElementById('tour-booking-modal');
  
  if(bookTourButtons.length > 0 && tourBookingModal) {
    bookTourButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tourId = button.getAttribute('data-id');
        const tourName = button.getAttribute('data-name');
        const tourPrice = button.getAttribute('data-price');
        const tourDates = button.getAttribute('data-dates').split(',');
        const maxParticipants = parseInt(button.getAttribute('data-max'));
        
        // Set hidden input values
        document.getElementById('tour-id').value = tourId;
        document.getElementById('tour-name').value = tourName;
        document.getElementById('tour-price').value = tourPrice;
        
        // Update summary
        document.getElementById('summary-tour-name').textContent = tourName;
        
        // Populate dates dropdown
        const tourDateSelect = document.getElementById('tour-date');
        tourDateSelect.innerHTML = '<option value="">Select Date</option>';
        
        tourDates.forEach(date => {
          const option = document.createElement('option');
          const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          option.value = date;
          option.textContent = formattedDate;
          tourDateSelect.appendChild(option);
        });
        
        // Populate participants dropdown based on max
        const participantsSelect = document.getElementById('tour-participants');
        participantsSelect.innerHTML = '';
        
        for (let i = 1; i <= maxParticipants; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i === 1 ? '1 person' : `${i} people`;
          participantsSelect.appendChild(option);
        }
        
        updateTourBookingSummary();
        
        // Show modal with animation
        tourBookingModal.style.display = 'flex';
        setTimeout(() => {
          tourBookingModal.style.opacity = 1;
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 10);
      });
    });
  }
  
  // Close modal buttons with smooth transitions
  const closeButtons = document.querySelectorAll('.close-modal');
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeAllModals();
    });
  });
  
  // Close modal on clicking outside with smooth transitions
  window.addEventListener('click', (event) => {
    if (event.target === priestBookingModal || event.target === tourBookingModal) {
      closeAllModals();
    }
  });
  
  // Close modals with ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
  
  function closeAllModals() {
    const modals = document.querySelectorAll('.booking-modal');
    modals.forEach(modal => {
      modal.style.opacity = 0;
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }, 300);
    });
  }
  
  // Update Priest Booking Summary with better formatting
  function updatePriestBookingSummary() {
    const priestRate = parseFloat(document.getElementById('priest-rate').value);
    const duration = parseInt(document.getElementById('priest-consultation-duration').value);
    const bookingDate = document.getElementById('priest-booking-date').value;
    const bookingTime = document.getElementById('priest-booking-time').value;
    const hourlyRate = priestRate;
    
    // Calculate total amount
    const totalAmount = hourlyRate * (duration / 60);
    
    // Format currency with commas for thousands
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(totalAmount);
    
    // Update duration summary
    document.getElementById('summary-duration').textContent = 
      duration === 60 ? '1 hour' :
      duration === 30 ? '30 minutes' :
      duration === 90 ? '1.5 hours' :
      duration === 120 ? '2 hours' : `${duration} minutes`;
    
    // Update datetime summary with better formatting
    if (bookingDate && bookingTime) {
      const dateObj = new Date(bookingDate);
      const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Convert 24h time to 12h format
      const timeArray = bookingTime.split(':');
      let hours = parseInt(timeArray[0]);
      const minutes = timeArray[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)
      const formattedTime = `${hours}:${minutes} ${ampm}`;
      
      document.getElementById('summary-datetime').textContent = `${formattedDate}, ${formattedTime}`;
    } else {
      document.getElementById('summary-datetime').textContent = '-';
    }
    
    // Update amount
    document.getElementById('summary-amount').textContent = formattedAmount;
  }
  
  // Update Tour Booking Summary with better formatting
  function updateTourBookingSummary() {
    const tourPrice = parseFloat(document.getElementById('tour-price').value);
    const participants = parseInt(document.getElementById('tour-participants').value || 1);
    const tourDate = document.getElementById('tour-date').value;
    
    // Calculate total amount
    const totalAmount = tourPrice * participants;
    
    // Format currency with commas for thousands
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(totalAmount);
    
    // Update participants summary
    document.getElementById('summary-participants').textContent = participants === 1 ? '1 person' : `${participants} people`;
    
    // Update date summary with better formatting
    if (tourDate) {
      const dateObj = new Date(tourDate);
      const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById('summary-tour-date').textContent = formattedDate;
    } else {
      document.getElementById('summary-tour-date').textContent = '-';
    }
    
    // Update amount
    document.getElementById('summary-tour-amount').textContent = formattedAmount;
  }
  
  // Event listeners for form inputs with debouncing for better performance
  const priestConsultationDuration = document.getElementById('priest-consultation-duration');
  const priestBookingDate = document.getElementById('priest-booking-date');
  const priestBookingTime = document.getElementById('priest-booking-time');
  
  if(priestConsultationDuration && priestBookingDate && priestBookingTime) {
    const debounce = (func, delay) => {
      let timeoutId;
      return function(...args) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    
    const debouncedUpdatePriestSummary = debounce(updatePriestBookingSummary, 300);
    
    priestConsultationDuration.addEventListener('change', debouncedUpdatePriestSummary);
    priestBookingDate.addEventListener('change', debouncedUpdatePriestSummary);
    priestBookingTime.addEventListener('input', debouncedUpdatePriestSummary);
  }
  
  const tourParticipants = document.getElementById('tour-participants');
  const tourDate = document.getElementById('tour-date');
  
  if(tourParticipants && tourDate) {
    const debounce = (func, delay) => {
      let timeoutId;
      return function(...args) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    
    const debouncedUpdateTourSummary = debounce(updateTourBookingSummary, 300);
    
    tourParticipants.addEventListener('change', debouncedUpdateTourSummary);
    tourDate.addEventListener('change', debouncedUpdateTourSummary);
  }
  
  // Form Validation
  const priestBookingForm = document.getElementById('priest-booking-form');
  const tourBookingForm = document.getElementById('tour-booking-form');
  
  if(priestBookingForm) {
    priestBookingForm.addEventListener('submit', function(e) {
      const requiredFields = this.querySelectorAll('[required]');
      let valid = true;
      
      requiredFields.forEach(field => {
        if (!field.value) {
          valid = false;
          showInputError(field, 'This field is required');
        } else {
          removeInputError(field);
        }
      });
      
      if (!valid) {
        e.preventDefault();
      }
    });
  }
  
  if(tourBookingForm) {
    tourBookingForm.addEventListener('submit', function(e) {
      const requiredFields = this.querySelectorAll('[required]');
      let valid = true;
      
      requiredFields.forEach(field => {
        if (!field.value) {
          valid = false;
          showInputError(field, 'This field is required');
        } else {
          removeInputError(field);
        }
      });
      
      if (!valid) {
        e.preventDefault();
      }
    });
  }
  
  function showInputError(input, message) {
    // Remove any existing error message
    removeInputError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    // Insert error message after input
    input.parentNode.appendChild(errorElement);
  }
  
  function removeInputError(input) {
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove error message if exists
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  // Focus first input in modals when they open
  const priestModal = document.getElementById('priest-booking-modal');
  const tourModal = document.getElementById('tour-booking-modal');
  
  if(priestModal) {
    priestModal.addEventListener('transitionend', function(e) {
      if (this.style.opacity === '1') {
        const firstInput = this.querySelector('input:not([type="hidden"])');
        if (firstInput) {
          firstInput.focus();
        }
      }
    });
  }
  
  if(tourModal) {
    tourModal.addEventListener('transitionend', function(e) {
      if (this.style.opacity === '1') {
        const firstInput = this.querySelector('input:not([type="hidden"])');
        if (firstInput) {
          firstInput.focus();
        }
      }
    });
  }
  
  // Testimonials Slider with smooth transitions
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  
  if(slides.length > 0) {
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Initialize slider
    showSlide(currentSlide);
    
    // Auto-advance slides every 6 seconds
    setInterval(nextSlide, 6000);
  }
});
