
<?php
class Controller {
    protected $conn;
    protected $data = [];
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    protected function render($view, $data = []) {
        // Merge any data passed to this method with the controller data
        $this->data = array_merge($this->data, $data);
        
        // Extract data to make variables available in view
        extract($this->data);
        
        // Include the view file
        include_once(VIEWS_PATH . $view . '.php');
    }
    
    protected function redirect($url) {
        header("Location: $url");
        exit();
    }
    
    protected function json($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
}
?>
