
import React from 'react';
import { motion } from 'framer-motion';
import { Tractor, Sun, Farm, Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const farmActivities = [
  {
    icon: Farm,
    title: "Farm Stay Experience",
    description: "Immerse yourself in the authentic farm life. Stay with farming families, learn their ways, and experience the peace that comes from living close to nature.",
    action: "Book Farm Stay"
  },
  {
    icon: Tractor,
    title: "Harvest Participation",
    description: "Join our farmers during harvest season. Experience the joy of gathering crops and understand the dedication behind every grain that reaches your plate.",
    action: "Join Harvest"
  },
  {
    icon: Trees,
    title: "Organic Farming Workshop",
    description: "Learn sustainable farming practices from experienced farmers. Get hands-on experience in organic farming methods and understand the importance of natural cultivation.",
    action: "Register Workshop"
  },
  {
    icon: Sun,
    title: "Farmer's Life Experience",
    description: "Spend a day with our hardworking farmers. Witness their unwavering spirit and learn valuable life lessons about perseverance and contentment.",
    action: "Book Experience"
  }
];

const AgricultureTourism = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Agriculture Tourism & Worker Appreciation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with the heart of India through our agriculture tourism experiences. Learn from those who nurture our land and find peace in the simplicity of farm life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {farmActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex justify-center">
                    <activity.icon className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {activity.description}
                  </p>
                  <Button 
                    variant="gradient" 
                    className="w-full mt-auto bg-green-600 hover:bg-green-700"
                  >
                    {activity.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl italic text-gray-700 max-w-3xl mx-auto">
            "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways."
          </blockquote>
          <p className="mt-4 text-gray-600">- John F. Kennedy</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AgricultureTourism;

