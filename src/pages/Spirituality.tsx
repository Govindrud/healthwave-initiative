
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Heart, DollarSign, Star, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useToast } from "@/hooks/use-toast";

interface SpiritualServiceProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  image: string;
  rating: number;
  participants: string;
  index: number;
}

const SpiritualService: React.FC<SpiritualServiceProps> = ({
  title,
  description,
  price,
  duration,
  location,
  image,
  rating,
  participants,
  index,
}) => {
  const { toast } = useToast();
  
  const handleBookNow = () => {
    toast({
      title: "Booking Initiated",
      description: `You are booking a session for ${title}`,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-5 bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-meant-600 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-meant-600 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 text-meant-600 mr-2" />
            <span>{participants}</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 text-meant-600 mr-2" />
            <span>{price}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleBookNow}
          className="w-full bg-meant-600 hover:bg-meant-700"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};

const SpiritualityPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || "services");
  
  // Update active tab when URL parameters change
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  const meditationServices = [
    {
      title: "Guided Meditation Sessions",
      description: "Experience tranquility through our expert-led guided meditation sessions suitable for all levels.",
      price: "$35 / session",
      duration: "60 minutes",
      location: "Online / In-center",
      image: "/images/spirituality-hero.jpg",
      rating: 4.9,
      participants: "Individual",
    },
    {
      title: "Group Meditation Retreat",
      description: "Join our weekend meditation retreat to disconnect from stress and reconnect with yourself.",
      price: "$199 / weekend",
      duration: "2 days",
      location: "Retreat Center",
      image: "/images/tour-placeholder.jpg",
      rating: 4.8,
      participants: "10-15 people",
    },
    {
      title: "Mindfulness for Beginners",
      description: "Learn the fundamentals of mindfulness meditation and how to apply it in your daily life.",
      price: "$25 / session",
      duration: "45 minutes",
      location: "Online",
      image: "/images/happy-people-1.jpg",
      rating: 4.7,
      participants: "Group (max 20)",
    },
  ];
  
  const counselingServices = [
    {
      title: "Spiritual Life Coaching",
      description: "One-on-one guidance to help you align your life with your deepest values and spiritual beliefs.",
      price: "$85 / session",
      duration: "90 minutes",
      location: "Online / In-person",
      image: "/images/happy-people-2.jpg", 
      rating: 4.9,
      participants: "Individual",
    },
    {
      title: "Grief & Loss Spiritual Support",
      description: "Compassionate spiritual counseling for those dealing with grief, loss, and major life transitions.",
      price: "$75 / session",
      duration: "60 minutes",
      location: "Online / In-person",
      image: "/images/priest-placeholder.jpg",
      rating: 5.0,
      participants: "Individual / Family",
    },
  ];
  
  const yogaServices = [
    {
      title: "Spiritual Yoga Flow",
      description: "Combine physical postures with spiritual teachings for a holistic mind-body practice.",
      price: "$40 / session",
      duration: "75 minutes",
      location: "In-center",
      image: "/images/happy-people-3.jpg",
      rating: 4.8,
      participants: "Group (max 12)",
    },
    {
      title: "Yoga Nidra for Anxiety Relief",
      description: "Experience deep relaxation through guided yogic sleep to reduce anxiety and stress.",
      price: "$45 / session",
      duration: "60 minutes",
      location: "Online / In-center",
      image: "/images/user-placeholder.jpg",
      rating: 4.9,
      participants: "Group (max 10)",
    },
  ];

  // Video consultation services
  const videoServices = [
    {
      title: "Online Spiritual Guidance",
      description: "Connect with spiritual guides from the comfort of your home through video conferencing.",
      price: "$65 / session",
      duration: "45 minutes",
      location: "Online",
      image: "/images/user-placeholder.jpg",
      rating: 4.7,
      participants: "Individual",
    },
    {
      title: "Group Meditation Circle",
      description: "Join a virtual community meditation session led by experienced facilitators.",
      price: "$25 / session",
      duration: "60 minutes",
      location: "Online",
      image: "/images/priest-placeholder.jpg",
      rating: 4.6,
      participants: "Group (max 15)",
    },
  ];

  return (
    <PageTransition>
      <section className="relative bg-gradient-to-b from-meant-100 to-white py-20 px-4">
        <div className="container mx-auto pt-16">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-meant-200 text-meant-800 text-sm font-medium mb-3">
              Spiritual Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
                Find Inner Peace and Spiritual Growth
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Our spiritual services blend ancient wisdom with modern mental health practices 
              to nourish your mind, body, and spirit on your journey to wellbeing.
            </p>
          </div>

          <div className="mb-12">
            <Tabs 
              defaultValue="services" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="glass bg-white">
                  <TabsTrigger value="services">All Services</TabsTrigger>
                  <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  <TabsTrigger value="consultations">Guru Consultations</TabsTrigger>
                  <TabsTrigger value="tours">Spiritual Travel</TabsTrigger>
                  <TabsTrigger value="video">Video Consultations</TabsTrigger>
                  <TabsTrigger value="yoga">Yoga Therapy</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="services">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...meditationServices, ...counselingServices, ...yogaServices, ...videoServices]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6)
                    .map((service, index) => (
                      <SpiritualService
                        key={index}
                        {...service}
                        index={index}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="meditation">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meditationServices.map((service, index) => (
                    <SpiritualService
                      key={index}
                      {...service}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="consultations">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {counselingServices.map((service, index) => (
                    <SpiritualService
                      key={index}
                      {...service}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tours">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yogaServices.map((service, index) => (
                    <SpiritualService
                      key={index}
                      {...service}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="video">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoServices.map((service, index) => (
                    <SpiritualService
                      key={index}
                      {...service}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="yoga">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yogaServices.map((service, index) => (
                    <SpiritualService
                      key={index}
                      {...service}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <Card className="glass bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Our Spiritual Approach</CardTitle>
                <CardDescription>
                  How we integrate spirituality with mental health care
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="text-meant-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Holistic Integration</h3>
                    <p className="text-muted-foreground">
                      We believe in addressing the whole person—mind, body, and spirit. Our spiritual services 
                      complement traditional mental health approaches for comprehensive wellbeing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                    <Users className="text-meant-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Inclusive and Respectful</h3>
                    <p className="text-muted-foreground">
                      Our approach honors all faith traditions and spiritual paths. We create a safe, 
                      non-judgmental space for exploration and growth at your own pace.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-meant-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Evidence-Informed</h3>
                    <p className="text-muted-foreground">
                      Our spiritual practices are grounded in research showing their benefits for mental health, 
                      including reduced anxiety, improved mood, and enhanced resilience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default SpiritualityPage;
