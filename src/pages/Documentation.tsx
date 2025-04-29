
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Database, FileText, GitBranch, Package, Server } from "lucide-react";

const Documentation = () => {
  React.useEffect(() => {
    document.title = "MeantToHelp - Project Documentation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">MeantToHelp Project Documentation</h1>
            <p className="text-lg text-gray-600 mb-6">
              Technical documentation and guides for the MeantToHelp mental health support application
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
              <TabsTrigger value="versioning">Versioning</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="text-meant-600" />
                    Project Overview
                  </CardTitle>
                  <CardDescription>
                    General information about the MeantToHelp application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Introduction</h3>
                    <p className="text-gray-600">
                      MeantToHelp is a comprehensive mental health support platform designed to provide accessible 
                      resources, professional consultations, and community support for individuals seeking mental 
                      wellness solutions. The platform connects users with qualified professionals, offers self-help tools, 
                      and creates a supportive community environment.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Professional doctor consultations and bookings</li>
                      <li>Student psychologist services at affordable rates</li>
                      <li>Spiritual guidance and wellness resources</li>
                      <li>Corporate mental health solutions</li>
                      <li>Mental health products marketplace</li>
                      <li>Peer support groups and community features</li>
                      <li>Voice assistant for mental health support</li>
                      <li>Addiction recovery resources and programs</li>
                      <li>Goal setting and progress tracking tools</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Target Audience</h3>
                    <p className="text-gray-600">
                      - Individual users seeking mental health support<br/>
                      - Corporate organizations looking to implement wellness programs<br/>
                      - Mental health professionals wanting to offer services<br/>
                      - Educational institutions and students studying psychology
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tech-stack" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="text-meant-600" />
                    Technology Stack
                  </CardTitle>
                  <CardDescription>
                    Technologies used in building the MeantToHelp application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Frontend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Badge variant="outline" className="py-2 justify-center">React 18.3.1</Badge>
                      <Badge variant="outline" className="py-2 justify-center">TypeScript 5.0+</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Vite 4.3+</Badge>
                      <Badge variant="outline" className="py-2 justify-center">React Router 6.26.2</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Tailwind CSS 3.3+</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Framer Motion 12.9.2</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Shadcn UI</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Sonner 1.5.0</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Lucide Icons 0.462.0</Badge>
                      <Badge variant="outline" className="py-2 justify-center">React Hook Form 7.53.0</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Zod 3.23.8</Badge>
                      <Badge variant="outline" className="py-2 justify-center">TanStack Query 5.56.2</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Recharts 2.12.7</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Backend</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Badge variant="outline" className="py-2 justify-center">Supabase JS 2.49.4</Badge>
                      <Badge variant="outline" className="py-2 justify-center">PHP 8.0+</Badge>
                      <Badge variant="outline" className="py-2 justify-center">MySQL</Badge>
                      <Badge variant="outline" className="py-2 justify-center">REST API</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Integrations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Badge variant="outline" className="py-2 justify-center">Razorpay</Badge>
                      <Badge variant="outline" className="py-2 justify-center">WhatsApp Business API</Badge>
                      <Badge variant="outline" className="py-2 justify-center">Google Sheets API</Badge>
                      <Badge variant="outline" className="py-2 justify-center">HuggingFace Models</Badge>
                      <Badge variant="outline" className="py-2 justify-center">ElevenLabs Voice API</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Development Tools</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Badge variant="outline" className="py-2 justify-center">Git</Badge>
                      <Badge variant="outline" className="py-2 justify-center">ESLint</Badge>
                      <Badge variant="outline" className="py-2 justify-center">npm/Bun</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-meant-600" />
                    Project Structure
                  </CardTitle>
                  <CardDescription>
                    Understanding the organization of the codebase
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <pre className="text-xs md:text-sm p-4 bg-gray-900 text-gray-100 rounded-md">
{`meanttohelp/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── navbar/         # Navigation components
│   │   ├── partners/       # Partner-related components
│   │   ├── voice/          # Voice assistant components
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Homepage
│   │   ├── Doctors.tsx     # Doctors listing page
│   │   ├── Services.tsx    # Services listing page
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── data/               # Mock data and constants
│   ├── styles/             # Global styles and theme variables
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types/interfaces
│   ├── services/           # API service layers
│   ├── lib/                # Library configurations
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── ...
├── public/                 # Public assets
│   ├── images/             # Image assets
│   └── ...
├── php/                    # PHP backend files
│   ├── includes/           # Common PHP includes
│   ├── controllers/        # MVC controllers
│   ├── models/             # Data models
│   └── views/              # View templates
├── setup/                  # Database setup scripts
├── config/                 # Configuration files
└── ...`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Directories</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li><strong>components/</strong> - All React components organized by feature or functionality</li>
                      <li><strong>pages/</strong> - Top-level page components that represent routes in the application</li>
                      <li><strong>hooks/</strong> - Custom React hooks for shared logic</li>
                      <li><strong>context/</strong> - React context providers for state management</li>
                      <li><strong>php/</strong> - Backend PHP code handling server-side processing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Component Organization</h3>
                    <p className="text-gray-600">
                      Components are organized according to feature or functionality. Shared components are 
                      placed in their respective folders, and page-specific components are located within 
                      the pages directory. We utilize a component-based architecture with Shadcn UI components 
                      as the foundation for consistent design patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="text-meant-600" />
                    Database Management
                  </CardTitle>
                  <CardDescription>
                    Database structure and management information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Database Architecture</h3>
                    <p className="text-gray-600">
                      The application uses a dual database approach:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600 mt-2">
                      <li><strong>MySQL Database</strong> - For primary application data, accessed via PHP backend</li>
                      <li><strong>Supabase</strong> - For user authentication and real-time features</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Database Tables</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left font-medium">Table</th>
                            <th className="p-3 text-left font-medium">Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-3 font-medium">users</td>
                            <td className="p-3 text-gray-600">User accounts and authentication data</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">doctors</td>
                            <td className="p-3 text-gray-600">Doctor profiles and availability</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">products</td>
                            <td className="p-3 text-gray-600">Product details and inventory</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">bookings</td>
                            <td className="p-3 text-gray-600">User appointment bookings</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">orders</td>
                            <td className="p-3 text-gray-600">Product order information</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">payments</td>
                            <td className="p-3 text-gray-600">Payment transaction records</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">spiritual_services</td>
                            <td className="p-3 text-gray-600">Spiritual services and providers</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">whatsapp_messages</td>
                            <td className="p-3 text-gray-600">WhatsApp integration messages</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Database Setup</h3>
                    <p className="text-gray-600">
                      Database initialization scripts are located in the <code>setup/</code> directory. 
                      To set up a fresh database instance:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600 mt-2">
                      <li>Create a MySQL database</li>
                      <li>Run <code>setup/database.sql</code> for core tables</li>
                      <li>Run specialized scripts like <code>payment_tables.sql</code> and <code>spiritual_services.sql</code></li>
                      <li>Configure database connection in <code>includes/config.php</code></li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deployment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="text-meant-600" />
                    Deployment
                  </CardTitle>
                  <CardDescription>
                    Information on deploying the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Deployment Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Web server with PHP 8.0+ support</li>
                      <li>MySQL database server</li>
                      <li>Node.js environment for frontend builds</li>
                      <li>SSL certificate for secure connections</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Frontend Deployment</h3>
                    <p className="text-gray-600 mb-2">
                      The React frontend can be deployed using:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                      <li>Run <code>npm run build</code> to generate optimized static files</li>
                      <li>Upload the contents of the <code>dist/</code> directory to the web server</li>
                      <li>Configure web server to serve the static files and handle client-side routing</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Backend Deployment</h3>
                    <p className="text-gray-600 mb-2">
                      To deploy the PHP backend:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                      <li>Upload all PHP files to the server</li>
                      <li>Configure database connection in <code>includes/config.php</code></li>
                      <li>Set up appropriate file permissions</li>
                      <li>Configure server for API endpoints and PHP processing</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
                    <p className="text-gray-600">
                      The application requires several environment variables for proper functioning:
                    </p>
                    <div className="bg-gray-100 p-3 rounded mt-2">
                      <pre className="text-xs overflow-x-auto">
{`# API Keys
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Database Configuration
DB_HOST=localhost
DB_USER=db_username
DB_PASS=db_password
DB_NAME=meanttohelp

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# WhatsApp API Configuration
WHATSAPP_API_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_ID=your_whatsapp_phone_id`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="versioning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="text-meant-600" />
                    Version Control
                  </CardTitle>
                  <CardDescription>
                    Information on source control and versioning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Repository</h3>
                    <p className="text-gray-600">
                      The project is hosted on GitHub at: <Link to="#" className="text-meant-600 hover:underline">https://github.com/meanttohelp/mental-health-platform</Link>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Branching Strategy</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li><strong>main</strong> - Production-ready code</li>
                      <li><strong>develop</strong> - Integration branch for feature development</li>
                      <li><strong>feature/[feature-name]</strong> - Individual feature branches</li>
                      <li><strong>bugfix/[bug-name]</strong> - Branches for bug fixes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Contribution Guidelines</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>Create a feature branch from develop</li>
                      <li>Make your changes following code style guidelines</li>
                      <li>Write tests for new functionality</li>
                      <li>Submit a pull request to the develop branch</li>
                      <li>Code review and approval process</li>
                      <li>Merge to develop and then main after testing</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="text-meant-600" />
                    API Documentation
                  </CardTitle>
                  <CardDescription>
                    Information about the application's APIs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">API Structure</h3>
                    <p className="text-gray-600">
                      The application uses a combination of RESTful APIs and third-party service integrations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Endpoints</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left font-medium">Endpoint</th>
                            <th className="p-3 text-left font-medium">Method</th>
                            <th className="p-3 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/doctors</td>
                            <td className="p-3">GET</td>
                            <td className="p-3 text-gray-600">Get list of available doctors</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/doctors/{"{id}"}</td>
                            <td className="p-3">GET</td>
                            <td className="p-3 text-gray-600">Get doctor details by ID</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/bookings</td>
                            <td className="p-3">POST</td>
                            <td className="p-3 text-gray-600">Create a new appointment booking</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/products</td>
                            <td className="p-3">GET</td>
                            <td className="p-3 text-gray-600">Get list of products</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/orders</td>
                            <td className="p-3">POST</td>
                            <td className="p-3 text-gray-600">Create a new product order</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/api/payments/verify</td>
                            <td className="p-3">POST</td>
                            <td className="p-3 text-gray-600">Verify payment for order or booking</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-mono text-xs">/whatsapp-webhook</td>
                            <td className="p-3">POST</td>
                            <td className="p-3 text-gray-600">Webhook for WhatsApp messages</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Authentication</h3>
                    <p className="text-gray-600">
                      The application uses token-based authentication for API requests. Tokens are obtained through the Supabase authentication system 
                      and should be included in the Authorization header for authenticated endpoints.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">External APIs</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li><strong>Razorpay API</strong> - For payment processing</li>
                      <li><strong>WhatsApp Business API</strong> - For messaging and notifications</li>
                      <li><strong>Google Sheets API</strong> - For data integration and reporting</li>
                      <li><strong>HuggingFace API</strong> - For AI model integration</li>
                      <li><strong>ElevenLabs API</strong> - For voice synthesis</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Version 1.0.0 - Last updated: April 29, 2025
            </p>
            <p className="text-sm text-gray-500 mt-1">
              © 2025 MeantToHelp. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
