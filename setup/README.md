
# MeantToHelp Website Setup Guide

This guide will help you set up the MeantToHelp website on your shared hosting environment.

## Prerequisites

- A shared hosting account with PHP support (PHP 7.4+ recommended)
- MySQL database
- FTP access to your hosting account

## Installation Steps

1. **Upload Files**

   Upload all files and folders to your hosting account using FTP.

2. **Create Database**

   - Create a new MySQL database through your hosting control panel.
   - Note down the database name, username, and password.

3. **Import Database Structure**

   - Navigate to your hosting's phpMyAdmin or MySQL management tool.
   - Select your newly created database.
   - Click on the "Import" tab.
   - Choose the `setup/database.sql` file and import it.

4. **Configure Database Connection**

   Edit the database connection parameters in these files:
   - `includes/process-contact.php`
   - `includes/featured-products.php`
   
   Update the following lines with your database credentials:
   ```php
   $servername = "localhost";
   $username = "your_db_username"; // Replace with your actual database username
   $password = "your_db_password"; // Replace with your actual database password
   $dbname = "meanttohelp";
   ```

5. **Set Permissions**

   Set appropriate file permissions:
   - Directories: 755 (drwxr-xr-x)
   - Files: 644 (rw-r--r--)

6. **Test the Website**

   Visit your website URL to make sure everything is working properly.

## File Structure

```
meanttohelp/
├── css/
│   └── styles.css
├── images/
│   └── products/
│       ├── anxiety-stones.jpg
│       ├── aromatherapy-diffuser.jpg
│       ├── meditation-cushion.jpg
│       ├── productivity-journal.jpg
│       ├── selfcare-box.jpg
│       ├── sleep-mask.jpg
│       ├── sound-machine.jpg
│       └── weighted-blanket.jpg
├── includes/
│   ├── featured-products.php
│   └── process-contact.php
├── js/
│   ├── contact.js
│   └── main.js
├── setup/
│   ├── database.sql
│   └── README.md (this file)
└── index.php
```

## Admin Access

You can access the admin area at `admin.php` with these credentials:
- Username: admin
- Password: admin123

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
