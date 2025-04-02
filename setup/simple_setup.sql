
-- Simple Database Setup for MeantToHelp
-- Run this script to create the necessary tables for your website

-- Create tables for spiritual priests
CREATE TABLE IF NOT EXISTS `spiritual_priests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `expertise` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `experience_years` int(11) NOT NULL,
  `hourly_rate` decimal(10,2) NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample priest data
INSERT INTO `spiritual_priests` (`name`, `expertise`, `description`, `experience_years`, `hourly_rate`, `rating`, `image`, `available`) VALUES
('Swami Anandji', 'Meditation & Yoga', 'Swami Anandji has been practicing meditation and yoga for over 20 years and guiding individuals on their spiritual journey.', 20, 1500.00, 4.8, 'swami-anandji.jpg', 1),
('Acharya Priya', 'Bhagavad Gita & Vedanta', 'Acharya Priya is an expert in Bhagavad Gita and Vedanta philosophy, helping people apply ancient wisdom to modern life challenges.', 15, 1200.00, 4.7, 'acharya-priya.jpg', 1),
('Guru Raghav', 'Spiritual Healing', 'Guru Raghav specializes in spiritual healing techniques that help overcome emotional and mental barriers for holistic wellbeing.', 18, 1800.00, 4.9, 'guru-raghav.jpg', 1);

-- Create tables for spiritual tours
CREATE TABLE IF NOT EXISTS `spiritual_tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `duration` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `max_participants` int(11) NOT NULL,
  `available_dates` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample tour data
INSERT INTO `spiritual_tours` (`name`, `location`, `description`, `duration`, `price`, `max_participants`, `available_dates`, `image`) VALUES
('Varanasi Sacred Journey', 'Varanasi, Uttar Pradesh', 'Experience the spiritual energy of one of the oldest living cities in the world. Visit sacred ghats, witness aarti ceremonies, and connect with ancient traditions.', '3 Days', 5000.00, 12, '2023-09-15,2023-10-05,2023-11-10', 'varanasi-tour.jpg'),
('Rishikesh Meditation Retreat', 'Rishikesh, Uttarakhand', 'Immerse yourself in meditation and yoga practices in the yoga capital of the world, nestled in the foothills of the Himalayas along the sacred Ganges River.', '5 Days', 8000.00, 10, '2023-09-20,2023-10-15,2023-11-25', 'rishikesh-retreat.jpg'),
('Golden Temple Spiritual Tour', 'Amritsar, Punjab', 'Visit the Golden Temple, a symbol of human brotherhood and equality, and learn about Sikh traditions and spirituality through guided experiences.', '2 Days', 3500.00, 15, '2023-09-10,2023-10-08,2023-11-12', 'golden-temple.jpg');

-- Create tables for priest bookings
CREATE TABLE IF NOT EXISTS `priest_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `priest_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(15) NOT NULL,
  `booking_datetime` varchar(50) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'Razorpay',
  `payment_status` varchar(20) DEFAULT 'pending',
  `booking_status` varchar(20) DEFAULT 'scheduled',
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create tables for tour bookings
CREATE TABLE IF NOT EXISTS `tour_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `customer_phone` varchar(15) NOT NULL,
  `booking_date` date NOT NULL,
  `participants` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'Razorpay',
  `payment_status` varchar(20) DEFAULT 'pending',
  `booking_status` varchar(20) DEFAULT 'confirmed',
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create products table if not exists
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `stock` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample product data if table is empty
INSERT INTO `products` (`name`, `description`, `price`, `sale_price`, `image`, `category`, `featured`, `stock`)
SELECT * FROM (
  SELECT 'Meditation Cushion', 'Comfortable cushion designed for long meditation sessions.', 1200.00, 999.00, 'meditation-cushion.jpg', 'Meditation', 1, 50 UNION ALL
  SELECT 'Aromatherapy Diffuser', 'Essential oil diffuser for creating a calming atmosphere.', 1500.00, 1299.00, 'aromatherapy-diffuser.jpg', 'Wellness', 1, 35 UNION ALL
  SELECT 'Sleep Mask', 'Silk sleep mask for better rest and relaxation.', 500.00, 399.00, 'sleep-mask.jpg', 'Sleep', 1, 100 UNION ALL
  SELECT 'Weighted Blanket', 'Therapeutic weighted blanket for anxiety relief and better sleep.', 3500.00, 2999.00, 'weighted-blanket.jpg', 'Sleep', 1, 25
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `products` LIMIT 1);
