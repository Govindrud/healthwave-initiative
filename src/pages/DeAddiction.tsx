
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Shield, Phone, Users, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

const DeAddiction = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Addiction Recovery";
    window.scrollTo(0, 0);
  }, []);

  // Recovery program data
  const recoveryPrograms = [
    {
      id: 'program1',
      title: 'Alcohol Dependence Recovery',
      description: 'A comprehensive program to help you overcome alcohol dependence with personalized support and evidence-based therapies.',
      duration: '12 weeks',
      format: 'Online + In-person',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    },
    {
      id: 'program2',
      title: 'Substance Abuse Recovery',
      description: 'Targeted intervention for substance abuse issues, including personalized counseling and group therapy sessions.',
      duration: '16 weeks',
      format: 'Online + In-person',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    },
    {
      id: 'program3',
      title: 'Technology & Gaming Addiction',
      description: 'Specialized program for overcoming technology and gaming addiction with practical strategies for digital wellbeing.',
      duration: '8 weeks',
      format: 'Online',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    }
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-blue-50 to-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Addiction Recovery Programs</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Begin your journey to recovery with our compassionate, evidence-based addiction treatment programs. 
                We offer personalized support for a variety of addiction challenges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-100 mb-4">
                      <Shield className="text-blue-700" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Confidential Support</h3>
                    <p className="text-gray-600 text-sm">Your privacy is our priority throughout your recovery journey</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-100 mb-4">
                      <Phone className="text-blue-700" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">24/7 Helpline</h3>
                    <p className="text-gray-600 text-sm">Access support whenever you need it, day or night</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-100 mb-4">
                      <Users className="text-blue-700" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Group Support</h3>
                    <p className="text-gray-600 text-sm">Connect with others on similar recovery journeys</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Recovery Programs</h2>
            </motion.div>

            <div className="space-y-6">
              {recoveryPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center text-white">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-sm">98% success rate</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Duration:</span>
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Format:</span>
                          <span>{program.format}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button>Learn More</Button>
                        <Button variant="outline">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Speak to Counselor
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-3">Need Immediate Help?</h3>
              <p className="mb-4">Our counselors are available 24/7 to support you in times of crisis.</p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="mr-2 h-4 w-4" />
                Call Helpline
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DeAddiction;
