
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
            
            // Add amount to form
            let amountInput = this.querySelector('input[name="amount"]');
            if (!amountInput) {
                amountInput = document.createElement('input');
                amountInput.type = 'hidden';
                amountInput.name = 'amount';
                this.appendChild(amountInput);
            }
            amountInput.value = totalAmount;
            
            // Add notes to form
            const specialRequests = this.querySelector('textarea[name="special_requests"]').value;
            let notesInput = this.querySelector('input[name="notes"]');
            if (!notesInput) {
                notesInput = document.createElement('input');
                notesInput.type = 'hidden';
                notesInput.name = 'notes';
                this.appendChild(notesInput);
            }
            notesInput.value = specialRequests || '';
            
            // Format date and time for booking_datetime
            const datetime = `${bookingDate} ${bookingTime}:00`;
            let datetimeInput = this.querySelector('input[name="booking_datetime"]');
            if (!datetimeInput) {
                datetimeInput = document.createElement('input');
                datetimeInput.type = 'hidden';
                datetimeInput.name = 'booking_datetime';
                this.appendChild(datetimeInput);
            }
            datetimeInput.value = datetime;
            
            // Submit form via AJAX
            const formData = new FormData(this);
            
            fetch('/spirituality.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Close modal
                    document.getElementById('priest-booking-modal').style.display = 'none';
                    
                    // Initialize payment process
                    const bookBtn = document.querySelector('.book-btn');
                    if (bookBtn) {
                        // Set data attributes for payment
                        bookBtn.setAttribute('data-amount', totalAmount);
                        bookBtn.setAttribute('data-product', `Consultation with ${data.customer_name}`);
                        bookBtn.setAttribute('data-datetime', formatDateTime(datetime));
                        
                        // Trigger payment process
                        const event = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        bookBtn.dispatchEvent(event);
                    } else {
                        showToast('Booking created successfully', 'success');
                    }
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
            
            // Calculate total amount
            const price = parseInt(this.querySelector('input[name="tour_price"]').value);
            const totalAmount = parseInt(participants) * price;
            
            // Add amount to form
            let amountInput = this.querySelector('input[name="amount"]');
            if (!amountInput) {
                amountInput = document.createElement('input');
                amountInput.type = 'hidden';
                amountInput.name = 'amount';
                this.appendChild(amountInput);
            }
            amountInput.value = totalAmount;
            
            // Add notes to form
            const specialRequests = this.querySelector('textarea[name="special_requests"]').value;
            let notesInput = this.querySelector('input[name="notes"]');
            if (!notesInput) {
                notesInput = document.createElement('input');
                notesInput.type = 'hidden';
                notesInput.name = 'notes';
                this.appendChild(notesInput);
            }
            notesInput.value = specialRequests || '';
            
            // Submit form via AJAX
            const formData = new FormData(this);
            
            fetch('/spirituality.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Close modal
                    document.getElementById('tour-booking-modal').style.display = 'none';
                    
                    // Initialize payment process
                    const bookBtn = document.querySelector('.book-btn');
                    if (bookBtn) {
                        // Set data attributes for payment
                        bookBtn.setAttribute('data-amount', totalAmount);
                        bookBtn.setAttribute('data-product', `Tour booking for ${data.customer_name}`);
                        
                        // Trigger payment process
                        const event = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        bookBtn.dispatchEvent(event);
                    } else {
                        showToast('Booking created successfully', 'success');
                    }
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
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    // Helper function to validate phone number
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone.replace(/\D/g, ''));
    }
    
    // Helper function to format date time
    function formatDateTime(datetime) {
        const date = new Date(datetime);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Helper function to show toast messages
    function showToast(message, type = 'info') {
        // Check if toast container exists, if not create it
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        switch(type) {
            case 'success':
                icon = 'check-circle';
                break;
            case 'error':
                icon = 'exclamation-circle';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                break;
        }
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${icon} toast-icon"></i>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Add the show class to trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        const timeout = setTimeout(() => {
            removeToast(toast);
        }, 5000);
        
        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            removeToast(toast);
        });
        
        function removeToast(toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
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
        
        // Set initial slide
        showSlide(currentSlide);
        
        // Auto-advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 6000);
    }
});
