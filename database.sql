
-- Database creation script for MeantToHelp 
-- This script will create all necessary tables for the application

-- Create database
CREATE DATABASE IF NOT EXISTS meanttohelp;
USE meanttohelp;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    stock INT DEFAULT 0,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    rate DECIMAL(10, 2) NOT NULL,
    years_experience INT,
    qualifications TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Priests (Spiritual Guides) table
CREATE TABLE IF NOT EXISTS priests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    rate DECIMAL(10, 2) NOT NULL,
    years_experience INT,
    background TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tours table
CREATE TABLE IF NOT EXISTS tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT,
    dates TEXT NOT NULL, -- Comma separated dates
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    max_participants INT DEFAULT 20,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_type ENUM('product', 'doctor_consultation', 'priest_consultation', 'tour_booking') NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    item_id INT NOT NULL, -- Product ID, Doctor ID, Priest ID, or Tour ID
    booking_datetime DATETIME, -- For consultations and tours
    duration INT DEFAULT 0, -- For consultations (in minutes)
    participants INT DEFAULT 0, -- For tours
    notes TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_id VARCHAR(255),
    payment_method ENUM('card', 'upi', 'bank_transfer', 'cod') DEFAULT 'card',
    payment_date DATETIME,
    razorpay_order_id VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    avatar VARCHAR(255),
    location VARCHAR(100),
    rating INT DEFAULT 5,
    category ENUM('product', 'doctor', 'spirituality', 'general') DEFAULT 'general',
    approved BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    responded BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for products
INSERT INTO products (name, description, price, category, image, stock, featured) VALUES
('Mindfulness Journal', 'A guided journal to help develop mindfulness practices in daily life', 499.00, 'books', '/images/products/journal.jpg', 50, 1),
('Meditation Cushion', 'Comfortable cushion designed for extended meditation sessions', 1299.00, 'meditation', '/images/products/cushion.jpg', 25, 1),
('Essential Oil Diffuser', 'Aromatherapy diffuser with calming essential oils', 1999.00, 'wellness', '/images/products/diffuser.jpg', 15, 1),
('Therapeutic Light Lamp', 'Special lamp designed to help with seasonal affective disorder', 2499.00, 'therapy', '/images/products/light-lamp.jpg', 10, 1);

-- Sample data for priests
INSERT INTO priests (name, specialty, description, image, rate, years_experience, background) VALUES
('Swami Ananda', 'Yoga & Meditation', 'Swami Ananda specializes in traditional yoga practices and meditation techniques that promote mental harmony and spiritual growth.', '/images/priests/ananda.jpg', 1500.00, 15, 'Trained in traditional Himalayan ashrams with over 15 years of experience guiding spiritual seekers.'),
('Guru Priya', 'Vedic Counseling', 'Guru Priya offers wisdom from ancient Vedic traditions to help navigate modern life challenges and find purpose.', '/images/priests/priya.jpg', 1200.00, 12, 'Scholar of Vedic philosophy with expertise in applying ancient wisdom to contemporary problems.'),
('Acharya Ramesh', 'Spiritual Healing', 'Acharya Ramesh combines various spiritual practices to promote holistic healing of mind, body, and spirit.', '/images/priests/ramesh.jpg', 1800.00, 20, 'Master healer trained in multiple spiritual traditions including Reiki, pranic healing, and sound therapy.');

-- Sample data for tours
INSERT INTO tours (name, location, description, dates, image, price, max_participants) VALUES
('Rishikesh Retreat', 'Rishikesh, Uttarakhand', 'A transformative 7-day retreat in the yoga capital of the world, with meditation by the Ganges River.', '2025-05-15,2025-06-20,2025-07-25', '/images/tours/rishikesh.jpg', 25000.00, 15),
('Varanasi Spiritual Journey', 'Varanasi, Uttar Pradesh', 'Experience the spiritual energy of one of the world\'s oldest living cities in this 5-day guided tour.', '2025-06-05,2025-07-10,2025-08-15', '/images/tours/varanasi.jpg', 18000.00, 12),
('Dharamshala Meditation Retreat', 'Dharamshala, Himachal Pradesh', 'A 10-day silent meditation retreat in the serene Himalayan foothills, home of the Dalai Lama.', '2025-05-10,2025-06-15,2025-09-05', '/images/tours/dharamshala.jpg', 30000.00, 10);

-- Sample data for testimonials
INSERT INTO testimonials (name, message, avatar, location, rating, category, approved) VALUES
('Rahul Sharma', 'The spiritual consultation with Guru Priya was life-changing. I gained clarity on issues that had been troubling me for years.', '/images/testimonials/rahul.jpg', 'Mumbai', 5, 'spirituality', 1),
('Priya Singh', 'The Rishikesh retreat was an amazing experience. The peaceful environment and spiritual practices helped me reconnect with myself.', '/images/testimonials/priya.jpg', 'Delhi', 5, 'spirituality', 1),
('Anil Kumar', 'Swami Ananda\'s guidance has helped me develop a consistent meditation practice that has reduced my anxiety significantly.', '/images/testimonials/anil.jpg', 'Bangalore', 5, 'spirituality', 1);
