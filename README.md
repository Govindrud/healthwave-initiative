
# MeantToHelp Website

This is a PHP-based website for MeantToHelp, supporting mental well-being through products and services including therapy, spiritual guidance, and community support.

## Setup Instructions

### Prerequisites

- PHP 7.2 or higher
- MySQL 5.7 or higher
- Apache or Nginx web server
- Your server should support .htaccess files (for Apache)

### Installation Steps

1. **Database Setup**
   - Create a database on your MySQL server
   - Import the SQL file from `setup/database.sql` to create all necessary tables and sample data
   - The database already includes sample data for products, spiritual services, and an admin user

2. **File Upload**
   - Upload all files to your web server
   - Ensure the following directories are writable by the web server:
     - `/uploads`
     - `/images`
     - `/logs` (if present)

3. **Configuration**
   - The database connection is already configured in `includes/config.php` with your provided credentials:
     - Username: Admin-ef1e
     - Password: 1=XBb=hME^e8
     - Database: meanttohelp_db-353038359294
   - If you need to change these details, edit the `includes/config.php` file

4. **Payment Gateway Setup**
   - Update your Razorpay API keys in the `js/razorpay-config.js` file:
     ```javascript
     const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXX'; // Replace with your Razorpay Key ID
     ```
   - Also update the server-side keys in `includes/verify-payment.php` if necessary

5. **SMS Notifications**
   - The site is configured to send SMS notifications for bookings
   - To enable this feature, update the `sendSmsNotification` function in `models/SpiritualityModel.php` with your SMS gateway API details

### Admin Access

- Admin panel URL: `/admin.php`
- Default admin credentials:
  - Username: admin
  - Password: admin123

### Directory Structure

The website follows the MVC (Model-View-Controller) architecture:

- `/models` - Contains database models
- `/views` - Contains template files
- `/controllers` - Contains controller logic
- `/includes` - Contains configuration and shared files
- `/js` - Contains JavaScript files
- `/css` - Contains CSS stylesheets
- `/images` - Contains images
- `/uploads` - Directory for user uploaded files

### Available Pages

- Home: `/` or `/index.php`
- Spirituality: `/spirituality.php`
- Doctors: `/doctors.php` 
- Products: `/products.php`
- Admin Panel: `/admin.php`

## Customization

### Adding New Products

1. Add product details to the `products` table in the database
2. Upload product images to the `/images/products` directory

### Adding New Spiritual Guides

1. Add guide details to the `spiritual_priests` table in the database
2. Upload guide images to the `/images/priests` directory

### Adding New Spiritual Tours

1. Add tour details to the `spiritual_tours` table in the database
2. Upload tour images to the `/images/tours` directory

## Troubleshooting

### Page Not Found Errors

- Ensure your server is configured to handle PHP files
- Check if mod_rewrite is enabled for Apache
- Verify .htaccess settings if using URL rewriting

### Database Connection Issues

- Verify database credentials in `includes/config.php`
- Ensure your database server is running
- Check if your database user has proper permissions

### Payment Integration Issues

- Verify Razorpay API keys
- Check browser console for JavaScript errors
- Review payment logs in Razorpay dashboard

## Support

For support or questions, please contact:
- Email: support@meanttohelp.com
