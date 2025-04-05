
# MeantToHelp - Mental Health Support Project

A comprehensive mental health support platform built with HTML, CSS, JavaScript, and PHP.

## Project Overview

MeantToHelp is designed to provide resources, services, and products for mental well-being. The platform offers:

- Mental health products
- Professional doctor consultations
- Spiritual guidance services
- Sacred tours for mental rejuvenation

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP 7.4+
- **Database**: MySQL
- **Payment Gateway**: Razorpay
- **Other Libraries**: Font Awesome, Google Fonts

## Setup Instructions

### Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/meanttohelp.git
cd meanttohelp
```

2. **Set up the database**

- Create a new MySQL database
- Import the database schema from `database.sql`

```bash
mysql -u username -p database_name < database.sql
```

3. **Configure the application**

- Update database connection details in `includes/Database.php`
- Set Razorpay API keys in `includes/constants.php`

4. **Set up the web server**

- Point your web server document root to the project root directory
- Ensure `mod_rewrite` is enabled if using Apache

5. **Set folder permissions**

```bash
chmod -R 755 .
chmod -R 777 uploads/
```

## Project Structure

```
├── controllers/     # PHP controller files
├── css/            # CSS stylesheets
├── images/         # Image assets
├── includes/       # Core PHP includes
├── js/            # JavaScript files
├── models/         # PHP model files
├── uploads/        # Uploaded files
└── views/          # PHP view templates
```

## Features

- User authentication
- Product browsing and purchasing
- Doctor/Priest consultation booking
- Spiritual tour booking
- Razorpay and UPI payment integration
- Responsive design

## Development

### Adding New Pages

1. Create a new controller in the `controllers/` directory
2. Create corresponding views in the `views/` directory
3. Add a new route in the `includes/Router.php` file

### Adding New Features

1. Implement the database changes if necessary
2. Create or update relevant models in `models/`
3. Implement controller logic in `controllers/`
4. Create view templates in `views/`

## Deployment

1. Upload all files to your production server
2. Import the database schema
3. Update configuration files with production settings
4. Set up cron jobs if necessary

## License

[MIT License](LICENSE)
