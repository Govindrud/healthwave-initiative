
<?php
require_once 'includes/Model.php';

class OrderModel extends Model {
    public function __construct($conn) {
        parent::__construct($conn, 'orders');
    }
    
    public function createOrder($data) {
        $sql = "INSERT INTO {$this->table} (
                order_type, 
                customer_name, 
                customer_email, 
                customer_phone, 
                amount, 
                item_id, 
                booking_datetime, 
                duration, 
                participants, 
                notes, 
                status, 
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        
        $stmt = $this->conn->prepare($sql);
        
        // Set default values for optional fields
        $duration = isset($data['duration']) ? $data['duration'] : 0;
        $participants = isset($data['participants']) ? $data['participants'] : 0;
        
        $stmt->bind_param(
            "ssssdississ",
            $data['order_type'],
            $data['customer_name'],
            $data['customer_email'],
            $data['customer_phone'],
            $data['amount'],
            $data['item_id'],
            $data['booking_datetime'],
            $duration,
            $participants,
            $data['notes'],
            $data['status']
        );
        
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        }
        
        return false;
    }
    
    public function updateOrder($id, $data) {
        $set_clause = '';
        $types = '';
        $params = [];
        
        foreach ($data as $key => $value) {
            $set_clause .= "{$key} = ?, ";
            
            // Determine the type for bind_param
            if (is_int($value)) {
                $types .= 'i';
            } elseif (is_float($value)) {
                $types .= 'd';
            } else {
                $types .= 's';
            }
            
            $params[] = $value;
        }
        
        // Remove trailing comma and space
        $set_clause = rtrim($set_clause, ', ');
        
        // Add id parameter type and value
        $types .= 'i';
        $params[] = $id;
        
        $sql = "UPDATE {$this->table} SET {$set_clause} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        // Dynamically bind parameters
        $stmt->bind_param($types, ...$params);
        
        return $stmt->execute();
    }
    
    public function getOrderByRazorpayId($razorpay_order_id) {
        $sql = "SELECT * FROM {$this->table} WHERE razorpay_order_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $razorpay_order_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        
        return null;
    }
    
    public function getUserOrders($email) {
        $sql = "SELECT * FROM {$this->table} WHERE customer_email = ? ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $orders = [];
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
        }
        
        return $orders;
    }
}
?>
