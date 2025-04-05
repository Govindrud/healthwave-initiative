
<?php
class Database {
    private static $instance = null;
    private $conn;
    
    private function __construct() {
        $this->connect();
    }
    
    private function connect() {
        // Database configuration
        $host = 'localhost';
        $db_name = 'meanttohelp';
        $username = 'root';
        $password = '';
        
        // Create connection
        $this->conn = new mysqli($host, $username, $password, $db_name);
        
        // Check connection
        if ($this->conn->connect_error) {
            die('Database Connection Error: ' . $this->conn->connect_error);
        }
        
        // Set charset
        $this->conn->set_charset('utf8mb4');
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->conn;
    }
    
    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
    
    public function query($sql) {
        return $this->conn->query($sql);
    }
    
    public function prepare($sql) {
        return $this->conn->prepare($sql);
    }
    
    public function escape($string) {
        return $this->conn->real_escape_string($string);
    }
    
    public function getLastId() {
        return $this->conn->insert_id;
    }
    
    public function getError() {
        return $this->conn->error;
    }
}
?>
