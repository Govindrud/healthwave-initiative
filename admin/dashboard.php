
<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: ../admin.php");
    exit();
}

// Check if user has admin role
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../index.php");
    exit();
}

// Database connection
$db_error = false;
$stats = [
    'total_messages' => 0,
    'new_messages' => 0,
    'total_products' => 0,
    'total_orders' => 0,
    'recent_messages' => []
];

try {
    $servername = "localhost";
    $username = "your_db_username"; // Replace with your actual database username
    $password = "your_db_password"; // Replace with your actual database password
    $dbname = "meanttohelp";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Get dashboard statistics
    
    // Total contact messages
    $result = $conn->query("SELECT COUNT(*) as count FROM contact_messages");
    if ($result) {
        $row = $result->fetch_assoc();
        $stats['total_messages'] = $row['count'];
    }
    
    // New/unread contact messages
    $result = $conn->query("SELECT COUNT(*) as count FROM contact_messages WHERE status = 'new'");
    if ($result) {
        $row = $result->fetch_assoc();
        $stats['new_messages'] = $row['count'];
    }
    
    // Total products
    $result = $conn->query("SELECT COUNT(*) as count FROM products");
    if ($result) {
        $row = $result->fetch_assoc();
        $stats['total_products'] = $row['count'];
    }
    
    // Total orders
    $result = $conn->query("SELECT COUNT(*) as count FROM orders");
    if ($result) {
        $row = $result->fetch_assoc();
        $stats['total_orders'] = $row['count'];
    }
    
    // Recent messages
    $result = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $stats['recent_messages'][] = $row;
        }
    }
    
} catch (Exception $e) {
    $db_error = true;
    error_log("Database connection error: " . $e->getMessage());
}

