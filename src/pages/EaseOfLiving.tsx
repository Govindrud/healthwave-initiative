
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceBookingForm from '@/components/payment/ServiceBookingForm';

const EaseOfLiving = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Ease of Living - Mental Health Support">
      <div className="container mx-auto max-w-7xl p-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ease of Living</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our services designed to simplify your daily life and reduce stress by taking care of everyday tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <img 
              src="/images/ease-of-living.jpg" 
              alt="Ease of Living Services" 
              className="rounded-lg w-full h-auto shadow-lg" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Let Us Handle Life's Demands</h2>
            <p className="mb-4">
              Modern life comes with endless tasks and responsibilities that can overwhelm even the most organized individuals. Our Ease of Living services provide support with day-to-day activities so you can focus on your mental wellbeing.
            </p>
            <p className="mb-6">
              From grocery shopping and meal preparation to home organization and administrative tasks, our team of skilled professionals is here to lighten your load.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Personalized Support</h3>
                  <p className="text-muted-foreground">Tailored services based on your unique needs and schedule</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Professional Team</h3>
                  <p className="text-muted-foreground">Experienced assistants who understand mental health needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">Book services when you need them with easy online scheduling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Ease of Living Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Home Organization</h3>
                <p className="text-muted-foreground mb-4">
                  Professional organizing services to declutter your living space and create a calm, peaceful environment.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Room-by-room organization
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Storage solutions
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Decluttering assistance
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-6">
                <ServiceBookingForm 
                  serviceId="home-org-1"
                  title="Home Organization Service"
                  price={1200}
                  duration="3 hours"
                  provider="Professional Organizer"
                  location="Your Home"
                  type="home_service"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Meal Preparation</h3>
                <p className="text-muted-foreground mb-4">
                  Healthy meal planning and preparation services to ensure you're eating nutritious food without the stress.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly meal planning
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Grocery shopping
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Batch cooking
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-6">
                <ServiceBookingForm 
                  serviceId="meal-prep-1"
                  title="Meal Preparation Service"
                  price={1500}
                  duration="4 hours"
                  provider="Personal Chef"
                  location="Your Home"
                  type="home_service"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">Administrative Support</h3>
                <p className="text-muted-foreground mb-4">
                  Help with paperwork, scheduling, emails, and other administrative tasks that consume your time and energy.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email management
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Appointment scheduling
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Document organization
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 p-6">
                <ServiceBookingForm 
                  serviceId="admin-support-1"
                  title="Administrative Support"
                  price={800}
                  duration="2 hours"
                  provider="Virtual Assistant"
                  location="Online"
                  type="virtual_service"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Custom Support Packages</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Need a combination of services or something not listed above? We offer customized packages tailored to your specific needs and circumstances.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link to="/contact">Contact Us for Custom Solutions</Link>
          </Button>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Book a Service</h3>
              <p className="text-muted-foreground">
                Choose the service you need and schedule a time that works for you using our online booking system.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Initial Consultation</h3>
              <p className="text-muted-foreground">
                A brief consultation call to understand your specific needs and preferences before the service.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Service Delivery</h3>
              <p className="text-muted-foreground">
                Our professional team arrives at the scheduled time to provide the service with care and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EaseOfLiving;
