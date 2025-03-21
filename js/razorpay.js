
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Razorpay buttons
    const paymentButtons = document.querySelectorAll('.razorpay-payment-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const amount = this.getAttribute('data-amount');
            const productName = this.getAttribute('data-product');
            const orderId = 'ORD_' + Math.random().toString(36).substring(2, 15);
            
            initiatePayment(amount, productName, orderId);
        });
    });

    function initiatePayment(amount, productName, orderId) {
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
                verifyPayment(response, amount, productName, orderId);
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
    
    function verifyPayment(response, amount, productName, orderId) {
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
                order_id: orderId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Payment successful! Thank you for your purchase.', 'success');
                
                // Redirect to success page or update UI
                setTimeout(() => {
                    window.location.href = 'payment-success.php?order_id=' + orderId;
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
});
