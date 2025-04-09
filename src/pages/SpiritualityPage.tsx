
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Video, MapPin, Calendar, BookOpen, Heart, BookUser } from "lucide-react";

const SpiritualityPage: React.FC = () => {
  // Animation variants
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

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-lg overflow-hidden h-80 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-meant-900/80 to-meant-700/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
            alt="Spiritual Journey" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Spiritual Wellness Journey
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white max-w-2xl"
            >
              Find harmony between mind, body, and spirit with our holistic spiritual guidance and resources
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Sections Tabs */}
      <Tabs defaultValue="gurus" className="mb-12">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
          <TabsTrigger value="gurus">Guru Help</TabsTrigger>
          <TabsTrigger value="travel">Spiritual Travel</TabsTrigger>
          <TabsTrigger value="video">Video Consult</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="health">Health Guidance</TabsTrigger>
          <TabsTrigger value="yoga">Bhakti Yoga</TabsTrigger>
        </TabsList>

        {/* Gurus Section */}
        <TabsContent value="gurus">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Swami Anand",
                specialty: "Vedic Meditation",
                image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&h=200&auto=format&fit=crop",
                bio: "With over 20 years of meditation practice, Swami Anand guides seekers through the ancient wisdom of Vedic meditation techniques."
              },
              {
                name: "Guru Priya",
                specialty: "Spiritual Counseling",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
                bio: "Guru Priya specializes in helping individuals navigate life transitions using spiritual principles and practices."
              },
              {
                name: "Acharya Rajesh",
                specialty: "Vedanta Philosophy",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop",
                bio: "A scholar of ancient texts, Acharya Rajesh translates complex philosophical concepts into practical daily wisdom."
              }
            ].map((guru, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={guru.image} alt={guru.name} />
                      <AvatarFallback>{guru.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{guru.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{guru.specialty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guru.bio}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Consultation</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Spiritual Travel Section */}
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
                title: "Rishikesh Retreat",
                location: "Rishikesh, India",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
                description: "A 7-day immersive retreat in the yoga capital of the world. Experience meditation by the Ganges, visit ancient temples, and participate in traditional ceremonies.",
                duration: "7 Days",
                price: "$1,200"
              },
              {
                title: "Zen Buddhist Temple Stay",
                location: "Kyoto, Japan",
                image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
                description: "Live like a Buddhist monk in this authentic temple experience. Learn zazen meditation, participate in morning chanting, and enjoy traditional vegetarian cuisine.",
                duration: "5 Days",
                price: "$950"
              },
              {
                title: "Sacred Valley Journey",
                location: "Cusco, Peru",
                image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
                description: "Connect with ancient wisdom traditions in the Sacred Valley. Experience healing ceremonies with local shamans and visit Incan sacred sites.",
                duration: "10 Days",
                price: "$2,100"
              },
              {
                title: "Silent Meditation Retreat",
                location: "Chiang Mai, Thailand",
                image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
                description: "Find inner peace through silence in this guided meditation retreat in the mountains of Northern Thailand. Daily yoga, meditation, and mindfulness practices.",
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

        {/* Video Consultation */}
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

        {/* Planning */}
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

        {/* Health Guidance */}
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
              
              <motion.div variants={itemVariants} className="lg:w-1/3">
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
              </motion.div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Bhakti Yoga */}
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
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Introduction to Bhakti Yoga" 
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
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
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
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-meant-600 to-meant-800 rounded-lg text-white p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Spiritual Journey Today</h2>
          <p className="mb-8">
            Our team of spiritual guides, teachers, and healers are here to support you on your path to inner peace and spiritual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-meant-800 hover:bg-gray-100">Book a Consultation</Button>
            <Button variant="outline" className="text-white border-white hover:bg-meant-700">Explore Resources</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpiritualityPage;
