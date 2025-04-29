
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Webinars = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Workshops & Webinars";
    window.scrollTo(0, 0);
  }, []);

  // Sample webinars data
  const webinars = [
    {
      id: 'webinar1',
      title: 'Managing Workplace Stress',
      description: 'Learn practical strategies to identify and manage workplace stress for better productivity and wellbeing.',
      speaker: 'Dr. Anjali Mehta',
      speakerTitle: 'Corporate Psychology Specialist',
      date: 'June 15, 2023',
      time: '6:00 PM IST',
      duration: '90 minutes',
      participants: '128',
      tags: ['Workplace', 'Stress Management', 'Corporate'],
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      isPremium: false
    },
    {
      id: 'webinar2',
      title: 'Building Resilient Teams',
      description: 'Discover how to develop resilience in your team to overcome challenges and thrive in uncertain environments.',
      speaker: 'Prakash Sharma',
      speakerTitle: 'Leadership Coach',
      date: 'June 22, 2023',
      time: '5:30 PM IST',
      duration: '60 minutes',
      participants: '84',
      tags: ['Leadership', 'Team Building', 'Resilience', 'Corporate'],
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      isPremium: true
    },
    {
      id: 'webinar3',
      title: 'Mental Health First Aid for Managers',
      description: 'Essential training for managers to recognize and respond to mental health challenges in their teams.',
      speaker: 'Dr. Rohit Kapoor',
      speakerTitle: 'Clinical Psychologist',
      date: 'July 5, 2023',
      time: '4:00 PM IST',
      duration: '120 minutes',
      participants: '156',
      tags: ['Management', 'Mental Health', 'Leadership'],
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      isPremium: true
    }
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-meant-50 to-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Workshops & Webinars</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join our expert-led workshops and webinars on mental health topics tailored for 
                individuals and organizations. Learn valuable skills and insights to improve wellbeing.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge variant="outline" className="bg-white">All Webinars</Badge>
                <Badge variant="outline" className="bg-white">Corporate</Badge>
                <Badge variant="outline" className="bg-white">Personal Growth</Badge>
                <Badge variant="outline" className="bg-white">Stress Management</Badge>
                <Badge variant="outline" className="bg-white">Leadership</Badge>
              </div>

              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            </motion.div>

            <div className="space-y-8">
              {webinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={webinar.image} 
                        alt={webinar.title} 
                        className="w-full h-full object-cover"
                      />
                      {webinar.isPremium && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-amber-600">Premium</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">{webinar.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                      <p className="text-gray-600 mb-4">{webinar.description}</p>
                      
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <Users size={14} className="text-meant-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{webinar.speaker}</p>
                          <p className="text-xs text-gray-500">{webinar.speakerTitle}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-500" />
                          <span>{webinar.time} • {webinar.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe size={14} className="mr-1 text-gray-500" />
                          <span>Online</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1 text-gray-500" />
                          <span>{webinar.participants} registered</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {webinar.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-meant-50 text-meant-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button>Register Now</Button>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-meant-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-3">Custom Corporate Workshops</h3>
              <p className="mb-4">Tailor workshops for your organization's specific needs and objectives.</p>
              <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                Request a Custom Workshop
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Webinars;