// Close connection
if (!$db_error) {
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - MeantToHelp</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .admin-container {
            display: flex;
            min-height: 100vh;
        }
        
        .admin-sidebar {
            width: 250px;
            background-color: var(--card);
            border-right: 1px solid var(--border);
            padding: 1.5rem;
        }
        
        .admin-content {
            flex: 1;
            padding: 2rem;
            background-color: var(--background);
        }
        
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
        }
        
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background-color: var(--card);
            border-radius: var(--radius);
            padding: 1.5rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .stat-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            color: white;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: var(--muted-foreground);
            font-size: 0.875rem;
        }
        
        .recent-messages {
            background-color: var(--card);
            border-radius: var(--radius);
            padding: 1.5rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .message-list {
            margin-top: 1rem;
        }
        
        .message-item {
            padding: 1rem;
            border-bottom: 1px solid var(--border);
        }
        
        .message-item:last-child {
            border-bottom: none;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .message-name {
            font-weight: 600;
        }
        
        .message-date {
            font-size: 0.875rem;
            color: var(--muted-foreground);
        }
        
        .message-subject {
            margin-bottom: 0.5rem;
        }
        
        .message-preview {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin-bottom: 0.5rem;
        }
        
        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .badge-new {
            background-color: #E0F2FE;
            color: #0369A1;
        }
        
        .badge-read {
            background-color: #F1F5F9;
            color: #64748B;
        }
        
        .badge-replied {
            background-color: #DCFCE7;
            color: #16A34A;
        }
        
        .nav-list {
            list-style: none;
            padding: 0;
        }
        
        .nav-item {
            margin-bottom: 0.5rem;
        }
        
        .nav-link {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-radius: var(--radius);
            color: var(--foreground);
            transition: all 0.2s ease;
        }
        
        .nav-link:hover {
            background-color: var(--secondary);
        }
        
        .nav-link.active {
            background-color: var(--meant-100);
            color: var(--meant-600);
        }
        
        .nav-link i {
            margin-right: 0.75rem;
            width: 1.25rem;
            text-align: center;
        }
        
        .user-welcome {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
        }
        
        .db-error-message {
            background-color: #FEF3C7;
            color: #92400E;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <aside class="admin-sidebar">
            <div class="logo-container" style="margin-bottom: 1.5rem;">
                <div class="logo-icon">
                    <i class="fa-solid fa-brain"></i>
                    <span class="logo-sparkle logo-sparkle-1"><i class="fa-solid fa-sparkle"></i></span>
                    <span class="logo-sparkle logo-sparkle-2"><i class="fa-solid fa-sparkle"></i></span>
                </div>
                <span class="logo-text">MeantToHelp</span>
            </div>
            
            <div class="user-welcome">
                <p>Welcome, <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong></p>
            </div>
            
            <nav>
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="dashboard.php" class="nav-link active">
                            <i class="fa-solid fa-gauge-high"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="messages.php" class="nav-link">
                            <i class="fa-solid fa-envelope"></i>
                            Messages
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="products.php" class="nav-link">
                            <i class="fa-solid fa-box"></i>
                            Products
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="orders.php" class="nav-link">
                            <i class="fa-solid fa-shopping-cart"></i>
                            Orders
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="users.php" class="nav-link">
                            <i class="fa-solid fa-users"></i>
                            Users
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="settings.php" class="nav-link">
                            <i class="fa-solid fa-gear"></i>
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div style="margin-top: 2rem;">
                <a href="logout.php" class="nav-link" style="color: #EF4444;">
                    <i class="fa-solid fa-sign-out-alt"></i>
                    Logout
                </a>
            </div>
        </aside>
        
        <main class="admin-content">
            <header class="admin-header">
                <h1>Dashboard</h1>
                <a href="../index.php" target="_blank" class="secondary-btn">
                    <i class="fa-solid fa-external-link"></i>
                    View Website
                </a>
            </header>
            
            <?php if ($db_error): ?>
                <div class="db-error-message">
                    <strong>Database Connection Error:</strong> Unable to connect to the database. Please check your configuration.
                </div>
            <?php endif; ?>
            
            <section class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon" style="background-color: #0EA5E9;">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="stat-number"><?php echo $stats['total_messages']; ?></div>
                    <div class="stat-label">Total Messages</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="background-color: #10B981;">
                        <i class="fa-solid fa-envelope-open"></i>
                    </div>
                    <div class="stat-number"><?php echo $stats['new_messages']; ?></div>
                    <div class="stat-label">New Messages</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="background-color: #8B5CF6;">
                        <i class="fa-solid fa-box"></i>
                    </div>
                    <div class="stat-number"><?php echo $stats['total_products']; ?></div>
                    <div class="stat-label">Products</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="background-color: #F59E0B;">
                        <i class="fa-solid fa-shopping-cart"></i>
                    </div>
                    <div class="stat-number"><?php echo $stats['total_orders']; ?></div>
                    <div class="stat-label">Total Orders</div>
                </div>
            </section>
            
            <section class="recent-messages">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Recent Messages</h2>
                    <a href="messages.php" class="view-all-btn" style="font-size: 0.875rem;">View All</a>
                </div>
                
                <div class="message-list">
                    <?php if (empty($stats['recent_messages'])): ?>
                        <p>No messages found.</p>
                    <?php else: ?>
                        <?php foreach ($stats['recent_messages'] as $message): ?>
                            <div class="message-item">
                                <div class="message-header">
                                    <div class="message-name"><?php echo htmlspecialchars($message['name']); ?></div>
                                    <div class="message-date"><?php echo date("M d, Y", strtotime($message['created_at'])); ?></div>
                                </div>
                                <div class="message-subject"><?php echo htmlspecialchars($message['subject']); ?></div>
                                <div class="message-preview">
                                    <?php 
                                        $preview = substr($message['message'], 0, 100);
                                        echo htmlspecialchars($preview) . (strlen($message['message']) > 100 ? '...' : ''); 
                                    ?>
                                </div>
                                <div>
                                    <?php
                                        $statusClass = '';
                                        switch ($message['status']) {
                                            case 'new':
                                                $statusClass = 'badge-new';
                                                break;
                                            case 'read':
                                                $statusClass = 'badge-read';
                                                break;
                                            case 'replied':
                                                $statusClass = 'badge-replied';
                                                break;
                                        }
                                    ?>
                                    <span class="badge <?php echo $statusClass; ?>">
                                        <?php echo ucfirst($message['status']); ?>
                                    </span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </section>
        </main>
    </div>
    
    <!-- IMPORTANT: This script tag is required for GPT Engineer functionality. Do not remove. -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>
</html>
