
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const BhaktiYogaTab: React.FC = () => {
  return (
    <>
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
                src="https://images.unsplash.com/photo-1508672019048-805c876b67e2" 
                alt="Devotees at a temple ceremony" 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600510068651-5fe4a2570a8c" 
                alt="Traditional puja ceremony" 
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
              src="https://images.unsplash.com/photo-1564391744677-0e146f4a5e68" 
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
            src="https://images.unsplash.com/photo-1604881991720-f91add269bed" 
            alt="Offering flowers at temple" 
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be" 
            alt="Sacred ritual" 
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1609153315898-e1e5a0061f92" 
            alt="Devotional singing" 
            className="w-full h-64 object-cover"
          />
        </div>
      </motion.div>
    </>
  );
};

export default BhaktiYogaTab;
