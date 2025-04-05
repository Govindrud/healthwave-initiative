
<?php
class Model {
    protected $conn;
    protected $table;
    
    public function __construct($conn, $table) {
        $this->conn = $conn;
        $this->table = $table;
    }
    
    public function getAll($limit = 0, $offset = 0) {
        $sql = "SELECT * FROM {$this->table}";
        
        if ($limit > 0) {
            $sql .= " LIMIT ?";
            if ($offset > 0) {
                $sql .= " OFFSET ?";
            }
        }
        
        $stmt = $this->conn->prepare($sql);
        
        if ($limit > 0) {
            if ($offset > 0) {
                $stmt->bind_param("ii", $limit, $offset);
            } else {
                $stmt->bind_param("i", $limit);
            }
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
    
    public function getWhere(array $conditions, $limit = 0, $offset = 0) {
        $sql = "SELECT * FROM {$this->table} WHERE ";
        
        $whereConditions = [];
        $types = '';
        $values = [];
        
        foreach ($conditions as $field => $value) {
            $whereConditions[] = "{$field} = ?";
            $types .= $this->getParamType($value);
            $values[] = $value;
        }
        
        $sql .= implode(" AND ", $whereConditions);
        
        if ($limit > 0) {
            $sql .= " LIMIT ?";
            $types .= "i";
            $values[] = $limit;
            
            if ($offset > 0) {
                $sql .= " OFFSET ?";
                $types .= "i";
                $values[] = $offset;
            }
        }
        
        $stmt = $this->conn->prepare($sql);
        
        if (!empty($values)) {
            $stmt->bind_param($types, ...$values);
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
    
    public function create(array $data) {
        $fields = array_keys($data);
        $placeholders = array_fill(0, count($fields), '?');
        
        $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $this->conn->prepare($sql);
        
        $types = '';
        $values = [];
        
        foreach ($data as $value) {
            $types .= $this->getParamType($value);
            $values[] = $value;
        }
        
        $stmt->bind_param($types, ...$values);
        
        if ($stmt->execute()) {
            return $this->conn->insert_id;
        }
        
        return false;
    }
    
    public function update($id, array $data) {
        $fields = array_keys($data);
        $updateFields = [];
        
        foreach ($fields as $field) {
            $updateFields[] = "{$field} = ?";
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        $types = '';
        $values = [];
        
        foreach ($data as $value) {
            $types .= $this->getParamType($value);
            $values[] = $value;
        }
        
        $types .= 'i';  // For the ID in WHERE clause
        $values[] = $id;
        
        $stmt->bind_param($types, ...$values);
        
        return $stmt->execute();
    }
    
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
    
    private function getParamType($value) {
        if (is_int($value)) {
            return 'i';
        } else if (is_float($value)) {
            return 'd';
        } else if (is_string($value)) {
            return 's';
        } else {
            return 'b';  // BLOB
        }
    }
}
?>
