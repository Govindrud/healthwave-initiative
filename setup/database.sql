
-- Database creation
CREATE DATABASE IF NOT EXISTS meanttohelp;
USE meanttohelp;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT 0,
    badge ENUM('new', 'sale', 'popular'),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Product features table
CREATE TABLE IF NOT EXISTS product_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    feature TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    billing_address TEXT,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, password, email, first_name, last_name, role) 
VALUES ('admin', '$2y$10$6ELIVww1MxTn9asBZTrO/.FGE/3wxJJshA1QmKSImCIXlKCQCL3JO', 'admin@meanttohelp.com', 'Admin', 'User', 'admin');

-- Insert sample product categories
INSERT INTO categories (name, slug, description) VALUES
('Meditation', 'meditation', 'Products to enhance your meditation practice'),
('Sleep', 'sleep', 'Solutions for better sleep quality'),
('Anxiety', 'anxiety', 'Tools to help manage anxiety'),
('Stress', 'stress', 'Products designed to reduce stress'),
('Focus', 'focus', 'Items to improve concentration and focus'),
('Self-care', 'self-care', 'Self-care products for mental wellbeing');

-- Insert sample products
INSERT INTO products (name, slug, short_description, description, price, category, image, featured, badge, stock) VALUES
('Weighted Blanket', 'weighted-blanket', 'Experience deep relaxation with our premium weighted blanket.', 'Our premium weighted blanket applies gentle pressure across your body to reduce anxiety and improve sleep quality. Made with high-quality, breathable materials for comfort in all seasons.', 89.99, 'sleep', 'images/products/weighted-blanket.jpg', 1, 'popular', 25),
('Meditation Cushion', 'meditation-cushion', 'Enhance your meditation practice with our ergonomic cushion.', 'This ergonomically designed meditation cushion helps maintain proper posture during extended meditation sessions. The buckwheat fill molds to your body while providing essential support.', 49.99, 'meditation', 'images/products/meditation-cushion.jpg', 1, NULL, 40),
('Anxiety Relief Stones', 'anxiety-stones', 'Smooth worry stones made from natural materials.', 'These polished natural stones fit perfectly in your palm, providing a tactile grounding technique during moments of anxiety. Carry them in your pocket for on-the-go anxiety relief.', 24.99, 'anxiety', 'images/products/anxiety-stones.jpg', 1, 'new', 100),
('White Noise Machine', 'sound-machine', 'Create a peaceful sound environment for better sleep and focus.', 'Our white noise machine offers multiple sound options including white noise, rainfall, ocean waves, and more to mask disruptive environmental sounds and create a peaceful atmosphere for sleep, work, or relaxation.', 59.99, 'sleep', 'images/products/sound-machine.jpg', 0, NULL, 30),
('Aromatherapy Diffuser', 'aromatherapy-diffuser', 'Disperse calming essential oils throughout your space.', 'This ultrasonic diffuser quietly disperses essential oils into the air, creating a soothing atmosphere that can reduce stress and anxiety. Features adjustable mist levels and timer settings.', 45.99, 'stress', 'images/products/aromatherapy-diffuser.jpg', 0, NULL, 20),
('Sleep Mask', 'sleep-mask', 'Block out light for deeper, more restful sleep.', 'Our premium sleep mask is designed with contoured cups that allow your eyes to blink freely while completely blocking out light. The soft, breathable fabric and adjustable strap ensure comfort all night long.', 29.99, 'sleep', 'images/products/sleep-mask.jpg', 0, 'sale', 50),
('Productivity Journal', 'productivity-journal', 'Track goals, habits, and daily reflections.', 'This thoughtfully designed journal combines daily planning with gratitude practice and goal setting to improve focus and mental clarity. Includes prompts to support your mental wellbeing journey.', 24.99, 'focus', 'images/products/productivity-journal.jpg', 0, NULL, 35),
('Self-Care Box', 'selfcare-box', 'A curated collection of self-care essentials.', 'Our monthly self-care box delivers handpicked products to support your mental wellbeing, including teas, bath products, mindfulness activities, and inspirational items. Each box follows a seasonal theme.', 49.99, 'self-care', 'images/products/selfcare-box.jpg', 0, NULL, 15);

-- Insert product features
INSERT INTO product_features (product_id, feature) VALUES
(1, 'Available in multiple weights (10, 15, and 20 lbs)'),
(1, 'Removable, machine-washable cover'),
(1, 'Even weight distribution for comfortable pressure'),
(1, 'Breathable fabric suitable for all seasons'),
(2, 'Ergonomic design for proper spine alignment'),
(2, 'Natural buckwheat hull filling with supportive firmness'),
(2, 'Removable, washable organic cotton cover'),
(2, 'Handle for easy carrying to meditation sessions'),
(3, 'Set of 3 stones in different natural materials'),
(3, 'Pocket-sized for on-the-go anxiety relief'),
(3, 'Smooth, polished surface for tactile stimulation'),
(3, 'Includes carrying pouch');

-- Create sample contact messages
INSERT INTO contact_messages (name, email, subject, message, status) VALUES
('John Smith', 'john@example.com', 'Question about meditation products', 'Hi, I would like to know more about the meditation cushion. Is it suitable for beginners?', 'new'),
('Jane Doe', 'jane@example.com', 'Order status inquiry', 'I placed an order three days ago (Order #1234) and haven\'t received a shipping confirmation. Could you please check the status?', 'read'),
('Michael Johnson', 'michael@example.com', 'Partnership opportunity', 'Our company provides mental health workshops and we\'re interested in partnering with MeantToHelp. Who should I contact to discuss this further?', 'replied');
