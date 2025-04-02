
# MeantToHelp Website

A complete website solution for mental wellbeing services including doctor consultations, spiritual guidance, and wellness products.

## Features

- Doctor consultations booking
- Spiritual guides and tours booking
- Wellness product shopping
- Responsive design for all devices
- Integrated payment processing

## Quick Setup Guide

### 1. Database Setup

1. Create a new MySQL database for the project
2. Import the SQL file from `setup/simple_setup.sql` to create all required tables
3. Update database credentials in `includes/Database.php`:

```php
private $db_host = 'localhost';     // Your database host
private $db_user = 'your_username'; // Your database username
private $db_pass = 'your_password'; // Your database password
private $db_name = 'your_database'; // Your database name
```

### 2. Server Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- mod_rewrite enabled (for clean URLs)

### 3. File Structure

The project follows MVC (Model-View-Controller) architecture:

- `models/` - Contains database models
- `views/` - Contains HTML templates
- `controllers/` - Contains business logic
- `includes/` - Contains utility files
- `css/` - Contains stylesheets
- `js/` - Contains JavaScript files
- `images/` - Contains image assets
- `uploads/` - For user-uploaded content

### 4. Common Issues

If you encounter a database connection error:
1. Verify database credentials in `includes/Database.php`
2. Ensure your database server is running
3. Check if the database and tables exist

## Contact

For support or questions, contact us at support@meanttohelp.com
