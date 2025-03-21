
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn, .razorpay-payment-btn, .book-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const amount = this.getAttribute('data-amount');
            const productName = this.getAttribute('data-product');
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
                const nameInput = parentForm.querySelector('input[name="name"]');
                const emailInput = parentForm.querySelector('input[name="email"]');
                const phoneInput = parentForm.querySelector('input[name="phone"]');
                
                customerName = nameInput ? nameInput.value : '';
                customerEmail = emailInput ? emailInput.value : '';
                customerPhone = phoneInput ? phoneInput.value : '';
            }
            
            // If it's a consultation without a form, try to get a customer name from the closest input
            if (isConsultation && !customerName) {
                // Look for name input in any nearby container
                const container = this.closest('.doctor-card') || this.closest('.doctors-grid') || document;
                const nameInput = container.querySelector('input[name="customer_name"]');
                const emailInput = container.querySelector('input[name="customer_email"]');
                const phoneInput = container.querySelector('input[name="customer_phone"]');
                
                customerName = nameInput ? nameInput.value : '';
                customerEmail = emailInput ? emailInput.value : '';
                customerPhone = phoneInput ? phoneInput.value : '';
            }
            
            // Show payment options modal
            showPaymentOptions(amount, productName, orderId, isConsultation ? 'consultation' : 'product', customerName, customerEmail, customerPhone, datetime);
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
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
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
            
            document.body.removeChild(modal);
            initiateRazorpayPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
        });
        
        // UPI option event
        modal.querySelector('.upi-option').addEventListener('click', function() {
            const customerInfo = getCustomerInfoFromModal();
            if (!customerInfo) return;
            
            document.body.removeChild(modal);
            showUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
        });
    }

    function initiateRazorpayPayment(amount, productName, orderId, transactionType, customerInfo, datetime) {
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
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
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
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Confirm UPI payment
        modal.querySelector('#confirm-upi-payment').addEventListener('click', function() {
            document.body.removeChild(modal);
            // In a real app, you would verify the UPI payment on the server
            // For this demo, we'll simulate a successful payment
            simulateUPIPayment(amount, productName, orderId, transactionType, customerInfo, datetime);
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
                datetime: datetime
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
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
