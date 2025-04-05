
<?php
class RazorpayApi {
    private $keyId;
    private $keySecret;
    private $apiBaseUrl = 'https://api.razorpay.com/v1/';
    
    public function __construct() {
        // Load Razorpay credentials from environment variables or config
        $this->keyId = RAZORPAY_KEY_ID;
        $this->keySecret = RAZORPAY_KEY_SECRET;
    }
    
    /**
     * Create a new Razorpay order
     * 
     * @param float $amount Amount in paise (₹100 = 10000 paise)
     * @param string $receiptId Your internal order ID
     * @param string $currency Currency code (default: INR)
     * @return array|false Order data or false on failure
     */
    public function createOrder($amount, $receiptId, $currency = 'INR') {
        $data = [
            'amount' => $amount,
            'currency' => $currency,
            'receipt' => 'order_' . $receiptId,
            'payment_capture' => 1
        ];
        
        return $this->apiRequest('orders', $data, 'POST');
    }
    
    /**
     * Verify Razorpay payment signature
     * 
     * @param array $data Payment data (razorpay_order_id, razorpay_payment_id, razorpay_signature)
     * @return bool True if signature is valid, false otherwise
     */
    public function verifyPaymentSignature($data) {
        $generated_signature = hash_hmac('sha256', $data['razorpay_order_id'] . '|' . $data['payment_id'], $this->keySecret);
        
        return hash_equals($generated_signature, $data['signature']);
    }
    
    /**
     * Get payment details
     * 
     * @param string $paymentId Razorpay payment ID
     * @return array|false Payment data or false on failure
     */
    public function getPayment($paymentId) {
        return $this->apiRequest('payments/' . $paymentId, null, 'GET');
    }
    
    /**
     * Create refund for a payment
     * 
     * @param string $paymentId Razorpay payment ID
     * @param float $amount Amount to refund in paise (optional, full amount if not specified)
     * @return array|false Refund data or false on failure
     */
    public function createRefund($paymentId, $amount = null) {
        $data = [];
        
        if ($amount !== null) {
            $data['amount'] = $amount;
        }
        
        return $this->apiRequest('payments/' . $paymentId . '/refund', $data, 'POST');
    }
    
    /**
     * Make a request to the Razorpay API
     * 
     * @param string $endpoint API endpoint
     * @param array $data Request data
     * @param string $method HTTP method (GET, POST, PUT, DELETE)
     * @return array|false Response data or false on failure
     */
    private function apiRequest($endpoint, $data = null, $method = 'GET') {
        $url = $this->apiBaseUrl . $endpoint;
        $curl = curl_init();
        
        $options = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_USERPWD => $this->keyId . ':' . $this->keySecret
        ];
        
        if ($method === 'POST') {
            $options[CURLOPT_POST] = true;
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        } elseif ($method === 'PUT') {
            $options[CURLOPT_CUSTOMREQUEST] = 'PUT';
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        } elseif ($method === 'DELETE') {
            $options[CURLOPT_CUSTOMREQUEST] = 'DELETE';
        }
        
        curl_setopt_array($curl, $options);
        
        $response = curl_exec($curl);
        $httpStatusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        
        curl_close($curl);
        
        if ($error) {
            error_log('Razorpay API Error: ' . $error);
            return false;
        }
        
        $responseData = json_decode($response, true);
        
        if ($httpStatusCode >= 200 && $httpStatusCode < 300) {
            return $responseData;
        } else {
            error_log('Razorpay API Error: ' . ($responseData['error']['description'] ?? $response));
            return false;
        }
    }
}
