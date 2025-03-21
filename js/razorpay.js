
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn, .razorpay-payment-btn, .book-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const amount = this.getAttribute('data-amount');
            const productName = this.getAttribute('data-product');
            const orderId = 'ORD_' + Math.random().toString(36).substring(2, 15);
            
            // Show payment options modal
            showPaymentOptions(amount, productName, orderId);
        });
    });

    function showPaymentOptions(amount, productName, orderId) {
        // Create modal for payment options
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'payment-modal-content';
        
        modalContent.innerHTML = `
            <div class="payment-modal-header">
                <h3>Choose Payment Method</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="payment-modal-body">
                <div class="payment-summary">
                    <p>${productName}</p>
                    <p class="payment-amount">Amount: ₹${amount}</p>
                </div>
                <div class="payment-options">
                    <button class="payment-option-btn razorpay-option">
                        <img src="images/razorpay-logo.png" alt="Razorpay" onerror="this.src='https://razorpay.com/favicon.png'; this.style.width='24px';">
                        <span>Pay with Razorpay</span>
                    </button>
                    <button class="payment-option-btn upi-option">
                        <img src="images/upi-logo.png" alt="UPI" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg'; this.style.width='24px';">
                        <span>Pay with UPI</span>
                    </button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Razorpay option event
        modal.querySelector('.razorpay-option').addEventListener('click', function() {
            document.body.removeChild(modal);
            initiateRazorpayPayment(amount, productName, orderId);
        });
        
        // UPI option event
        modal.querySelector('.upi-option').addEventListener('click', function() {
            document.body.removeChild(modal);
            showUPIPayment(amount, productName, orderId);
        });
    }

    function initiateRazorpayPayment(amount, productName, orderId) {
        // Razorpay options
        const options = {
            key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay Key ID
            amount: amount * 100, // Amount in paisa
            currency: 'INR',
            name: 'MeantToHelp',
            description: productName,
            order_id: orderId,
            image: '/images/logo.png',
            handler: function(response) {
                // Handle successful payment
                verifyPayment(response, amount, productName, orderId, 'Razorpay');
            },
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                product_name: productName
            },
            theme: {
                color: '#0284c7'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    }
    
    function showUPIPayment(amount, productName, orderId) {
        // Create UPI QR code modal
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'payment-modal-content';
        
        // This would typically be a dynamic QR code generated on the server
        // For demo purposes, we're using a placeholder image
        modalContent.innerHTML = `
            <div class="payment-modal-header">
                <h3>Pay with UPI</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="payment-modal-body text-center">
                <div class="payment-summary mb-4">
                    <p>${productName}</p>
                    <p class="payment-amount">Amount: ₹${amount}</p>
                </div>
                <div class="upi-qr-container">
                    <img src="images/upi-qr.png" alt="UPI QR Code" class="upi-qr-image"
                         onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'; this.style.maxWidth='200px';">
                    <p class="mt-4 font-medium">Scan with any UPI app to pay</p>
                    <div class="upi-apps mt-2">
                        <img src="images/gpay.png" alt="Google Pay" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg'; this.style.width='32px';">
                        <img src="images/phonepe.png" alt="PhonePe" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/640px-PhonePe_Logo.png'; this.style.width='32px';">
                        <img src="images/paytm.png" alt="Paytm" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png'; this.style.width='32px';">
                    </div>
                </div>
                <button class="primary-btn mt-4" id="confirm-upi-payment">I've Completed the Payment</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Confirm UPI payment
        modal.querySelector('#confirm-upi-payment').addEventListener('click', function() {
            document.body.removeChild(modal);
            // In a real app, you would verify the UPI payment on the server
            // For this demo, we'll simulate a successful payment
            simulateUPIPayment(amount, productName, orderId);
        });
    }
    
    function simulateUPIPayment(amount, productName, orderId) {
        // Show a loading toast
        showToast('Verifying your payment...', 'info');
        
        // Simulate server verification delay
        setTimeout(() => {
            // Fake response object to match Razorpay's structure
            const response = {
                razorpay_payment_id: 'upi_' + Math.random().toString(36).substring(2, 15),
                razorpay_order_id: orderId,
                razorpay_signature: 'upi_verified'
            };
            
            verifyPayment(response, amount, productName, orderId, 'UPI');
        }, 2000);
    }
    
    function verifyPayment(response, amount, productName, orderId, paymentMethod) {
        // Send payment verification request to the backend
        fetch('includes/verify-payment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount,
                product_name: productName,
                order_id: orderId,
                payment_method: paymentMethod
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Payment successful! Thank you for your purchase.', 'success');
                
                // Get date and time if available
                const dateTimeElement = document.querySelector('.doctor-date-time') || 
                                       document.querySelector('.selected-date-time');
                let dateTime = 'To be confirmed';
                if (dateTimeElement) {
                    dateTime = dateTimeElement.textContent || dateTimeElement.value || 'To be confirmed';
                }
                
                // Redirect to success page with additional details
                setTimeout(() => {
                    window.location.href = `payment-success.php?order_id=${orderId}&payment_method=${paymentMethod}&service=${encodeURIComponent(productName)}&amount=${amount}&datetime=${encodeURIComponent(dateTime)}`;
                }, 2000);
            } else {
                showToast('Payment verification failed. Please contact support.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred. Please try again.', 'error');
        });
    }
    
    // Helper function to show toast messages
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
