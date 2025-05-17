
import React from 'react';
import { Leaf, TreeDeciduous, Trees } from 'lucide-react';

const IntroSection = () => {
  return (
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
    </div>
  );
};

export default IntroSection;
