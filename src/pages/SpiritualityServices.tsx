
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Video, Star } from "lucide-react";
import { motion } from "framer-motion";

const SpiritualityServices = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Spiritual Services";
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("consultations");

  const consultations = [
    {
      id: 'consultation1',
      name: 'Swami Vijayananda',
      title: 'Spiritual Guide',
      specialty: 'Vedanta Philosophy, Meditation',
      experience: '25 years',
      rating: 4.9,
      reviews: 128,
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      availability: 'Available today'
    },
    {
      id: 'consultation2',
      name: 'Acharya Prashant',
      title: 'Spiritual Teacher',
      specialty: 'Self-inquiry, Life Philosophy',
      experience: '15 years',
      rating: 4.8,
      reviews: 93,
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      availability: 'Available tomorrow'
    },
    {
      id: 'consultation3',
      name: 'Sister Shivani',
      title: 'Spiritual Mentor',
      specialty: 'Rajyoga Meditation, Positive Thinking',
      experience: '18 years',
      rating: 4.9,
      reviews: 156,
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      availability: 'Available today'
    }
  ];

  const tours = [
    {
      id: 'tour1',
      title: 'Sacred Varanasi Journey',
      description: 'Experience the spiritual essence of India\'s oldest sacred city with guided visits to ghats and temples.',
      location: 'Varanasi, Uttar Pradesh',
      duration: '3 days',
      groupSize: 'Small group (max 12)',
      price: '₹15,000 per person',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      rating: 4.8,
      reviews: 42
    },
    {
      id: 'tour2',
      title: 'Rishikesh Yoga & Meditation Retreat',
      description: 'Immerse yourself in yoga and meditation practices in the spiritual capital of the world.',
      location: 'Rishikesh, Uttarakhand',
      duration: '5 days',
      groupSize: 'Small group (max 10)',
      price: '₹25,000 per person',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      rating: 4.9,
      reviews: 37
    },
    {
      id: 'tour3',
      title: 'Buddhist Pilgrimage Trail',
      description: 'Follow the footsteps of Buddha through key sites including Bodh Gaya, Sarnath and Kushinagar.',
      location: 'Bihar & Uttar Pradesh',
      duration: '7 days',
      groupSize: 'Medium group (max 16)',
      price: '₹35,000 per person',
      image: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
      rating: 4.7,
      reviews: 29
    }
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-purple-50 to-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Spiritual Services</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with your inner self through our range of spiritual services. 
                From one-on-one consultations with spiritual guides to immersive sacred tours, 
                find the path that resonates with your spiritual journey.
              </p>
            </motion.div>

            <Tabs defaultValue="consultations" onValueChange={setActiveTab} className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="consultations">Guru Consultations</TabsTrigger>
                <TabsTrigger value="tours">Sacred Tours</TabsTrigger>
              </TabsList>

              <TabsContent value="consultations" className="mt-6">
                <div className="space-y-6">
                  {consultations.map((guide, index) => (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 p-4 flex flex-col items-center justify-center">
                          <img 
                            src={guide.image} 
                            alt={guide.name} 
                            className="w-32 h-32 object-cover rounded-full border-4 border-purple-50"
                          />
                          <div className="mt-3 flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({guide.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l md:border-r border-gray-100">
                          <h3 className="text-xl font-semibold mb-1">{guide.name}</h3>
                          <p className="text-purple-600 mb-3">{guide.title}</p>
                          
                          <p className="text-gray-600 mb-4">Specializes in {guide.specialty}</p>
                          
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Experience:</span> {guide.experience}
                          </p>
                        </div>
                        
                        <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-center">
                          <div className="text-sm font-medium text-green-600 mb-4">
                            {guide.availability}
                          </div>
                          
                          <Button className="mb-3 w-full">
                            <Video className="mr-2 h-4 w-4" />
                            Book Consultation
                          </Button>
                          
                          <Button variant="outline" className="w-full text-sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tours" className="mt-6">
                <div className="space-y-8">
                  {tours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/5 h-56 md:h-auto relative">
                          <img 
                            src={tour.image} 
                            alt={tour.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center text-white">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{tour.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-3/5 p-6">
                          <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                          <p className="text-gray-600 mb-4">{tour.description}</p>
                          
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center text-sm">
                              <Clock size={16} className="mr-1 text-purple-600" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-medium">{tour.rating}</span>
                              <span className="text-gray-500 text-sm ml-1">({tour.reviews} reviews)</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap justify-between items-end">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Group Size</p>
                              <p className="font-medium">{tour.groupSize}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Price</p>
                              <p className="font-semibold text-lg">{tour.price}</p>
                            </div>
                            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                              <Calendar className="mr-2 h-4 w-4" />
                              Book Tour
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SpiritualityServices;
