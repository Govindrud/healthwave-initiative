
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, IndianRupee } from "lucide-react";
import ServiceBookingForm from "../services/ServiceBookingForm";

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  participants: number;
  price: number;
  displayPrice: string;
  tags: string[];
}

const WebinarListing: React.FC = () => {
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null);

  const webinars: Webinar[] = [
    {
      id: "web-001",
      title: "Understanding Anxiety in Modern Life",
      description: "Explore the root causes of anxiety in today's fast-paced world and learn effective coping mechanisms.",
      date: "June 15, 2025",
      time: "7:00 PM IST",
      duration: "90 minutes",
      host: "Dr. Sarah Johnson",
      participants: 245,
      price: 999,
      displayPrice: "₹999",
      tags: ["anxiety", "stress-management", "mental-wellness"]
    },
    {
      id: "web-002",
      title: "Mindfulness for Beginners",
      description: "A practical introduction to mindfulness techniques that can be incorporated into your daily routine.",
      date: "June 22, 2025",
      time: "6:30 PM IST",
      duration: "60 minutes",
      host: "Dr. Michael Chen",
      participants: 178,
      price: 799,
      displayPrice: "₹799",
      tags: ["mindfulness", "meditation", "beginners"]
    },
    {
      id: "web-003",
      title: "Building Emotional Resilience",
      description: "Learn strategies to develop emotional resilience and bounce back from life's challenges.",
      date: "July 5, 2025",
      time: "11:00 AM IST",
      duration: "120 minutes",
      host: "Dr. Priya Sharma",
      participants: 312,
      price: 1299,
      displayPrice: "₹1,299",
      tags: ["resilience", "emotional-intelligence", "self-development"]
    },
    {
      id: "web-004",
      title: "Sleep Hygiene and Mental Health",
      description: "Discover the critical connection between sleep quality and mental wellbeing, with actionable tips.",
      date: "July 12, 2025",
      time: "8:00 PM IST",
      duration: "75 minutes",
      host: "Dr. James Wilson",
      participants: 189,
      price: 899,
      displayPrice: "₹899",
      tags: ["sleep", "mental-health", "wellness"]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {webinars.map((webinar) => (
          <Card key={webinar.id} className="overflow-hidden border-meant-100">
            <CardHeader className="bg-meant-50">
              <div className="flex flex-wrap gap-2 mb-2">
                {webinar.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle>{webinar.title}</CardTitle>
              <CardDescription>Hosted by {webinar.host}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {selectedWebinar !== webinar.id ? (
                <>
                  <p className="mb-4">{webinar.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-meant-600" />
                      <span className="text-sm">{webinar.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-meant-600" />
                      <span className="text-sm">{webinar.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-meant-600" />
                      <span className="text-sm">{webinar.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-meant-600" />
                      <span className="text-sm">{webinar.participants} registered</span>
                    </div>
                  </div>
                </>
              ) : (
                <ServiceBookingForm 
                  serviceTitle={webinar.title}
                  servicePrice={webinar.price}
                  serviceId={webinar.id}
                  serviceType="webinar"
                />
              )}
            </CardContent>
            {selectedWebinar !== webinar.id && (
              <CardFooter className="flex justify-between items-center bg-gray-50 border-t border-gray-100">
                <div className="font-bold text-lg flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {webinar.displayPrice}
                </div>
                <Button 
                  className="bg-meant-600 hover:bg-meant-700"
                  onClick={() => setSelectedWebinar(webinar.id)}
                >
                  Register Now
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WebinarListing;
