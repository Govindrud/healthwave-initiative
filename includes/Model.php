
<?php
class Model {
    protected $conn;
    protected $table;
    
    public function __construct($conn, $table) {
        $this->conn = $conn;
        $this->table = $table;
    }
    
    public function getAll($limit = 100, $offset = 0) {
        $sql = "SELECT * FROM {$this->table} LIMIT ? OFFSET ?";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $items = [];
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
        }
        
        return $items;
    }
    
    public function getById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ?";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        
        return null;
    }
    
    public function getWhere($conditions, $limit = 100, $offset = 0) {
        $whereClause = [];
        $params = [];
        $types = '';
        
        foreach ($conditions as $key => $value) {
            $whereClause[] = "{$key} = ?";
            $params[] = $value;
            
            // Determine the data type for binding
            if (is_int($value)) {
                $types .= 'i';
            } elseif (is_float($value)) {
                $types .= 'd';
            } else {
                $types .= 's';
            }
        }
        
        $whereStr = implode(' AND ', $whereClause);
        
        $sql = "SELECT * FROM {$this->table} WHERE {$whereStr} LIMIT ? OFFSET ?";
        
        // Add limit and offset parameters
        $types .= 'ii';
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->conn->prepare($sql);
        
        // Dynamically bind parameters
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $items = [];
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
        }
        
        return $items;
    }
    
    public function create($data) {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        
        $stmt = $this->conn->prepare($sql);
        
        $types = '';
        $values = [];
        foreach ($data as $value) {
            if (is_int($value)) {
                $types .= 'i';
            } elseif (is_float($value)) {
                $types .= 'd';
            } else {
                $types .= 's';
            }
            $values[] = $value;
        }
        
        $stmt->bind_param($types, ...$values);
        
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        }
        
        return false;
    }
    
    public function update($id, $data) {
        $setClause = [];
        $params = [];
        $types = '';
        
        foreach ($data as $key => $value) {
            $setClause[] = "{$key} = ?";
            $params[] = $value;
            
            if (is_int($value)) {
                $types .= 'i';
            } elseif (is_float($value)) {
                $types .= 'd';
            } else {
                $types .= 's';
            }
        }
        
        $setStr = implode(', ', $setClause);
        
        $sql = "UPDATE {$this->table} SET {$setStr} WHERE id = ?";
        
        // Add id parameter
        $types .= 'i';
        $params[] = $id;
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param($types, ...$params);
        
        return $stmt->execute();
    }
    
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        return $stmt->execute();
    }
}
