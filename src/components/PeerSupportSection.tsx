
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PeerSupportSection = () => {
  return (
    <section className="py-20 bg-white" id="peer-support">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              Community Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect With Others On Similar Journeys
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Find understanding and support from peers who truly get what you're going through. 
              Our moderated peer support groups provide a safe space to share experiences and coping strategies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Users className="text-purple-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Group Sessions</h3>
                  <p className="text-gray-600">Join weekly video sessions with peers facing similar challenges</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <MessageCircle className="text-purple-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Chat Support</h3>
                  <p className="text-gray-600">Access 24/7 text-based peer support whenever you need it</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Heart className="text-purple-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Moderated Space</h3>
                  <p className="text-gray-600">Professional moderators ensure a safe, supportive environment</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Calendar className="text-purple-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Scheduled Topics</h3>
                  <p className="text-gray-600">Weekly themes to guide conversations and provide focus</p>
                </div>
              </div>
            </div>
            
            <Button className="rounded-full bg-purple-700 hover:bg-purple-800 px-8 py-6">
              Join a Peer Group
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" 
                alt="Peer support session" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center mb-2">
                    <div className="flex -space-x-2">
                      <img className="h-8 w-8 rounded-full border-2 border-white" src="/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" alt="User" />
                      <img className="h-8 w-8 rounded-full border-2 border-white" src="/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" alt="User" />
                      <img className="h-8 w-8 rounded-full border-2 border-white" src="/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" alt="User" />
                    </div>
                    <span className="ml-4 text-sm opacity-90">42 people joined this week</span>
                  </div>
                  <h3 className="font-medium">Anxiety & Stress Support Group</h3>
                  <p className="text-sm opacity-90">Next session: Wednesdays at 7 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PeerSupportSection;
