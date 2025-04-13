
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video, User, Calendar } from "lucide-react";

const eventData = [
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
];

const VideoTab: React.FC = () => {
  return (
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
          {eventData.map((event, index) => (
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
  );
};

export default VideoTab;
