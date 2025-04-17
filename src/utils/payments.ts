
interface PaymentOptions {
  amount: number;
  currency?: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  orderId: string;
  bookingDatetime?: string;
  successCallback: (response: any) => void;
  errorCallback: (error: any) => void;
}

export const initializeRazorpay = (callback: () => void) => {
  // Check if Razorpay is already loaded
  if ((window as any).Razorpay) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
};

export const initiatePayment = (options: PaymentOptions) => {
  const {
    amount,
    currency = 'INR',
    description,
    name,
    email,
    phone,
    orderId,
    bookingDatetime,
    successCallback,
    errorCallback
  } = options;

  initializeRazorpay(() => {
    const razorpayOptions = {
      key: "rzp_test_YOUR_KEY_HERE", // Will be replaced with actual key in production
      amount: amount * 100, // Razorpay expects amount in smallest currency unit
      currency,
      name: "MeantToHelp",
      description,
      order_id: orderId,
      handler: function(response: any) {
        // Handle successful payment
        console.log("Payment successful:", response);
        successCallback(response);
      },
      prefill: {
        name,
        email,
        contact: phone
      },
      notes: {
        order_id: orderId,
        booking_datetime: bookingDatetime || ""
      },
      theme: {
        color: "#0284c7"
      }
    };
    
    try {
      // @ts-ignore - Razorpay will be available globally after script loads
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
      razorpayInstance.on('payment.failed', function(response: any) {
        console.error("Payment failed:", response.error);
        errorCallback({
          error: response.error
        });
      });
    } catch (error) {
      console.error("Razorpay initialization error:", error);
      errorCallback(error);
    }
  });
};

export const verifyPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string,
  amount: number,
  productName: string,
  customerInfo: { name: string, email: string, phone: string },
  transactionType: string,
  bookingDatetime?: string
) => {
  try {
    // In a production app, this would call your backend API to verify the payment
    // For this demo, we'll simulate a successful response
    console.log("Payment verification requested:", {
      payment_id: paymentId,
      order_id: orderId,
      signature,
      amount,
      product_name: productName,
      customer_info: customerInfo,
      transaction_type: transactionType,
      booking_datetime: bookingDatetime
    });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return { 
      success: true, 
      message: 'Payment verified successfully',
      order_id: orderId,
      payment_id: paymentId
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { success: false, error: 'Payment verification failed' };
  }
};
