
<?php
/**
 * Base Model Class
 * All models extend this class
 */
class Model {
    protected $conn;
    protected $table;
    
    public function __construct($conn, $table = null) {
        $this->conn = $conn;
        $this->table = $table;
    }
    
    /**
     * Get all records from table
     */
    public function getAll($limit = null, $offset = 0) {
        $sql = "SELECT * FROM {$this->table}";
        
        if ($limit !== null) {
            $sql .= " LIMIT {$limit} OFFSET {$offset}";
        }
        
        $result = $this->conn->query($sql);
        $items = [];
        
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
        }
        
        return $items;
    }
    
    /**
     * Get record by ID
     */
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
    
    /**
     * Get records by condition
     */
    public function getWhere($conditions, $limit = null, $offset = 0) {
        $sql = "SELECT * FROM {$this->table} WHERE ";
        $params = [];
        $types = "";
        $conditionsArr = [];
        
        foreach ($conditions as $key => $value) {
            $conditionsArr[] = "{$key} = ?";
            $params[] = $value;
            
            if (is_int($value)) {
                $types .= "i";
            } elseif (is_float($value)) {
                $types .= "d";
            } else {
                $types .= "s";
            }
        }
        
        $sql .= implode(" AND ", $conditionsArr);
        
        if ($limit !== null) {
            $sql .= " LIMIT ? OFFSET ?";
            $types .= "ii";
            $params[] = $limit;
            $params[] = $offset;
        }
        
        $stmt = $this->conn->prepare($sql);
        
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        
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
    
    /**
     * Create record
     */
    public function create($data) {
        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        $stmt = $this->conn->prepare($sql);
        
        $types = "";
        $values = [];
        
        foreach ($data as $value) {
            $values[] = $value;
            
            if (is_int($value)) {
                $types .= "i";
            } elseif (is_float($value)) {
                $types .= "d";
            } else {
                $types .= "s";
            }
        }
        
        $stmt->bind_param($types, ...$values);
        
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        }
        
        return false;
    }
    
    /**
     * Update record
     */
    public function update($id, $data) {
        $sets = [];
        
        foreach (array_keys($data) as $key) {
            $sets[] = "{$key} = ?";
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(", ", $sets) . " WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        $types = "";
        $values = [];
        
        foreach ($data as $value) {
            $values[] = $value;
            
            if (is_int($value)) {
                $types .= "i";
            } elseif (is_float($value)) {
                $types .= "d";
            } else {
                $types .= "s";
            }
        }
        
        // Add ID to values and types
        $values[] = $id;
        $types .= "i";
        
        $stmt->bind_param($types, ...$values);
        
        return $stmt->execute();
    }
    
    /**
     * Delete record
     */
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        return $stmt->execute();
    }
}
?>
