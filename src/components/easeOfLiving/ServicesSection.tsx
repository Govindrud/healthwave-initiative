
import React from 'react';
import ServiceBookingForm from '@/components/payment/ServiceBookingForm';

const ServicesSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Our Ease of Living Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
          <div className="p-6">
            <h3 className="font-bold text-xl mb-3">Home Organization</h3>
            <p className="text-muted-foreground mb-4">
              Professional organizing services to declutter your living space using sustainable materials and create a calm, peaceful environment.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eco-friendly organization
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sustainable storage solutions
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mindful decluttering
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
            <h3 className="font-bold text-xl mb-3">Sustainable Meal Preparation</h3>
            <p className="text-muted-foreground mb-4">
              Farm-to-table meal planning and preparation services using locally-sourced ingredients to ensure you're eating nutritious food while supporting local agriculture.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Seasonal meal planning
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Local farmers market shopping
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Zero-waste cooking techniques
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-6">
            <ServiceBookingForm 
              serviceId="meal-prep-1"
              title="Sustainable Meal Preparation"
              price={1500}
              duration="4 hours"
              provider="Eco-Chef"
              location="Your Home"
              type="home_service"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
          <div className="p-6">
            <h3 className="font-bold text-xl mb-3">Mindful Administrative Support</h3>
            <p className="text-muted-foreground mb-4">
              Help with paperwork, scheduling, emails, and other administrative tasks with a focus on digital solutions to reduce paper waste.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Paperless systems
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eco-conscious scheduling
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sustainable document management
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-6">
            <ServiceBookingForm 
              serviceId="admin-support-1"
              title="Mindful Administrative Support"
              price={800}
              duration="2 hours"
              provider="Eco-Conscious Assistant"
              location="Online"
              type="virtual_service"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
