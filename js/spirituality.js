
document.addEventListener('DOMContentLoaded', function() {
    // Enable tab functionality for spirituality page
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Hide all tab panes
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show the corresponding tab pane
                document.getElementById(tabId + '-tab').classList.add('active');
            });
        });
    }
    
    // Priest booking form handling
    const priestBookingForm = document.getElementById('priest-booking-form');
    if (priestBookingForm) {
        priestBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const customerName = this.querySelector('input[name="customer_name"]').value;
            const customerEmail = this.querySelector('input[name="customer_email"]').value;
            const customerPhone = this.querySelector('input[name="customer_phone"]').value;
            const bookingDate = this.querySelector('input[name="booking_date"]').value;
            const bookingTime = this.querySelector('input[name="booking_time"]').value;
            
            if (!customerName || !customerEmail || !customerPhone || !bookingDate || !bookingTime) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(customerEmail)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation
            if (!validatePhone(customerPhone)) {
                showToast('Please enter a valid phone number', 'error');
                return;
            }
            
            // Calculate total amount
            const rate = parseInt(this.querySelector('input[name="priest_rate"]').value);
            const duration = parseInt(this.querySelector('select[name="duration"]').value);
            const totalAmount = (duration / 60) * rate;
            
            // Submit form via AJAX
            const formData = new FormData(this);
            
            fetch(window.location.pathname, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Close modal
                    document.getElementById('priest-booking-modal').style.display = 'none';
                    
                    // Initialize Razorpay payment
                    initializeRazorpayPayment(
                        data.order_id,
                        data.amount,
                        `Consultation with ${data.customer_name}`,
                        data.customer_name,
                        data.customer_email,
                        data.customer_phone
                    );
                } else {
                    showToast(data.message || 'An error occurred', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('An error occurred. Please try again.', 'error');
            });
        });
    }
    
    // Tour booking form handling
    const tourBookingForm = document.getElementById('tour-booking-form');
    if (tourBookingForm) {
        tourBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const customerName = this.querySelector('input[name="customer_name"]').value;
            const customerEmail = this.querySelector('input[name="customer_email"]').value;
            const customerPhone = this.querySelector('input[name="customer_phone"]').value;
            const bookingDate = this.querySelector('select[name="booking_date"]').value;
            const participants = this.querySelector('select[name="participants"]').value;
            
            if (!customerName || !customerEmail || !customerPhone || !bookingDate || !participants) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(customerEmail)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation
            if (!validatePhone(customerPhone)) {
                showToast('Please enter a valid phone number', 'error');
                return;
            }
            
            // Submit form via AJAX
            const formData = new FormData(this);
            
            fetch(window.location.pathname, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Close modal
                    document.getElementById('tour-booking-modal').style.display = 'none';
                    
                    // Initialize Razorpay payment
                    initializeRazorpayPayment(
                        data.order_id,
                        data.amount,
                        `Tour booking for ${data.customer_name}`,
                        data.customer_name,
                        data.customer_email,
                        data.customer_phone
                    );
                } else {
                    showToast(data.message || 'An error occurred', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('An error occurred. Please try again.', 'error');
            });
        });
    }
    
    // Initialize booking modals
    const priestBookingTriggers = document.querySelectorAll('.book-priest-btn');
    const priestBookingModal = document.getElementById('priest-booking-modal');
    
    if (priestBookingTriggers.length > 0 && priestBookingModal) {
        priestBookingTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                // Get priest details
                const priestId = this.getAttribute('data-id');
                const priestName = this.getAttribute('data-name');
                const priestRate = this.getAttribute('data-rate');
                
                // Set values in modal
                document.getElementById('priest-id').value = priestId;
                document.getElementById('priest-name').value = priestName;
                document.getElementById('priest-rate').value = priestRate;
                document.getElementById('summary-priest-name').textContent = priestName;
                document.getElementById('summary-amount').textContent = `₹${priestRate}/hr`;
                
                // Show modal
                priestBookingModal.style.display = 'flex';
            });
        });
        
        // Close modal button
        const closeBtn = priestBookingModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                priestBookingModal.style.display = 'none';
            });
        }
        
        // Close when clicking outside
        priestBookingModal.addEventListener('click', function(e) {
            if (e.target === priestBookingModal) {
                priestBookingModal.style.display = 'none';
            }
        });
        
        // Update summary when duration changes
        const durationSelect = document.getElementById('priest-consultation-duration');
        if (durationSelect) {
            durationSelect.addEventListener('change', function() {
                updatePriestSummary();
            });
        }
        
        // Update booking datetime summary
        const bookingDate = document.getElementById('priest-booking-date');
        const bookingTime = document.getElementById('priest-booking-time');
        
        if (bookingDate && bookingTime) {
            bookingDate.addEventListener('change', updatePriestSummary);
            bookingTime.addEventListener('change', updatePriestSummary);
        }
    }
    
    function updatePriestSummary() {
        const durationSelect = document.getElementById('priest-consultation-duration');
        const bookingDate = document.getElementById('priest-booking-date');
        const bookingTime = document.getElementById('priest-booking-time');
        const rate = parseFloat(document.getElementById('priest-rate').value);
        
        // Update duration
        const duration = parseInt(durationSelect.value);
        document.getElementById('summary-duration').textContent = `${duration} minutes`;
        
        // Calculate and update amount
        const totalAmount = (duration / 60) * rate;
        document.getElementById('summary-amount').textContent = `₹${totalAmount}`;
        
        // Update datetime if both date and time are selected
        if (bookingDate.value && bookingTime.value) {
            try {
                const dateTimeStr = `${bookingDate.value}T${bookingTime.value}`;
                const dateObj = new Date(dateTimeStr);
                
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                
                const formattedDateTime = dateObj.toLocaleDateString('en-US', options);
                document.getElementById('summary-datetime').textContent = formattedDateTime;
            } catch (e) {
                console.error('Error formatting date:', e);
            }
        }
    }
    
    // Tour booking modal initialization
    const tourBookingTriggers = document.querySelectorAll('.book-tour-btn');
    const tourBookingModal = document.getElementById('tour-booking-modal');
    
    if (tourBookingTriggers.length > 0 && tourBookingModal) {
        tourBookingTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                // Get tour details
                const tourId = this.getAttribute('data-id');
                const tourName = this.getAttribute('data-name');
                const tourPrice = this.getAttribute('data-price');
                const tourDates = this.getAttribute('data-dates').split(',');
                const maxParticipants = parseInt(this.getAttribute('data-max')) || 10;
                
                // Set values in modal
                document.getElementById('tour-id').value = tourId;
                document.getElementById('tour-name').value = tourName;
                document.getElementById('tour-price').value = tourPrice;
                document.getElementById('summary-tour-name').textContent = tourName;
                document.getElementById('summary-tour-amount').textContent = `₹${tourPrice}`;
                
                // Populate dates dropdown
                const dateSelect = document.getElementById('tour-date');
                dateSelect.innerHTML = '';
                
                tourDates.forEach(date => {
                    const option = document.createElement('option');
                    option.value = date.trim();
                    
                    try {
                        const dateObj = new Date(date.trim());
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        option.textContent = formattedDate;
                    } catch (e) {
                        option.textContent = date.trim();
                    }
                    
                    dateSelect.appendChild(option);
                });
                
                // Populate participants dropdown
                const participantsSelect = document.getElementById('tour-participants');
                participantsSelect.innerHTML = '';
                
                for (let i = 1; i <= maxParticipants; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i === 1 ? '1 person' : `${i} people`;
                    participantsSelect.appendChild(option);
                }
                
                // Update summary
                updateTourSummary();
                
                // Show modal
                tourBookingModal.style.display = 'flex';
            });
        });
        
        // Close modal button
        const closeBtn = tourBookingModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                tourBookingModal.style.display = 'none';
            });
        }
        
        // Close when clicking outside
        tourBookingModal.addEventListener('click', function(e) {
            if (e.target === tourBookingModal) {
                tourBookingModal.style.display = 'none';
            }
        });
        
        // Update summary when participants or date changes
        const participantsSelect = document.getElementById('tour-participants');
        const dateSelect = document.getElementById('tour-date');
        
        if (participantsSelect && dateSelect) {
            participantsSelect.addEventListener('change', updateTourSummary);
            dateSelect.addEventListener('change', updateTourSummary);
        }
    }
    
    function updateTourSummary() {
        const participantsSelect = document.getElementById('tour-participants');
        const dateSelect = document.getElementById('tour-date');
        const tourPrice = parseFloat(document.getElementById('tour-price').value);
        
        // Update participants
        const participants = parseInt(participantsSelect.value);
        document.getElementById('summary-participants').textContent = participants === 1 ? '1 person' : `${participants} people`;
        
        // Calculate and update amount
        const totalAmount = participants * tourPrice;
        document.getElementById('summary-tour-amount').textContent = `₹${totalAmount}`;
        
        // Update date if selected
        if (dateSelect.value) {
            try {
                const dateObj = new Date(dateSelect.value);
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                
                const formattedDate = dateObj.toLocaleDateString('en-US', options);
                document.getElementById('summary-tour-date').textContent = formattedDate;
            } catch (e) {
                console.error('Error formatting date:', e);
                document.getElementById('summary-tour-date').textContent = dateSelect.value;
            }
        }
    }
    
    // Handle testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (testimonialSlides.length > 1) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.display = 'block';
                    slide.style.opacity = 0;
                    setTimeout(() => {
                        slide.style.opacity = 1;
                    }, 10);
                } else {
                    slide.style.display = 'none';
                }
            });
        }
        
        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 6000);
    }
    
    // Helper functions
    
    // Email validation
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    // Phone validation
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone.replace(/\D/g, ''));
    }
    
    // Toast notification function
    window.showToast = function(message, type = 'info') {
        // Check if toast container exists
        let toastContainer = document.getElementById('toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fa-info-circle';
        switch(type) {
            case 'success':
                iconClass = 'fa-check-circle';
                break;
            case 'error':
                iconClass = 'fa-exclamation-circle';
                break;
            case 'warning':
                iconClass = 'fa-exclamation-triangle';
                break;
        }
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${iconClass} toast-icon"></i>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast after a small delay for animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-hide toast after 5 seconds
        const hideTimeout = setTimeout(() => {
            hideToast(toast);
        }, 5000);
        
        // Add close button event listener
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(hideTimeout);
                hideToast(toast);
            });
        }
    };
    
    function hideToast(toast) {
        toast.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Razorpay integration
    function initializeRazorpayPayment(orderId, amount, description, name, email, phone) {
        // Get Razorpay key from the JS file or environment
        const key = window.RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXX"; // This should be set in razorpay-config.js
        
        const options = {
            key: key,
            amount: amount,
            currency: "INR",
            name: "MeantToHelp",
            description: description,
            order_id: orderId,
            handler: function (response) {
                // Handle successful payment
                verifyPayment(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature
                );
            },
            prefill: {
                name: name,
                email: email,
                contact: phone
            },
            theme: {
                color: "#6D4C41"
            }
        };
        
        try {
            const razorpay = new Razorpay(options);
            razorpay.open();
        } catch (e) {
            console.error("Error initializing Razorpay:", e);
            showToast("Payment gateway initialization failed. Please try again later.", "error");
        }
    }
    
    // Verify payment with server
    function verifyPayment(paymentId, razorpayOrderId, signature) {
        const data = {
            payment_id: paymentId,
            razorpay_order_id: razorpayOrderId,
            signature: signature
        };
        
        fetch(window.location.pathname, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showToast("Payment successful! Booking confirmed.", "success");
                
                // Redirect to success page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/payment-success?order_id=' + data.order_id;
                }, 2000);
            } else {
                showToast(data.message || "Payment verification failed.", "error");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast("Payment verification failed. Please contact support.", "error");
        });
    }
});
