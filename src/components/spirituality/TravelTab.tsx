
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

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

const retreatData = [
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
];

const TravelTab: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {retreatData.map((retreat, index) => (
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
  );
};

export default TravelTab;
