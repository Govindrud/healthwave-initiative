
<?php
class Model {
    protected $conn;
    protected $table;
    
    public function __construct($conn, $table) {
        $this->conn = $conn;
        $this->table = $table;
    }
    
    public function getAll($limit = null, $offset = null) {
        $sql = "SELECT * FROM {$this->table}";
        
        if ($limit !== null) {
            $sql .= " LIMIT " . (int)$limit;
            
            if ($offset !== null) {
                $sql .= " OFFSET " . (int)$offset;
            }
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
    
    public function create($data) {
        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $types = str_repeat("s", count($data));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param($types, ...array_values($data));
        $result = $stmt->execute();
        
        if ($result) {
            return $this->conn->insert_id;
        }
        
        return false;
    }
    
    public function update($id, $data) {
        $set = [];
        foreach (array_keys($data) as $column) {
            $set[] = "{$column} = ?";
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(", ", $set) . " WHERE id = ?";
        $types = str_repeat("s", count($data)) . "i";
        $values = array_values($data);
        $values[] = $id;
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param($types, ...$values);
        
        return $stmt->execute();
    }
    
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        return $stmt->execute();
    }
    
    public function getWhere($conditions, $limit = null, $offset = null) {
        $where = [];
        $values = [];
        $types = "";
        
        foreach ($conditions as $column => $value) {
            $where[] = "{$column} = ?";
            $values[] = $value;
            $types .= "s";
        }
        
        $sql = "SELECT * FROM {$this->table} WHERE " . implode(" AND ", $where);
        
        if ($limit !== null) {
            $sql .= " LIMIT " . (int)$limit;
            
            if ($offset !== null) {
                $sql .= " OFFSET " . (int)$offset;
            }
        }
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param($types, ...$values);
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
}
?>
