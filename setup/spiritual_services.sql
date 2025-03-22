
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
  `razorpay_payment_id` varchar(100) NOT NULL,
  `razorpay_order_id` varchar(100) NOT NULL,
  `payment_date` datetime NOT NULL,
  `booking_status` enum('scheduled','completed','cancelled','rescheduled') NOT NULL DEFAULT 'scheduled',
  `notes` text,
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
  `razorpay_payment_id` varchar(100) NOT NULL,
  `razorpay_order_id` varchar(100) NOT NULL,
  `payment_date` datetime NOT NULL,
  `booking_status` enum('confirmed','completed','cancelled','rescheduled') NOT NULL DEFAULT 'confirmed',
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
