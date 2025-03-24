
<?php
/**
 * Database Connection Class
 * Centralized database connection management with singleton pattern
 */
class Database {
    private static $instance = null;
    private $conn;
    
    // Database configuration
    private $db_host = 'localhost';
    private $db_user = 'Admin-ef1e';
    private $db_pass = '1=XBb=hME^e8';
    private $db_name = 'meanttohelp_db-353038359294';
    
    // Private constructor - singleton pattern
    private function __construct() {
        try {
            $this->conn = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
            
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
            
            // Set character set
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            die("Database connection failed. Please try again later.");
        }
    }
    
    // Get database instance - singleton pattern
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    // Get database connection
    public function getConnection() {
        return $this->conn;
    }
    
    // Close connection
    public function closeConnection() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
    
    // Prevent cloning - singleton pattern
    private function __clone() {}
    
    // Execute query and return result
    public function query($sql) {
        try {
            $result = $this->conn->query($sql);
            if (!$result) {
                throw new Exception("Query failed: " . $this->conn->error);
            }
            return $result;
        } catch (Exception $e) {
            error_log("Database Query Error: " . $e->getMessage());
            return false;
        }
    }
    
    // Prepare statement
    public function prepare($sql) {
        return $this->conn->prepare($sql);
    }
    
    // Execute prepared statement
    public function execute($stmt) {
        if (!$stmt->execute()) {
            error_log("Execute Error: " . $stmt->error);
            return false;
        }
        return true;
    }
    
    // Get last insert ID
    public function getLastId() {
        return $this->conn->insert_id;
    }
    
    // Escape string
    public function escapeString($string) {
        return $this->conn->real_escape_string($string);
    }
}
?>
