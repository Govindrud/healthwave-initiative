
<?php
require_once 'includes/Model.php';

class SpiritualityModel extends Model {
    public function __construct($conn) {
        parent::__construct($conn, 'priests'); // Default table
    }
    
    public function getPriests() {
        $this->table = 'priests';
        return $this->getAll();
    }
    
    public function getPriest($id) {
        $this->table = 'priests';
        return $this->getById($id);
    }
    
    public function getTours() {
        $this->table = 'tours';
        return $this->getAll();
    }
    
    public function getTour($id) {
        $this->table = 'tours';
        return $this->getById($id);
    }
    
    public function getTestimonials($limit = 5) {
        $this->table = 'testimonials';
        $sql = "SELECT * FROM {$this->table} WHERE category = 'spirituality' LIMIT ?";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $limit);
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
