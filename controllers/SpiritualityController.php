
<?php
class SpiritualityController {
    private $model;
    
    public function __construct($conn) {
        $this->model = new SpiritualityModel($conn);
    }
    
    public function index() {
        // Get data for the spirituality page
        $priests = $this->model->getPriests();
        $tours = $this->model->getTours();
        
        // Include the view
        include_once(VIEWS_PATH . 'spirituality/index.php');
    }
    
    public function processPriestBooking() {
        header('Content-Type: application/json');
        
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
            exit;
        }
        
        $response = $this->model->createPriestBooking($_POST);
        echo json_encode($response);
        exit;
    }
    
    public function processTourBooking() {
        header('Content-Type: application/json');
        
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
            exit;
        }
        
        $response = $this->model->createTourBooking($_POST);
        echo json_encode($response);
        exit;
    }
    
    public function verifyPayment() {
        header('Content-Type: application/json');
        
        // Get input data
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Check if all required parameters are present
        if (!isset($data['payment_id']) || !isset($data['razorpay_order_id']) || !isset($data['signature']) || !isset($data['order_id']) || !isset($data['booking_type'])) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required parameters']);
            exit;
        }
        
        $response = $this->model->verifyPayment($data);
        echo json_encode($response);
        exit;
    }
    
    public function formatDate($date) {
        return $this->model->formatDate($date);
    }
}
?>
