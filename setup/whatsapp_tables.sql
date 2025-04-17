
-- WhatsApp messages table to store incoming and outgoing messages
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    contact_name VARCHAR(100),
    message_type VARCHAR(20) NOT NULL, -- text, image, audio, video, document, button
    message_content TEXT,
    media_id VARCHAR(100),
    message_id VARCHAR(100),
    is_outgoing TINYINT(1) DEFAULT 0, -- 0 for incoming, 1 for outgoing
    received_at DATETIME,
    sent_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WhatsApp message status updates
CREATE TABLE IF NOT EXISTS whatsapp_message_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    message_id VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- sent, delivered, read, failed
    status_timestamp DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WhatsApp templates
CREATE TABLE IF NOT EXISTS whatsapp_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL,
    template_category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    variables JSON,
    is_approved TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add WhatsApp phone number to customer table if it doesn't exist
ALTER TABLE customers ADD COLUMN IF NOT EXISTS whatsapp_opt_in TINYINT(1) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notification_sent TINYINT(1) DEFAULT 0;
