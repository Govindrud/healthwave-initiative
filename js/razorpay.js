
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn, .razorpay-payment-btn, .book-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const amount = this.getAttribute('data-amount') || this.closest('form')?.querySelector('input[name="amount"]')?.value;
            const productName = this.getAttribute('data-product') || this.closest('form')?.querySelector('input[name="product_name"]')?.value;
            
            if (!amount) {
                showToast('Error: Amount not specified', 'error');
                return;
            }
            
            const orderId = 'ORD_' + Math.random().toString(36).substring(2, 15);
            const isConsultation = this.classList.contains('book-btn');
            const datetime = this.getAttribute('data-datetime') || '';
            
            // Collect customer info if this is in a form
            let customerName = '';
            let customerEmail = '';
            let customerPhone = '';
            
            // Try to get customer details from the closest form
            const parentForm = this.closest('form');
            if (parentForm) {
                const nameInput = parentForm.querySelector('input[name="customer_name"]') || 
                                  parentForm.querySelector('input[name="name"]');
                const emailInput = parentForm.querySelector('input[name="customer_email"]') || 
                                   parentForm.querySelector('input[name="email"]');
                const phoneInput = parentForm.querySelector('input[name="customer_phone"]') || 
                                   parentForm.querySelector('input[name="phone"]');
                
                customerName = nameInput ? nameInput.value : '';
                customerEmail = emailInput ? emailInput.value : '';
                customerPhone = phoneInput ? phoneInput.value : '';
                
                // Validate required fields
                if (isConsultation && (!customerName || !customerEmail || !customerPhone)) {
                    showToast('Please fill in all required fields', 'error');
                    return;
                }
            }
            
            // Show payment options modal
            showPaymentOptions(amount, productName || 'Services', orderId, isConsultation ? 'consultation' : 'product', customerName, customerEmail, customerPhone, datetime);
        });
    });

    function showPaymentOptions(amount, productName, orderId, transactionType, customerName, customerEmail, customerPhone, datetime) {
        // Create modal for payment options
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'payment-modal-content';
        
        // Add customer info collection if not provided
        let customerInfoHTML = '';
        if (!customerName || !customerEmail || !customerPhone) {
            customerInfoHTML = `
                <div class="customer-info-section mb-4">
                    <h4 class="mb-2">Your Information</h4>
                    <div class="form-group mb-2">
                        <label for="customer_name">Name</label>
                        <input type="text" id="customer_name" class="form-control" value="${customerName}" placeholder="Your name" required>
                    </div>
                    <div class="form-group mb-2">
                        <label for="customer_email">Email</label>
                        <input type="email" id="customer_email" class="form-control" value="${customerEmail}" placeholder="Your email" required>
                    </div>
                    <div class="form-group mb-2">
                        <label for="customer_phone">Phone</label>
                        <input type="tel" id="customer_phone" class="form-control" value="${customerPhone}" placeholder="Your phone number" required>
                    </div>
                </div>
            `;
        }
        
        modalContent.innerHTML = `
            <div class="payment-modal-header">
                <h3>Choose Payment Method</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="payment-modal-body">
                ${customerInfoHTML}
                <div class="payment-summary">
                    <p>${productName}</p>
                    <p class="payment-amount">Amount: ₹${amount}</p>
                    ${datetime ? `<p class="appointment-time">Scheduled for: ${datetime}</p>` : ''}
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
        
        // Add transition effect
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Function to collect customer info from modal
        function getCustomerInfoFromModal() {
            if (customerInfoHTML) {
                const nameInput = modal.querySelector('#customer_name');
                const emailInput = modal.querySelector('#customer_email');
                const phoneInput = modal.querySelector('#customer_phone');
                
                // Validate required fields
                if (!nameInput.value || !emailInput.value || !phoneInput.value) {
                    showToast('Please fill in all required fields', 'error');
                    return null;
                }
                
                return {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value
                };
            }
            
            return {
                name: customerName,
                email: customerEmail,
                phone: customerPhone
            };
        }
        
        // Razorpay option event
        modal.querySelector('.razorpay-option').addEventListener('click', function() {
            const customerInfo = getCustomerInfoFromModal();
            if (!customerInfo) return;
            
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                initiateRazorpayPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
            }, 300);
        });
        
        // UPI option event
        modal.querySelector('.upi-option').addEventListener('click', function() {
            const customerInfo = getCustomerInfoFromModal();
            if (!customerInfo) return;
            
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                showUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
            }, 300);
        });
    }

    function initiateRazorpayPayment(amount, productName, orderId, transactionType, customerInfo, datetime) {
        // Show loading toast
        showToast('Setting up payment...', 'info');
        
        // Razorpay options
        const options = {
            key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay Key ID
            amount: amount * 100, // Amount in paisa
            currency: 'INR',
            name: 'MeantToHelp',
            description: productName,
            order_id: orderId,
            image: '/images/logo-placeholder.png',
            handler: function(response) {
                // Handle successful payment
                verifyPayment(response, amount, productName, orderId, 'Razorpay', transactionType, customerInfo, datetime);
            },
            prefill: {
                name: customerInfo.name,
                email: customerInfo.email,
                contact: customerInfo.phone
            },
            notes: {
                product_name: productName,
                transaction_type: transactionType
            },
            theme: {
                color: '#0284c7'
            },
            modal: {
                ondismiss: function() {
                    showToast('Payment cancelled', 'warning');
                }
            }
        };
        
        try {
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function (response){
                showToast(`Payment failed: ${response.error.description}`, 'error');
            });
            rzp.open();
        } catch (err) {
            showToast('Failed to initialize payment gateway. Please try again.', 'error');
            console.error('Razorpay initialization error:', err);
        }
    }
    
    function showUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime) {
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
                    ${datetime ? `<p class="appointment-time">Scheduled for: ${datetime}</p>` : ''}
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
        
        // Add transition effect
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Confirm UPI payment
        modal.querySelector('#confirm-upi-payment').addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                // In a real app, you would verify the UPI payment on the server
                // For this demo, we'll simulate a successful payment
                simulateUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
            }, 300);
        });
    }
    
    function simulateUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime) {
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
            
            verifyPayment(response, amount, productName, orderId, 'UPI', transactionType, customerInfo, datetime);
        }, 2000);
    }
    
    function verifyPayment(response, amount, productName, orderId, paymentMethod, transactionType, customerInfo, datetime) {
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
                payment_method: paymentMethod,
                transaction_type: transactionType,
                customer_name: customerInfo.name,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                datetime: datetime,
                booking_type: transactionType === 'consultation' ? 'priest_consultation' : 'tour_booking'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showToast('Payment successful! Thank you for your purchase.', 'success');
                
                // Prepare URL parameters for redirect
                const params = new URLSearchParams({
                    order_id: orderId,
                    payment_method: paymentMethod,
                    service: productName,
                    amount: amount,
                    datetime: datetime || 'To be confirmed',
                    transaction_type: transactionType
                });
                
                // Redirect to success page with additional details
                setTimeout(() => {
                    window.location.href = `payment-success.php?${params.toString()}`;
                }, 2000);
            } else {
                showToast(data.message || 'Payment verification failed. Please contact support.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred during payment verification. Please try again.', 'error');
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
    
    // Add event listeners to close modals when clicking outside
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.payment-modal, .booking-modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) closeBtn.click();
            }
        });
    });
});
