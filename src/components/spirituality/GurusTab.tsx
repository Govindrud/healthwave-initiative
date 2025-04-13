
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

const gurusData = [
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
];

const GurusTab: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {gurusData.map((guru, index) => (
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
  );
};

export default GurusTab;
