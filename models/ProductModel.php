
<?php
require_once 'includes/Model.php';

class ProductModel extends Model {
    public function __construct($conn) {
        parent::__construct($conn, 'products');
    }
    
    public function getFeaturedProducts($limit = 4) {
        return $this->getWhere(['featured' => 1], $limit);
    }
    
    public function getProductsByCategory($category, $limit = 12, $offset = 0) {
        return $this->getWhere(['category' => $category], $limit, $offset);
    }
    
    public function searchProducts($keyword, $limit = 12, $offset = 0) {
        $sql = "SELECT * FROM {$this->table} WHERE name LIKE ? OR description LIKE ? LIMIT ? OFFSET ?";
        $search = "%{$keyword}%";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssii", $search, $search, $limit, $offset);
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
