
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Video, MapPin, Calendar, BookOpen, Heart, BookUser } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { CoreBhaktiPractices } from "@/components/spirituality/CoreBhaktiPractices";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};
  
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const SpiritualityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("gurus");
  
  useEffect(() => {
    document.title = "MeantToHelp | Spiritual Wellness";
    const tab = searchParams.get("tab");
    if (tab && ["gurus", "travel", "video", "planning", "health", "yoga"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/spirituality?tab=${value}`);
  };

  return (
    <MainLayout>
      <section className="relative">
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-meant-900/80 to-meant-700/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1473177104440-ffee2f376098"
            alt="Ancient Temple Architecture" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Spiritual Wellness Journey
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              Find harmony between mind, body, and spirit with our holistic spiritual guidance
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-30">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="bg-white rounded-lg shadow-lg p-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            <TabsTrigger value="gurus" className="data-[state=active]:bg-meant-100">Guru Help</TabsTrigger>
            <TabsTrigger value="travel" className="data-[state=active]:bg-meant-100">Spiritual Travel</TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-meant-100">Video Consult</TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-meant-100">Planning</TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-meant-100">Health Guidance</TabsTrigger>
            <TabsTrigger value="yoga" className="data-[state=active]:bg-meant-100">Bhakti Yoga</TabsTrigger>
          </TabsList>

          <TabsContent value="gurus">
            <CoreBhaktiPractices />
          </TabsContent>

          <TabsContent value="travel">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                {
                  title: "Sacred Vrindavan Pilgrimage",
                  location: "Vrindavan, India",
                  image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
                  description: "Experience divine bliss in the holy land of Lord Krishna. Visit ancient temples, participate in sacred rituals, and explore spiritual heritage.",
                  duration: "7 Days",
                  price: "$1,200"
                },
                {
                  title: "Spiritual Mathura Journey",
                  location: "Mathura, India",
                  image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
                  description: "Visit the birthplace of Lord Krishna and immerse yourself in devotional activities at various historical temples.",
                  duration: "5 Days",
                  price: "$950"
                },
                {
                  title: "Dwarka Temple Tour",
                  location: "Dwarka, Gujarat",
                  image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
                  description: "Explore the magnificent Dwarkadhish Temple and learn about Lord Krishna's divine kingdom.",
                  duration: "10 Days",
                  price: "$2,100"
                },
                {
                  title: "Jagannath Puri Retreat",
                  location: "Puri, Odisha",
                  image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
                  description: "Experience the divine presence at the ancient Jagannath Temple and participate in traditional rituals.",
                  duration: "14 Days",
                  price: "$1,800"
                }
              ].map((retreat, index) => (
                <motion.div variants={itemVariants} key={index} className="flex flex-col h-full">
                  <Card className="h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={retreat.image} 
                        alt={retreat.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <Badge className="bg-meant-600">{retreat.duration}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{retreat.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin size={14} className="mr-1" /> {retreat.location}
                          </CardDescription>
                        </div>
                        <div className="text-lg font-bold text-meant-600">{retreat.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{retreat.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Details & Book</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="video">
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <h2 className="text-2xl font-bold mb-4">Virtual Spiritual Guidance</h2>
                <p className="mb-6 text-muted-foreground">
                  Connect with spiritual guides, gurus, and counselors from the comfort of your home. Our video consultation service provides personalized guidance for your spiritual journey.
                </p>
                <div className="mb-8 grid gap-4">
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-4">
                      <Video size={24} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">High-Quality Video Sessions</h3>
                      <p className="text-sm text-muted-foreground">Secure, HD video calls that ensure clear communication with your spiritual guide.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-4">
                      <User size={24} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Experience</h3>
                      <p className="text-sm text-muted-foreground">Sessions tailored to your specific spiritual needs and questions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-4">
                      <Calendar size={24} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Flexible Scheduling</h3>
                      <p className="text-sm text-muted-foreground">Book sessions at times that work for you, with options across multiple time zones.</p>
                    </div>
                  </div>
                </div>
                <Button size="lg">Schedule a Video Consultation</Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2 bg-gradient-to-br from-meant-50 to-meant-100 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Upcoming Online Events</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Mindfulness Meditation Workshop",
                      date: "April 15, 2025",
                      time: "10:00 AM - 11:30 AM EDT",
                      speaker: "Guru Priya"
                    },
                    {
                      title: "Introduction to Vedic Philosophy",
                      date: "April 20, 2025",
                      time: "2:00 PM - 4:00 PM EDT",
                      speaker: "Acharya Rajesh"
                    },
                    {
                      title: "Healing Through Sound: Tibetan Singing Bowls",
                      date: "April 25, 2025",
                      time: "7:00 PM - 8:30 PM EDT",
                      speaker: "Lama Dorje"
                    }
                  ].map((event, index) => (
                    <div key={index} className="flex border-b border-meant-200 pb-4 last:border-0">
                      <div className="mr-4 bg-white rounded-md w-12 h-12 flex items-center justify-center">
                        <Calendar className="text-meant-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                        <p className="text-sm font-medium">With {event.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">View All Events</Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="planning">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Spiritual Journey Planning</h2>
              <p className="text-muted-foreground">Create a personalized roadmap for your spiritual development with expert guidance.</p>
            </div>
            
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-meant-100 p-2 rounded-full mr-3">
                      <Calendar size={24} className="text-meant-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Assessment & Discovery</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Begin with a comprehensive assessment to understand your spiritual background, goals, and areas for growth.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Personal values assessment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Spiritual background review</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Goal-setting session</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-meant-100 p-2 rounded-full mr-3">
                      <BookOpen size={24} className="text-meant-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Custom Plan Creation</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Receive a personalized spiritual development plan designed specifically for your needs and objectives.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Tailored practice recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Resource suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Milestone development</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-meant-100 p-2 rounded-full mr-3">
                      <Heart size={24} className="text-meant-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Ongoing Support</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Receive continuous guidance and adjustments to your plan as you progress on your spiritual journey.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Regular check-in sessions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Progress evaluations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-meant-600">•</div>
                      <span>Plan refinements</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="bg-gradient-to-r from-meant-100 to-meant-50 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Ready to start your spiritual planning journey?</h3>
                    <p className="text-muted-foreground">Schedule a free 30-minute consultation with one of our spiritual advisors.</p>
                  </div>
                  <Button size="lg" className="whitespace-nowrap">
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="health">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                    Holistic Health & Spiritual Wellness
                  </motion.h2>
                  
                  <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
                    Our approach integrates spiritual practices with physical and mental health guidance for complete wellness.
                    We believe that true healing comes from addressing all aspects of the self: body, mind, and spirit.
                  </motion.p>
                  
                  <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        title: "Ayurvedic Consultation",
                        description: "Personalized wellness plans based on your unique constitution and energy balance according to ancient Ayurvedic principles.",
                        icon: <BookUser size={24} />
                      },
                      {
                        title: "Spiritual Nutrition",
                        description: "Learn about sattvic foods that promote clarity and spiritual growth while nourishing your body.",
                        icon: <Heart size={24} />
                      },
                      {
                        title: "Pranayama Breathing",
                        description: "Discover breathing techniques that enhance vital energy and support both physical health and meditation practices.",
                        icon: <BookOpen size={24} />
                      },
                      {
                        title: "Mind-Body Connection",
                        description: "Explore practices that strengthen the connection between mental well-being and physical health.",
                        icon: <User size={24} />
                      }
                    ].map((item, index) => (
                      <motion.div variants={itemVariants} key={index} className="bg-white rounded-lg shadow p-5 border border-meant-100">
                        <div className="bg-meant-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-meant-600">
                          {item.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="bg-meant-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Health & Wellness Services</h3>
                    
                    <div className="space-y-4">
                      {[
                        {
                          service: "Ayurvedic Consultation",
                          duration: "90 minutes",
                          price: "$120"
                        },
                        {
                          service: "Spiritual Nutrition Planning",
                          duration: "60 minutes",
                          price: "$95"
                        },
                        {
                          service: "Pranayama Session",
                          duration: "45 minutes",
                          price: "$75"
                        },
                        {
                          service: "Mind-Body Assessment",
                          duration: "75 minutes",
                          price: "$105"
                        },
                        {
                          service: "Holistic Wellness Package",
                          duration: "4 sessions",
                          price: "$350"
                        }
                      ].map((service, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-meant-200 last:border-b-0">
                          <div>
                            <p className="font-medium">{service.service}</p>
                            <p className="text-sm text-muted-foreground">{service.duration}</p>
                          </div>
                          <div className="text-meant-700 font-semibold">{service.price}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-6">Book Health Consultation</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="yoga">
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Bhakti Yoga: The Path of Devotion</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Bhakti Yoga is the spiritual practice of devotion and love. It's a path of connecting to the divine through 
                  various practices including chanting, rituals, prayer, and meditation. Our dedicated instructors guide you in 
                  cultivating devotion as a means to spiritual growth.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="aspect-video rounded-lg overflow-hidden mb-6"
                >
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/RgHw9H50sPs" 
                    title="Swami Premananda - Bhakti Yoga Discourse" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Core Bhakti Practices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        title: "Kirtan (Devotional Chanting)",
                        description: "Experience the joy of sacred sound through traditional call-and-response chanting."
                      },
                      {
                        title: "Japa Meditation",
                        description: "Learn the practice of mantra repetition using prayer beads to focus the mind."
                      },
                      {
                        title: "Seva (Selfless Service)",
                        description: "Discover how acts of service can become spiritual practice and expression of devotion."
                      },
                      {
                        title: "Satsang (Spiritual Community)",
                        description: "Join like-minded seekers for group study, discussion, and practice."
                      }
                    ].map((practice, index) => (
                      <div key={index} className="bg-meant-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{practice.title}</h4>
                        <p className="text-sm text-muted-foreground">{practice.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb" 
                      alt="Temple meditation hall"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1626128665085-483d736e3ea2" 
                      alt="Sacred ritual space" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col gap-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bhakti Events</CardTitle>
                    <CardDescription>Join our community for these special gatherings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Morning Aarti Ceremony",
                        date: "Daily, 6:00 AM",
                        location: "Main Temple Hall"
                      },
                      {
                        title: "Bhagavad Gita Study Group",
                        date: "Tuesdays, 7:00 PM",
                        location: "Meditation Center"
                      },
                      {
                        title: "Kirtan Night",
                        date: "First Friday Monthly, 7:30 PM",
                        location: "Community Hall"
                      },
                      {
                        title: "Bhakti Yoga Workshop",
                        date: "April 22-24, 2025",
                        location: "Retreat Center"
                      }
                    ].map((event, index) => (
                      <div key={index} className="flex border-b border-meant-100 pb-3 last:border-0">
                        <Calendar size={18} className="text-meant-600 mt-1 mr-3 shrink-0" />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View All Bhakti Events</Button>
                  </CardFooter>
                </Card>
                
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604881991720-f91add269bed" 
                    alt="Meditation practice" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Meet Swami Premanand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="https://images.unsplash.com/photo-1580756321097-07d2a106079a" alt="Swami Premanand" />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Swami Premanand</p>
                        <Badge className="mt-1">Bhakti Yoga Master</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Join Swami Premanand's weekly Bhakti sessions where he shares ancient wisdom and guides devotional practices.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1466442929976-97f336a657be" 
                  alt="Temple Offerings" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e" 
                  alt="Temple Architecture" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1473177104440-ffee2f376098"
                  alt="Devotional Practices"
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SpiritualityPage;
