
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceBookingForm from '@/components/payment/ServiceBookingForm';
import BiomimicryHero from '@/components/biomimicry/BiomimicryHero';
import NatureInsights from '@/components/biomimicry/NatureInsights';
import PurposefulLiving from '@/components/biomimicry/PurposefulLiving';
import { Leaf, TreeDeciduous, Trees, ArrowRight } from 'lucide-react';

const EaseOfLiving = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Ease of Living - Mental Health Support">
      {/* Hero Section with Biomimicry Integration */}
      <BiomimicryHero />

      {/* Main content - Enhanced with sustainable focus */}
      <div className="container mx-auto max-w-7xl p-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ease of Living</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our holistic approach to simplify your daily life while promoting sustainable living 
            and harmony with nature's principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
              alt="Sustainable Living" 
              className="rounded-lg w-full h-auto shadow-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Live in Harmony with Nature</h2>
            <p className="mb-4">
              Modern life comes with endless tasks and responsibilities that can overwhelm even the most organized individuals. 
              Our Ease of Living services provide support with day-to-day activities while embracing sustainable practices.
            </p>
            <p className="mb-6">
              Inspired by ancient wisdom and modern sustainability principles, we help you create a lifestyle 
              that reduces stress while nurturing our planet.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Eco-Conscious Support</h3>
                  <p className="text-muted-foreground">Services designed with environmental mindfulness at their core</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <TreeDeciduous className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Nature-Inspired Solutions</h3>
                  <p className="text-muted-foreground">Applying biomimicry principles to everyday challenges</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <Trees className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Agricultural Awareness</h3>
                  <p className="text-muted-foreground">Connecting urban lives with agricultural wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nature Insights Section */}
        <NatureInsights />

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
        
        {/* Purposeful Living Section */}
        <PurposefulLiving />
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Agricultural Connection Programs</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Reconnect with nature's wisdom through our agricultural connection programs. 
            From farm visits to urban gardening workshops, we help you build a deeper understanding 
            of sustainable food systems.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link to="/contact">Learn About Farm Connections <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Our Approach to Sustainable Living</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Observe Nature's Patterns</h3>
              <p className="text-muted-foreground">
                We study natural ecosystems to inform our approach to sustainable living, applying biomimicry principles.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Implement Holistic Solutions</h3>
              <p className="text-muted-foreground">
                Our services integrate physical, mental, and environmental wellbeing for truly sustainable outcomes.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Measure Regenerative Impact</h3>
              <p className="text-muted-foreground">
                We track not just efficiency but how our services contribute to regenerating natural systems and communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EaseOfLiving;
