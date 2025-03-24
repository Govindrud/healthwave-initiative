
# Mental Wellbeing Website

A PHP-based website using MVC (Model-View-Controller) architecture for mental wellbeing services, products, and spiritual guidance.

## Project Structure

The website follows the MVC architecture pattern:

- **Models** (`models/`): Contains database interaction logic
- **Views** (`views/`): Contains the presentation layer
- **Controllers** (`controllers/`): Contains business logic

### Key Files and Directories

- `index.php`: Main entry point for the application
- `includes/config.php`: Configuration settings
- `includes/Router.php`: URL routing system
- `includes/Controller.php`: Base controller class
- `includes/Model.php`: Base model class
- `controllers/`: All controller classes
- `models/`: All model classes
- `views/`: All view files, organized by feature
- `css/`: Stylesheets
- `js/`: JavaScript files
- `images/`: Image assets

## Main Features

1. **Home Page**: Overview of services and products
2. **Products**: Mental wellbeing products
3. **Professional Services**: Doctor consultations
4. **Spiritual Services**: Spiritual guides and sacred tours
5. **Payment Integration**: Secure payment processing with Razorpay

## Navigation

- Home: `/` or `/index.php`
- Doctors: `/doctors.php`
- Spirituality: `/spirituality.php`
- Products: `/products.php`

## Setup Instructions

1. Upload all files to your web server
2. Import the database tables using the SQL files in the `setup/` directory
3. Configure your database connection in `includes/config.php`
4. Ensure your web server has PHP 7.4+ installed
5. Make sure the `images/` directory is writable by the web server

## MVC Explanation

- **Models**: Handle data operations (retrieving, storing, updating)
- **Views**: Display the UI to users
- **Controllers**: Process user inputs, interact with models, and render views

## Adding New Features

To add a new feature (e.g., a Blog section):

1. Create a new model in `models/BlogModel.php`
2. Create a new controller in `controllers/BlogController.php`
3. Create view files in `views/blog/`
4. Add routes in `includes/Router.php`

## Customization

- Design: Edit CSS files in the `css/` directory
- Business Logic: Edit controller files in the `controllers/` directory
- Database Interactions: Edit model files in the `models/` directory
- UI: Edit view files in the `views/` directory
