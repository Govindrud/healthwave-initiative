
<?php
class Controller {
    protected $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    protected function render($view, $data = []) {
        // Extract data to make it accessible in the view
        extract($data);
        
        // Include the view file
        include_once VIEWS_PATH . $view . '.php';
    }
    
    protected function renderJson($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
    
    protected function redirect($path) {
        header('Location: ' . $path);
        exit;
    }
    
    protected function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }
    
    protected function requireLogin() {
        if (!$this->isLoggedIn()) {
            $this->redirect('/login');
        }
    }
    
    protected function getCurrentUser() {
        if ($this->isLoggedIn()) {
            require_once 'models/UserModel.php';
            $userModel = new UserModel($this->conn);
            return $userModel->getUserById($_SESSION['user_id']);
        }
        return null;
    }
}
