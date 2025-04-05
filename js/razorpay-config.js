
// Razorpay Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Razorpay with the key from constants
    window.RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXX"; // This should be updated with actual key in production
    
    // UPI Payment handlers
    initUpiPayments();
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
            payment_method: 'upi',
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

// Razorpay payment initialization
function initializeRazorpayPayment(orderId, amount, description, name, email, phone) {
    const options = {
        key: window.RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "MeantToHelp",
        description: description,
        order_id: orderId,
        handler: function (response) {
            verifyRazorpayPayment(
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature,
                orderId
            );
        },
        prefill: {
            name: name,
            email: email,
            contact: phone
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
function verifyRazorpayPayment(paymentId, razorpayOrderId, signature, orderId) {
    fetch('/includes/verify-payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            payment_id: paymentId,
            razorpay_order_id: razorpayOrderId,
            signature: signature,
            order_id: orderId,
            action: 'verify_razorpay_payment'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showToast('Payment successful!', 'success');
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

// Function to show toast notification
function showToast(message, type = 'info') {
    // Use the global showToast function defined in main.js
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
    } else {
        console.log(message);
    }
}
