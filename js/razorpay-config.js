
// Razorpay Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Razorpay with the key from constants
    window.RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXX"; // This should be updated with actual key in production
    
    // UPI Payment handlers
    initUpiPayments();
    
    // Initialize payment buttons
    initPaymentButtons();
});

// Function to initialize UPI payments where available
function initUpiPayments() {
    const upiPaymentButtons = document.querySelectorAll('.upi-payment-btn');
    
    if (upiPaymentButtons.length > 0) {
        upiPaymentButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get payment details from button data attributes
                const orderId = this.getAttribute('data-order-id');
                const amount = this.getAttribute('data-amount');
                const description = this.getAttribute('data-description');
                
                if (!orderId || !amount) {
                    showToast('Payment information is incomplete', 'error');
                    return;
                }
                
                // Show UPI payment dialog
                showUpiDialog(orderId, amount, description);
            });
        });
    }
}

// Function to initialize payment buttons
function initPaymentButtons() {
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
}

// Function to show payment options
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

// Function to show UPI payment dialog
function showUpiDialog(orderId, amount, description) {
    // Check if dialog already exists
    let upiDialog = document.getElementById('upi-payment-dialog');
    
    if (!upiDialog) {
        // Create the dialog
        upiDialog = document.createElement('div');
        upiDialog.id = 'upi-payment-dialog';
        upiDialog.className = 'modal';
        
        upiDialog.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h3>UPI Payment</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <p>Amount: ₹${parseFloat(amount).toFixed(2)}</p>
                    <p>${description || 'Complete your payment with UPI'}</p>
                    
                    <div class="upi-qr-container" style="margin: 20px 0;">
                        <img src="/images/upi-qr-placeholder.png" alt="UPI QR Code" style="max-width: 200px; margin: 0 auto;">
                    </div>
                    
                    <div class="upi-id-container">
                        <p>UPI ID: <strong>yourupi@bank</strong></p>
                    </div>
                    
                    <p style="margin-top: 20px; font-size: 14px; color: #666;">
                        Scan the QR code or use the UPI ID to make your payment. After payment, click the button below.
                    </p>
                    
                    <button class="btn btn-primary upi-verify-btn" data-order-id="${orderId}" style="margin-top: 10px;">
                        I've completed the payment
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(upiDialog);
        
        // Add event listeners
        const closeBtn = upiDialog.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                upiDialog.style.display = 'none';
            });
        }
        
        // Close when clicking outside
        upiDialog.addEventListener('click', function(e) {
            if (e.target === upiDialog) {
                upiDialog.style.display = 'none';
            }
        });
        
        // Verify button handler
        const verifyBtn = upiDialog.querySelector('.upi-verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', function() {
                // Send verification request to server
                verifyUpiPayment(this.getAttribute('data-order-id'));
                upiDialog.style.display = 'none';
            });
        }
    }
    
    // Update the dialog with new data if needed
    const amountText = upiDialog.querySelector('.modal-body p:first-child');
    if (amountText) {
        amountText.textContent = `Amount: ₹${parseFloat(amount).toFixed(2)}`;
    }
    
    const descText = upiDialog.querySelector('.modal-body p:nth-child(2)');
    if (descText && description) {
        descText.textContent = description;
    }
    
    const verifyBtn = upiDialog.querySelector('.upi-verify-btn');
    if (verifyBtn) {
        verifyBtn.setAttribute('data-order-id', orderId);
    }
    
    // Show the dialog
    upiDialog.style.display = 'flex';
}

// Function to verify UPI payment
function verifyUpiPayment(orderId) {
    // Show loading message
    showToast('Verifying your payment...', 'info');
    
    // In a real implementation, you would send a request to your server
    // to verify the payment and update the order status
    
    fetch('/includes/verify-payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_id: orderId,
            payment_method: 'UPI',
            action: 'verify_upi_payment'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showToast('Payment verified successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/payment-success?order_id=' + orderId;
            }, 2000);
        } else {
            showToast(data.message || 'Payment verification failed. Please contact support.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred during verification. Please contact support.', 'error');
    });
}

// Function to show UPI payment options
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
            <div class="upi-qr-container" style="margin: 20px 0;">
                <img src="images/upi-qr-placeholder.png" alt="UPI QR Code" style="max-width: 200px; margin: 0 auto;">
            </div>
            <div class="upi-id-container">
                <p>UPI ID: <strong>meanttohelp@hdfc</strong></p>
            </div>
            <div class="upi-apps mt-4 mb-4">
                <img src="images/gpay.png" alt="Google Pay" style="height:40px; width:auto; margin:0 10px;">
                <img src="images/phonepe.png" alt="PhonePe" style="height:40px; width:auto; margin:0 10px;">
                <img src="images/paytm.png" alt="Paytm" style="height:40px; width:auto; margin:0 10px;">
            </div>
            <p style="margin: 10px 0; font-size: 14px; color: #666;">
                Scan the QR code or use the UPI ID to make your payment. After payment, click the button below.
            </p>
            <button class="btn btn-primary" id="confirm-upi-payment">
                I've Completed the Payment
            </button>
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
            // Verify UPI payment
            verifyPayment(
                { 
                    razorpay_payment_id: 'upi_' + Math.random().toString(36).substring(2, 15),
                    razorpay_order_id: orderId,
                    razorpay_signature: 'upi_verified'
                }, 
                amount, 
                productName, 
                orderId, 
                'UPI', 
                transactionType, 
                customerInfo, 
                datetime
            );
        }, 300);
    });
}

// Razorpay payment initialization
function initiateRazorpayPayment(amount, description, orderId, transactionType, customerInfo, datetime) {
    const options = {
        key: window.RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "MeantToHelp",
        description: description,
        order_id: orderId, // This would normally be a server-generated ID
        handler: function (response) {
            verifyPayment(
                response,
                amount,
                description,
                orderId,
                'Razorpay',
                transactionType,
                customerInfo,
                datetime
            );
        },
        prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            contact: customerInfo.phone
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
    
    try {
        const razorpay = new Razorpay(options);
        razorpay.open();
    } catch (e) {
        console.error("Error initializing Razorpay:", e);
        showToast("Payment gateway initialization failed. Please try again later.", "error");
    }
}

// Verify Razorpay payment
function verifyPayment(response, amount, productName, orderId, paymentMethod, transactionType, customerInfo, datetime) {
    // Send payment verification request to the backend
    showToast('Processing your payment...', 'info');
    
    fetch('/includes/verify-payment.php', {
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
            booking_type: transactionType === 'consultation' ? 'doctor_consultation' : 'product_purchase'
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

// Function to show toast messages
function showToast(message, type = 'info') {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
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
    
    // Add styles for better visibility
    toast.style.backgroundColor = 'white';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.borderRadius = '8px';
    toast.style.padding = '12px 16px';
    toast.style.marginBottom = '8px';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.justifyContent = 'space-between';
    
    let bgColor = '#f0f0f0';
    let borderColor = '#ddd';
    
    switch (type) {
        case 'success':
            bgColor = '#e7f7e7';
            borderColor = '#4caf50';
            break;
        case 'error':
            bgColor = '#ffebee';
            borderColor = '#f44336';
            break;
        case 'warning':
            bgColor = '#fff8e1';
            borderColor = '#ff9800';
            break;
        case 'info':
            bgColor = '#e3f2fd';
            borderColor = '#2196f3';
            break;
    }
    
    toast.style.backgroundColor = bgColor;
    toast.style.borderLeft = `4px solid ${borderColor}`;
    
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
    
    // Expose the toast to make it accessible from other scripts
    return toast;
}

// Make showToast globally accessible
window.showToast = showToast;
