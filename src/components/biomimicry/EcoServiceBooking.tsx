
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { CheckCircle, Leaf, TreePine, Globe } from 'lucide-react';

const ecoServices = [
  {
    id: 'nature-therapy',
    title: 'Nature Therapy Session',
    description: 'Guided therapeutic sessions in natural settings to reduce stress and anxiety.',
    price: 1499,
    features: ['90-minute guided session', 'Certified nature therapist', 'Personalized stress relief techniques', 'Post-session support'],
    icon: Leaf
  },
  {
    id: 'forest-bathing',
    title: 'Forest Bathing Experience',
    description: 'Traditional Japanese Shinrin-Yoku practice for mindfulness and mental clarity.',
    price: 1899,
    features: ['2-hour forest immersion', 'Mindfulness exercises', 'Sensory activation practice', 'Herbal tea ceremony'],
    icon: TreePine
  },
  {
    id: 'eco-retreat',
    title: 'Weekend Eco Retreat',
    description: 'Immersive weekend retreat focusing on sustainable living and mental wellness.',
    price: 5999,
    features: ['2 nights accommodation', 'Organic vegetarian meals', 'Workshops and activities', 'Digital detox environment'],
    icon: Globe
  }
];

const EcoServiceBooking = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const handleBookNow = (serviceId: string) => {
    setSelectedService(serviceId);
  };
  
  const handleCloseBooking = () => {
    setSelectedService(null);
  };
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-meant-800 mb-4">Eco-Wellness Services</h2>
          <p className="text-lg text-meant-600 max-w-3xl mx-auto">
            Experience the healing power of nature with our specialized eco-wellness services designed to improve mental health through natural connections.
          </p>
        </div>
        
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="services">Available Services</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Programs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ecoServices.map((service) => (
                <Card key={service.id} className="border-meant-100 hover:shadow-md transition duration-200">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">
                      <service.icon className="h-12 w-12 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <div className="text-xl font-bold text-meant-800 mb-4">₹{service.price}</div>
                    {selectedService === service.id ? (
                      <div className="w-full">
                        <ServiceBookingForm
                          serviceTitle={service.title}
                          servicePrice={service.price}
                          serviceId={service.id}
                          serviceType="eco_wellness"
                        />
                        <Button 
                          variant="outline" 
                          className="mt-4 w-full" 
                          onClick={handleCloseBooking}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleBookNow(service.id)}
                      >
                        Book Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="bg-green-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-4">Upcoming Seasonal Programs</h3>
              <p className="text-meant-600 mb-6">
                We're preparing special seasonal eco-wellness retreats and workshops. 
                Sign up to be notified when registration opens.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Get Notified
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EcoServiceBooking;
