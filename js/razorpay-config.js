
// Razorpay Configuration
const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXX"; // Replace with your actual Razorpay Key ID in production

document.addEventListener('DOMContentLoaded', function() {
    // Handle priest booking form submission
    const priestBookingForm = document.getElementById('priest-booking-form');
    if (priestBookingForm) {
        priestBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPriestBooking();
        });
    }

    // Handle tour booking form submission
    const tourBookingForm = document.getElementById('tour-booking-form');
    if (tourBookingForm) {
        tourBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processTourBooking();
        });
    }

    // Function to process priest booking
    function processPriestBooking() {
        const formData = new FormData(priestBookingForm);
        const priestId = document.getElementById('priest-id').value;
        const priestName = document.getElementById('priest-name').value;
        const priestRate = parseFloat(document.getElementById('priest-rate').value);
        const duration = parseInt(document.getElementById('priest-consultation-duration').value);
        const bookingDate = document.getElementById('priest-booking-date').value;
        const bookingTime = document.getElementById('priest-booking-time').value;
        
        // Calculate amount
        const amount = (priestRate * duration) / 60;
        
        // Format booking datetime
        const formattedDate = new Date(bookingDate).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const bookingDatetime = `${formattedDate}, ${bookingTime}`;
        
        // Add additional data to form
        formData.append('amount', amount);
        formData.append('booking_datetime', bookingDatetime);
        
        // Send AJAX request to create booking in database
        fetch('spirituality.php', {
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
                    amount * 100, // Razorpay expects amount in paise
                    `Consultation with ${priestName}`,
                    data.customer_name,
                    data.customer_email,
                    data.customer_phone,
                    'priest_consultation'
                );
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred. Please try again.', 'error');
        });
    }

    // Function to process tour booking
    function processTourBooking() {
        const formData = new FormData(tourBookingForm);
        const tourId = document.getElementById('tour-id').value;
        const tourName = document.getElementById('tour-name').value;
        const tourPrice = parseFloat(document.getElementById('tour-price').value);
        const participants = parseInt(document.getElementById('tour-participants').value);
        
        // Calculate amount
        const amount = tourPrice * participants;
        
        // Add additional data to form
        formData.append('amount', amount);
        
        // Send AJAX request to create booking in database
        fetch('spirituality.php', {
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
                    amount * 100, // Razorpay expects amount in paise
                    tourName,
                    data.customer_name,
                    data.customer_email,
                    data.customer_phone,
                    'tour_booking'
                );
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred. Please try again.', 'error');
        });
    }

    // Function to initialize Razorpay payment
    function initializeRazorpayPayment(orderId, amount, productName, customerName, customerEmail, customerPhone, bookingType) {
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "MeantToHelp",
            description: productName,
            order_id: orderId,
            handler: function (response) {
                // Send payment verification request
                verifyPayment(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature,
                    orderId,
                    bookingType
                );
            },
            prefill: {
                name: customerName,
                email: customerEmail,
                contact: customerPhone
            },
            theme: {
                color: "#6D4C41"
            },
            modal: {
                ondismiss: function() {
                    showToast('Payment cancelled. You can try again later.', 'warning');
                }
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    }

    // Function to verify payment
    function verifyPayment(paymentId, razorpayOrderId, signature, orderId, bookingType) {
        const data = {
            action: 'verify_payment',
            payment_id: paymentId,
            razorpay_order_id: razorpayOrderId,
            signature: signature,
            order_id: orderId,
            booking_type: bookingType
        };
        
        fetch('includes/verify-payment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Redirect to success page
                window.location.href = 'payment-success.php?order_id=' + orderId + '&type=' + bookingType;
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Payment verification failed. Please contact support.', 'error');
        });
    }

    // Toast notification function
    function showToast(message, type = 'info') {
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
    }
});
