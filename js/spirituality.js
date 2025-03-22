
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Book Priest Buttons
  const bookPriestButtons = document.querySelectorAll('.book-priest-btn');
  const priestBookingModal = document.getElementById('priest-booking-modal');
  const priestBookingForm = document.getElementById('priest-booking-form');
  
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
      
      // Show modal
      priestBookingModal.style.display = 'flex';
    });
  });
  
  // Book Tour Buttons
  const bookTourButtons = document.querySelectorAll('.book-tour-btn');
  const tourBookingModal = document.getElementById('tour-booking-modal');
  const tourBookingForm = document.getElementById('tour-booking-form');
  
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
      
      // Show modal
      tourBookingModal.style.display = 'flex';
    });
  });
  
  // Close modal buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      priestBookingModal.style.display = 'none';
      tourBookingModal.style.display = 'none';
    });
  });
  
  // Close modal on clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === priestBookingModal) {
      priestBookingModal.style.display = 'none';
    }
    if (event.target === tourBookingModal) {
      tourBookingModal.style.display = 'none';
    }
  });
  
  // Update Priest Booking Summary
  function updatePriestBookingSummary() {
    const priestRate = parseFloat(document.getElementById('priest-rate').value);
    const duration = parseInt(document.getElementById('priest-consultation-duration').value);
    const bookingDate = document.getElementById('priest-booking-date').value;
    const bookingTime = document.getElementById('priest-booking-time').value;
    const hourlyRate = priestRate;
    
    // Calculate total amount
    const totalAmount = hourlyRate * (duration / 60);
    
    // Update duration summary
    document.getElementById('summary-duration').textContent = duration === 60 ? '1 hour' :
                                                             duration === 30 ? '30 minutes' :
                                                             duration === 90 ? '1.5 hours' :
                                                             duration === 120 ? '2 hours' : `${duration} minutes`;
    
    // Update datetime summary
    if (bookingDate && bookingTime) {
      const formattedDate = new Date(bookingDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById('summary-datetime').textContent = `${formattedDate}, ${bookingTime}`;
    } else {
      document.getElementById('summary-datetime').textContent = '-';
    }
    
    // Update amount
    document.getElementById('summary-amount').textContent = `₹${totalAmount.toFixed(2)}`;
  }
  
  // Update Tour Booking Summary
  function updateTourBookingSummary() {
    const tourPrice = parseFloat(document.getElementById('tour-price').value);
    const participants = parseInt(document.getElementById('tour-participants').value || 1);
    const tourDate = document.getElementById('tour-date').value;
    
    // Calculate total amount
    const totalAmount = tourPrice * participants;
    
    // Update participants summary
    document.getElementById('summary-participants').textContent = participants === 1 ? '1 person' : `${participants} people`;
    
    // Update date summary
    if (tourDate) {
      const formattedDate = new Date(tourDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById('summary-tour-date').textContent = formattedDate;
    } else {
      document.getElementById('summary-tour-date').textContent = '-';
    }
    
    // Update amount
    document.getElementById('summary-tour-amount').textContent = `₹${totalAmount.toFixed(2)}`;
  }
  
  // Event listeners for form inputs
  document.getElementById('priest-consultation-duration').addEventListener('change', updatePriestBookingSummary);
  document.getElementById('priest-booking-date').addEventListener('change', updatePriestBookingSummary);
  document.getElementById('priest-booking-time').addEventListener('change', updatePriestBookingSummary);
  
  document.getElementById('tour-participants').addEventListener('change', updateTourBookingSummary);
  document.getElementById('tour-date').addEventListener('change', updateTourBookingSummary);
  
  // Handle booking form submissions
  priestBookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const priestId = document.getElementById('priest-id').value;
    const priestName = document.getElementById('priest-name').value;
    const priestRate = document.getElementById('priest-rate').value;
    const customerName = document.getElementById('priest-customer-name').value;
    const customerEmail = document.getElementById('priest-customer-email').value;
    const customerPhone = document.getElementById('priest-customer-phone').value;
    const bookingDate = document.getElementById('priest-booking-date').value;
    const bookingTime = document.getElementById('priest-booking-time').value;
    const duration = document.getElementById('priest-consultation-duration').value;
    const consultationMode = document.querySelector('input[name="consultation_mode"]:checked').value;
    const notes = document.getElementById('priest-booking-notes').value;
    
    // Calculate total amount
    const totalAmount = (parseFloat(priestRate) * parseInt(duration)) / 60;
    
    // Format booking datetime
    const formattedDate = new Date(bookingDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const bookingDatetime = `${formattedDate}, ${bookingTime}`;
    
    // Generate order ID
    const orderId = 'PRIEST_' + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    // Create payment data
    const paymentData = {
      amount: totalAmount,
      productName: `Consultation with ${priestName}`,
      orderId: orderId,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      datetime: bookingDatetime,
      duration: duration,
      consultationMode: consultationMode,
      notes: notes,
      priestId: priestId
    };
    
    // Close the modal
    priestBookingModal.style.display = 'none';
    
    // Initiate payment using Razorpay
    initiatePayment(paymentData, 'consultation');
  });
  
  tourBookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tourId = document.getElementById('tour-id').value;
    const tourName = document.getElementById('tour-name').value;
    const tourPrice = document.getElementById('tour-price').value;
    const customerName = document.getElementById('tour-customer-name').value;
    const customerEmail = document.getElementById('tour-customer-email').value;
    const customerPhone = document.getElementById('tour-customer-phone').value;
    const tourDate = document.getElementById('tour-date').value;
    const participants = document.getElementById('tour-participants').value;
    const notes = document.getElementById('tour-booking-notes').value;
    
    // Calculate total amount
    const totalAmount = parseFloat(tourPrice) * parseInt(participants);
    
    // Format booking date
    const formattedDate = new Date(tourDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Generate order ID
    const orderId = 'TOUR_' + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    // Create payment data
    const paymentData = {
      amount: totalAmount,
      productName: tourName,
      orderId: orderId,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      datetime: formattedDate,
      participants: participants,
      notes: notes,
      tourId: tourId
    };
    
    // Close the modal
    tourBookingModal.style.display = 'none';
    
    // Initiate payment using Razorpay
    initiatePayment(paymentData, 'tour');
  });
  
  // Function to initiate payment
  function initiatePayment(paymentData, serviceType) {
    // Show payment options modal from razorpay.js
    showPaymentOptions(
      paymentData.amount, 
      paymentData.productName, 
      paymentData.orderId, 
      'consultation', 
      paymentData.customerName, 
      paymentData.customerEmail, 
      paymentData.customerPhone, 
      paymentData.datetime,
      paymentData);
  }
  
  // Testimonials Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Initialize slider
  showSlide(currentSlide);
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Helper function to show toast messages (Using existing toast from Razorpay JS)
  window.showToast = function(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    if (toast && toastMessage) {
      // Set message
      toastMessage.textContent = message;
      
      // Set icon based on type
      if (toastIcon) {
        toastIcon.className = 'fas toast-icon';
        switch(type) {
          case 'success':
            toastIcon.classList.add('fa-check-circle');
            toast.className = 'toast-notification toast-success';
            break;
          case 'error':
            toastIcon.classList.add('fa-exclamation-circle');
            toast.className = 'toast-notification toast-error';
            break;
          case 'warning':
            toastIcon.classList.add('fa-exclamation-triangle');
            toast.className = 'toast-notification toast-warning';
            break;
          default:
            toastIcon.classList.add('fa-info-circle');
            toast.className = 'toast-notification toast-info';
        }
      }
      
      // Show toast
      toast.classList.add('show');
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  };
});

// Function to handle payment options (extending the functionality in razorpay.js)
function showPaymentOptions(amount, productName, orderId, transactionType, customerName, customerEmail, customerPhone, datetime, additionalData) {
  // Check if the function exists in razorpay.js
  if (typeof window.showPaymentOptions === 'function') {
    // Call the function from razorpay.js
    window.showPaymentOptions(amount, productName, orderId, transactionType, customerName, customerEmail, customerPhone, datetime);
  } else {
    console.error('showPaymentOptions function not found. Make sure razorpay.js is loaded correctly.');
  }
}
