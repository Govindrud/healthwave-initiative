
# MeantToHelp Website Setup Guide

This comprehensive guide will help you set up the MeantToHelp website on your shared hosting environment, specifically optimized for ServerbYT.in hosting.

## Prerequisites

- A shared hosting account with PHP 7.4+ support
- MySQL/MariaDB database
- FTP access to your hosting account
- Razorpay account for payment processing (optional)
- SMS gateway account for notifications (optional)

## Installation Steps

### 1. Upload Files

Upload all files and folders to your hosting account using FTP or the file manager in your hosting control panel.

### 2. Create Database

- Create a new MySQL database through your hosting control panel.
- Note down the database name, username, and password.
- For ServerbYT.in, you'll use the provided credentials:
  - Database name: `meanttohelp_db-353038359294`
  - Username: `Admin-ef1e`
  - Password: `1=XBb=hME^e8`

### 3. Import Database Structure

- Navigate to your hosting's phpMyAdmin or MySQL management tool.
- Select your newly created database.
- Click on the "Import" tab.
- Choose the `setup/database.sql` file and import it.

### 4. Configure Database Connection

Edit the database connection parameters in `includes/config.php`:

```php
$db_host = 'localhost';
$db_user = 'Admin-ef1e';
$db_pass = '1=XBb=hME^e8';
$db_name = 'meanttohelp_db-353038359294';
```

### 5. Set Up Razorpay (for Payment Processing)

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API Key ID and Secret from the Razorpay Dashboard
3. Update the Razorpay credentials in `js/razorpay-config.js`:
   ```javascript
   const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXX"; // Replace with your actual Razorpay Key ID
   ```
4. Update the Razorpay credentials in `includes/verify-payment.php`:
   ```php
   $razorpay_key_id = 'rzp_test_XXXXXXXXXX';
   $razorpay_key_secret = 'XXXXXXXXXXXXXXXXXXXXXXXX';
   ```

### 6. Set Up SMS Gateway (Optional)

To enable SMS notifications when bookings are confirmed:

1. Sign up for an SMS gateway service like MSG91, Twilio, etc.
2. Update the SMS sending function in `includes/verify-payment.php` with your SMS gateway credentials.

### 7. Set Permissions

Set appropriate file permissions:
- Directories: 755 (drwxr-xr-x)
- Files: 644 (rw-r--r--)
- For ServerbYT.in, these permissions are usually set correctly by default.

### 8. Create Required Directories

Make sure the following directories exist and are writable:
- `images/priests/`
- `images/tours/`
- `images/testimonials/`
- `uploads/`

### 9. Test the Website

Visit your website URL to make sure everything is working properly.

## File Structure & Architecture

The website follows an MVC-like architecture for better organization:

```
meanttohelp/
├── css/                      # Stylesheets
│   ├── styles.css            # Main styles
│   ├── spirituality.css      # Spirituality page styles
│   └── [other CSS files]
├── images/                   # Image assets
│   ├── priests/              # Priest/spiritual guide images
│   ├── tours/                # Spiritual tours images
│   ├── testimonials/         # Testimonial user images
│   └── products/             # Product images
├── includes/                 # PHP includes and helpers
│   ├── config.php            # Database connection and site configuration
│   ├── header.php            # Site header
│   ├── footer.php            # Site footer
│   ├── verify-payment.php    # Payment verification handler
│   └── [other include files]
├── js/                       # JavaScript files
│   ├── main.js               # Main JavaScript
│   ├── spirituality.js       # Spirituality page functionality
│   ├── razorpay-config.js    # Razorpay integration
│   └── [other JS files]
├── setup/                    # Setup files
│   ├── database.sql          # Main database structure
│   ├── spiritual_services.sql# Spirituality-specific tables
│   └── README.md             # This setup guide
└── [PHP pages]               # Main PHP pages (index.php, spirituality.php, etc.)
```

### MVC Pattern Implementation

- **Model**: Database interactions in the controller classes and includes
- **View**: PHP templates with HTML/CSS for presentation
- **Controller**: PHP classes that handle business logic and data manipulation

## Admin Access

You can access the admin area at `admin.php` with these credentials:
- Username: admin
- Password: Admin@123

## Customization

### Adding More Spiritual Priests

1. Upload priest images to the `images/priests/` directory
2. Add new records to the `spiritual_priests` table in the database

### Adding More Spiritual Tours

1. Upload tour images to the `images/tours/` directory
2. Add new records to the `spiritual_tours` table in the database

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Error**
   - Check database credentials in `includes/config.php`
   - Ensure the database exists and user has proper permissions

2. **Images Not Displaying**
   - Verify image paths and file permissions
   - Check that image directories exist and are writable

3. **Payment Processing Failures**
   - Confirm Razorpay API keys are correct
   - Check browser console for JavaScript errors
   - Verify server PHP version (PHP 7.4+ recommended)

4. **SMS Notifications Not Sending**
   - Verify SMS gateway credentials
   - Check SMS gateway API endpoint in the code
   - Enable error logging for the SMS function

## Support

If you encounter any issues during setup, please contact support@meanttohelp.com or call +918329116329.

## Company Information

TechD Headquarters
TechD, Bhugaon
Near Chandni Chowk
Pune, Maharashtra
India - 411042

## Security Recommendations

- Change the default admin password immediately after installation
- Set up proper backup routines for your files and database
- Consider implementing HTTPS for secure connections
- Regularly update your PHP version
- Keep backup copies of all configuration files

## ServerbYT.in Specific Notes

This setup is optimized for ServerbYT.in hosting with the following considerations:
- Uses PHP and MySQL which are fully supported
- Avoids Node.js, Django, and other unsupported technologies
- Simple file structure that works with standard hosting
- Uses standard MariaDB/MySQL for database operations

