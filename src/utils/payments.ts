
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
  script.onload = () => {
    console.log("Razorpay script loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load Razorpay script");
  };
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

  console.log("Initiating payment with options:", { amount, orderId, name, email });

  initializeRazorpay(() => {
    try {
      const razorpayOptions = {
        key: "rzp_test_nCq1NOJiPYTfJy", // Replace with your actual test key
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
      
      console.log("Creating Razorpay instance with options:", razorpayOptions);
      
      // @ts-ignore - Razorpay will be available globally after script loads
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.on('payment.failed', function(response: any) {
        console.error("Payment failed:", response.error);
        errorCallback({
          error: response.error
        });
      });
      razorpayInstance.open();
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
