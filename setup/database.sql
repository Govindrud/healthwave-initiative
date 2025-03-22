
-- Database creation (Run this only if you need to create the database)
-- CREATE DATABASE IF NOT EXISTS meanttohelp_db-353038359294;
-- USE meanttohelp_db-353038359294;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `role` ENUM('admin', 'user') DEFAULT 'user',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact messages table
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'replied') DEFAULT 'new',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products table
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL UNIQUE,
    `short_description` VARCHAR(255),
    `description` TEXT,
    `price` DECIMAL(10, 2) NOT NULL,
    `discount_price` DECIMAL(10, 2),
    `category` VARCHAR(50) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `featured` BOOLEAN DEFAULT 0,
    `badge` ENUM('new', 'sale', 'popular'),
    `stock` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Product features table
CREATE TABLE IF NOT EXISTS `product_features` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `feature` TEXT NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Categories table
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Orders table
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` INT,
    `customer_name` VARCHAR(100) NOT NULL,
    `customer_email` VARCHAR(100) NOT NULL,
    `customer_phone` VARCHAR(20) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    `shipping_address` TEXT,
    `billing_address` TEXT,
    `payment_method` VARCHAR(50),
    `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    `razorpay_payment_id` VARCHAR(100),
    `razorpay_order_id` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Order items table
CREATE TABLE IF NOT EXISTS `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` VARCHAR(50) NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the spiritual_priests table for priest consultations
CREATE TABLE IF NOT EXISTS `spiritual_priests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `expertise` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `hourly_rate` decimal(10,2) NOT NULL,
  `availability` text,
  `rating` decimal(3,1) DEFAULT '5.0',
  `experience_years` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the spiritual_tours table for spiritual places tours
CREATE TABLE IF NOT EXISTS `spiritual_tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `available_dates` text,
  `max_participants` int(11) DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the priest_bookings table
CREATE TABLE IF NOT EXISTS `priest_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `priest_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `booking_datetime` varchar(100) NOT NULL,
  `duration_minutes` int(11) DEFAULT '60',
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `payment_status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `booking_status` enum('scheduled','completed','cancelled','rescheduled') NOT NULL DEFAULT 'scheduled',
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the tour_bookings table
CREATE TABLE IF NOT EXISTS `tour_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `booking_date` date NOT NULL,
  `participants` int(11) NOT NULL DEFAULT '1',
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `payment_status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `booking_status` enum('confirmed','completed','cancelled','rescheduled') NOT NULL DEFAULT 'confirmed',
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample admin user (password: Admin@123)
INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `role`) 
VALUES ('admin', '$2y$10$XQ.LioBTpth9IHsZC6/c3eJa5xGDLWvOZ7vEIFiukjvsQH33gYSxK', 'admin@meanttohelp.com', 'Admin', 'User', 'admin');

-- Insert sample product categories
INSERT INTO `categories` (`name`, `slug`, `description`) VALUES
('Meditation', 'meditation', 'Products to enhance your meditation practice'),
('Sleep', 'sleep', 'Solutions for better sleep quality'),
('Anxiety', 'anxiety', 'Tools to help manage anxiety'),
('Stress', 'stress', 'Products designed to reduce stress'),
('Focus', 'focus', 'Items to improve concentration and focus'),
('Self-care', 'self-care', 'Self-care products for mental wellbeing');

-- Insert sample products
INSERT INTO `products` (`name`, `slug`, `short_description`, `description`, `price`, `category`, `image`, `featured`, `badge`, `stock`) VALUES
('Weighted Blanket', 'weighted-blanket', 'Experience deep relaxation with our premium weighted blanket.', 'Our premium weighted blanket applies gentle pressure across your body to reduce anxiety and improve sleep quality. Made with high-quality, breathable materials for comfort in all seasons.', 89.99, 'sleep', 'images/products/weighted-blanket.jpg', 1, 'popular', 25),
('Meditation Cushion', 'meditation-cushion', 'Enhance your meditation practice with our ergonomic cushion.', 'This ergonomically designed meditation cushion helps maintain proper posture during extended meditation sessions. The buckwheat fill molds to your body while providing essential support.', 49.99, 'meditation', 'images/products/meditation-cushion.jpg', 1, NULL, 40),
('Anxiety Relief Stones', 'anxiety-stones', 'Smooth worry stones made from natural materials.', 'These polished natural stones fit perfectly in your palm, providing a tactile grounding technique during moments of anxiety. Carry them in your pocket for on-the-go anxiety relief.', 24.99, 'anxiety', 'images/products/anxiety-stones.jpg', 1, 'new', 100);

-- Insert sample spiritual priests data
INSERT INTO `spiritual_priests` (`name`, `expertise`, `description`, `image`, `hourly_rate`, `availability`, `rating`, `experience_years`) VALUES
('Swami Anandji', 'Vedic Philosophy', 'Swami Anandji is a renowned Vedic philosopher with over 20 years of experience in guiding spiritual seekers.', 'swami-anandji.jpg', 2500.00, 'Monday to Friday, 9:00 AM to 5:00 PM', 4.9, 20),
('Acharya Priya', 'Bhagavad Gita', 'Acharya Priya specializes in teaching the principles of Bhagavad Gita and applying them to modern life.', 'acharya-priya.jpg', 1800.00, 'Tuesday, Thursday, Saturday, 10:00 AM to 6:00 PM', 4.8, 15),
('Pandit Rajesh', 'Puja Rituals', 'Pandit Rajesh is an expert in traditional Hindu rituals and ceremonies with detailed knowledge of Vedic practices.', 'pandit-rajesh.jpg', 1500.00, 'Monday to Sunday, 7:00 AM to 7:00 PM', 4.7, 25);

-- Insert sample spiritual tours data
INSERT INTO `spiritual_tours` (`name`, `location`, `description`, `image`, `price`, `duration`, `available_dates`, `max_participants`) VALUES
('Varanasi Sacred Journey', 'Varanasi, Uttar Pradesh', 'Experience the spiritual energy of one of the world\'s oldest living cities. Visit sacred ghats, witness the Ganga Aarti, and explore ancient temples.', 'varanasi-tour.jpg', 15000.00, '3 Days', '2023-10-15,2023-11-05,2023-12-10', 15),
('Rishikesh Meditation Retreat', 'Rishikesh, Uttarakhand', 'Join a guided meditation retreat in the yoga capital of the world. Learn meditation techniques and experience the serene Ganges riverside.', 'rishikesh-retreat.jpg', 12000.00, '5 Days', '2023-10-20,2023-11-10,2023-11-25', 12),
('Tirupati Balaji Darshan', 'Tirupati, Andhra Pradesh', 'A guided tour to one of India\'s most visited temples. Skip the queue and experience a peaceful darshan with detailed explanations of the temple\'s significance.', 'tirupati-tour.jpg', 8000.00, '2 Days', '2023-10-01,2023-10-15,2023-11-01,2023-11-15', 20);
