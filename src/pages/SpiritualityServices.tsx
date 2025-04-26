
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpiritualServiceBooking from "@/components/spirituality/SpiritualServiceBooking";

const SpiritualityServices = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Spiritual Services";
  }, []);

  // Sample spiritual services data
  const priestConsultations = [
    {
      id: "p1",
      title: "Spiritual Guidance Session",
      description: "One-on-one guidance session to help align your life with your deepest values and spiritual beliefs.",
      price: 1500,
      duration: "60 minutes",
      location: "Online / In-person",
      isGroup: false
    },
    {
      id: "p2",
      title: "Ritual Consultation",
      description: "Learn about traditional rituals and their significance for mental peace and spiritual growth.",
      price: 1200,
      duration: "45 minutes",
      location: "Online",
      isGroup: false
    }
  ];

  const spiritualTours = [
    {
      id: "t1",
      title: "Sacred Temple Tour",
      description: "Visit ancient temples and sacred sites with expert guidance on their spiritual significance.",
      price: 2500,
      duration: "4 hours",
      location: "Varanasi",
      isGroup: true,
      maxParticipants: 10
    },
    {
      id: "t2",
      title: "Meditation Retreat",
      description: "A day-long retreat focusing on meditation practices in a serene natural setting.",
      price: 3000,
      duration: "Full day",
      location: "Rishikesh",
      isGroup: true,
      maxParticipants: 12
    }
  ];

  return (
    <MainLayout title="Spiritual Services">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-3xl font-bold mb-4">Spiritual Services</h1>
            <p className="text-muted-foreground">
              Connect with spiritual guides and experiences that support your mental wellbeing journey.
              Our services blend traditional wisdom with modern mental health practices.
            </p>
          </div>
          
          <Tabs defaultValue="tours" className="space-y-8">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="consultations">Priest Consultations</TabsTrigger>
              <TabsTrigger value="tours">Spiritual Tours</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consultations" className="space-y-6">
              <div className="grid gap-6">
                {priestConsultations.map(service => (
                  <div key={service.id} className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                    <SpiritualServiceBooking
                      serviceId={service.id}
                      title={service.title}
                      price={service.price}
                      duration={service.duration}
                      location={service.location}
                      isGroup={service.isGroup}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tours" className="space-y-6">
              <div className="grid gap-6">
                {spiritualTours.map(tour => (
                  <div key={tour.id} className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                    <p className="text-muted-foreground mb-4">{tour.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Max {tour.maxParticipants}</span>
                      </div>
                    </div>
                    <SpiritualServiceBooking
                      serviceId={tour.id}
                      title={tour.title}
                      price={tour.price}
                      duration={tour.duration}
                      location={tour.location}
                      isGroup={tour.isGroup}
                      maxParticipants={tour.maxParticipants}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpiritualityServices;
