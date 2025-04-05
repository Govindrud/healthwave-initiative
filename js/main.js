document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Handle slider initialization if it exists on the page
    initSliders();
    
    // Initialize tabs if they exist on the page
    initTabs();
    
    // Initialize modal functionality
    initModals();
});

// Function to initialize all sliders on the page
function initSliders() {
    // This is handled by the specific slider.js file
    // Only keeping this here for potential future expansion
}

// Function to initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Deactivate all tabs and buttons
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-pane').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Activate the selected tab and button
                button.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
}

// Function to initialize modals
function initModals() {
    // Priest booking modal
    const priestBookingTriggers = document.querySelectorAll('.book-priest-btn');
    const priestBookingModal = document.getElementById('priest-booking-modal');
    
    if (priestBookingTriggers.length > 0 && priestBookingModal) {
        // Initialize modal events
        priestBookingTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get priest details
                const priestId = this.getAttribute('data-id');
                const priestName = this.getAttribute('data-name');
                const priestRate = this.getAttribute('data-rate');
                
                // Set values in modal
                document.getElementById('priest-id').value = priestId;
                document.getElementById('priest-name').value = priestName;
                document.getElementById('priest-rate').value = priestRate;
                document.getElementById('summary-priest-name').textContent = priestName;
                document.getElementById('summary-amount').textContent = `₹${priestRate}`;
                
                // Show modal
                priestBookingModal.style.display = 'flex';
            });
        });
        
        // Close modal when clicking the close button
        const closeBtn = priestBookingModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                priestBookingModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        priestBookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // Update summary when duration changes
        const durationSelect = document.getElementById('priest-consultation-duration');
        if (durationSelect) {
            durationSelect.addEventListener('change', function() {
                const duration = parseInt(this.value);
                const rate = parseInt(document.getElementById('priest-rate').value);
                const totalAmount = (duration / 60) * rate;
                
                document.getElementById('summary-duration').textContent = `${duration} minutes`;
                document.getElementById('summary-amount').textContent = `₹${totalAmount}`;
            });
        }
        
        // Update booking datetime summary
        const bookingDate = document.getElementById('priest-booking-date');
        const bookingTime = document.getElementById('priest-booking-time');
        
        if (bookingDate && bookingTime) {
            const updateDateTime = function() {
                const date = bookingDate.value;
                const time = bookingTime.value;
                
                if (date && time) {
                    const formattedDate = new Date(date + 'T' + time).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById('summary-datetime').textContent = formattedDate;
                    
                    // Combine date and time for form submission
                    const combinedDateTime = date + ' ' + time;
                    const hiddenDateTimeField = document.querySelector('input[name="booking_datetime"]');
                    if (!hiddenDateTimeField) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'booking_datetime';
                        input.value = combinedDateTime;
                        document.getElementById('priest-booking-form').appendChild(input);
                    } else {
                        hiddenDateTimeField.value = combinedDateTime;
                    }
                }
            };
            
            bookingDate.addEventListener('change', updateDateTime);
            bookingTime.addEventListener('change', updateDateTime);
        }
    }
    
    // Tour booking modal
    const tourBookingTriggers = document.querySelectorAll('.book-tour-btn');
    const tourBookingModal = document.getElementById('tour-booking-modal');
    
    if (tourBookingTriggers.length > 0 && tourBookingModal) {
        // Initialize modal events
        tourBookingTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get tour details
                const tourId = this.getAttribute('data-id');
                const tourName = this.getAttribute('data-name');
                const tourPrice = this.getAttribute('data-price');
                const tourDates = this.getAttribute('data-dates').split(',');
                const maxParticipants = parseInt(this.getAttribute('data-max'));
                
                // Set values in modal
                document.getElementById('tour-id').value = tourId;
                document.getElementById('tour-name').value = tourName;
                document.getElementById('tour-price').value = tourPrice;
                document.getElementById('summary-tour-name').textContent = tourName;
                document.getElementById('summary-tour-amount').textContent = `₹${tourPrice}`;
                
                // Populate participants dropdown
                const participantsSelect = document.getElementById('tour-participants');
                participantsSelect.innerHTML = '';
                for (let i = 1; i <= maxParticipants; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i === 1 ? '1 Person' : `${i} People`;
                    participantsSelect.appendChild(option);
                }
                
                // Populate dates dropdown
                const dateSelect = document.getElementById('tour-date');
                dateSelect.innerHTML = '<option value="">Select Date</option>';
                
                tourDates.forEach(date => {
                    const formattedDate = new Date(date.trim()).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    const option = document.createElement('option');
                    option.value = date.trim();
                    option.textContent = formattedDate;
                    dateSelect.appendChild(option);
                });
                
                // Show modal
                tourBookingModal.style.display = 'flex';
            });
        });
        
        // Close modal when clicking the close button
        const closeBtn = tourBookingModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                tourBookingModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        tourBookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // Update summary when participants changes
        const participantsSelect = document.getElementById('tour-participants');
        if (participantsSelect) {
            participantsSelect.addEventListener('change', function() {
                const participants = parseInt(this.value);
                const price = parseInt(document.getElementById('tour-price').value);
                const totalAmount = participants * price;
                
                document.getElementById('summary-participants').textContent = participants === 1 ? '1 person' : `${participants} people`;
                document.getElementById('summary-tour-amount').textContent = `₹${totalAmount}`;
                
                // Update amount in hidden field
                const amountField = document.querySelector('input[name="amount"]');
                if (!amountField) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'amount';
                    input.value = totalAmount;
                    document.getElementById('tour-booking-form').appendChild(input);
                } else {
                    amountField.value = totalAmount;
                }
            });
        }
        
        // Update booking date summary
        const tourDate = document.getElementById('tour-date');
        if (tourDate) {
            tourDate.addEventListener('change', function() {
                const date = this.value;
                
                if (date) {
                    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                    document.getElementById('summary-tour-date').textContent = formattedDate;
                }
            });
        }
    }
}
