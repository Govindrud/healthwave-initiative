import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, Star, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import customPlaceholder from '../assets/custom-placeholder.svg';

const StudentPsychologists = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Student Psychologists";
    window.scrollTo(0, 0);
  }, []);

  // Sample student psychologists data
  const studentPsychologists = [
    {
      id: 'student1',
      name: 'Arjun Mehta',
      school: 'Delhi University',
      specialities: ['Anxiety', 'Depression', 'Students'],
      experience: '2 years',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      availability: 'Available today'
    },
    {
      id: 'student2',
      name: 'Priya Sharma',
      school: 'NIMHANS',
      specialities: ['Family Therapy', 'Child Psychology'],
      experience: '3 years',
      rating: 4.9,
      reviews: 31,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      availability: 'Next available: Tomorrow'
    },
    {
      id: 'student3',
      name: 'Rajiv Kumar',
      school: 'Mumbai University',
      specialities: ['Stress Management', 'Work-Life Balance'],
      experience: '1 year',
      rating: 4.7,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      availability: 'Available today'
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Student Psychologists</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get quality mental health support at affordable rates while helping psychology students gain valuable experience.
                All sessions are supervised by licensed professionals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                      <GraduationCap className="text-green-700" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Supervised Sessions</h3>
                      <p className="text-gray-600">All student psychologists work under the supervision of licensed professionals</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                      <Shield className="text-green-700" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quality Assured</h3>
                      <p className="text-gray-600">Rigorous selection process ensures high-quality care at affordable rates</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Available Student Psychologists</h2>
            </motion.div>

            <div className="space-y-6">
              {studentPsychologists.map((psychologist, index) => (
                <motion.div
                  key={psychologist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 flex flex-col items-center justify-center">
                      <ImageWithFallback 
                        src={psychologist.image} 
                        alt={psychologist.name} 
                        className="w-32 h-32 object-cover rounded-full border-4 border-meant-50"
                        fallbackSrc={customPlaceholder}
                      />
                      <div className="mt-3 flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{psychologist.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({psychologist.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l md:border-r border-gray-100">
                      <h3 className="text-xl font-semibold mb-1">{psychologist.name}</h3>
                      <p className="text-gray-600 mb-3">Student at {psychologist.school}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {psychologist.specialities.map(specialty => (
                          <span 
                            key={specialty} 
                            className="text-xs px-2 py-1 bg-meant-50 text-meant-700 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users size={16} className="mr-2" />
                        <span>Experience: {psychologist.experience}</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-center">
                      <div className="text-sm font-medium text-green-600 mb-4">
                        {psychologist.availability}
                      </div>
                      
                      <Button className="mb-3 w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Button>
                      
                      <Button variant="outline" className="w-full text-sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                View All Student Psychologists
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentPsychologists;
