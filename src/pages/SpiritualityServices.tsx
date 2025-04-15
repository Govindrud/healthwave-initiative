
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import SpiritualServiceBooking from "@/components/spirituality/SpiritualServiceBooking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SpiritualityServices = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Spiritual Services";
  }, []);

  // Sample spiritual services data
  const priestConsultations = [
    {
      id: "p1",
      title: "Spiritual Guidance Session",
      description: "One-on-one guidance to help align your life with your deepest values and spiritual beliefs.",
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Spiritual Services</h1>
            <p className="text-muted-foreground">
              Connect with spiritual guides and experiences that support your mental wellbeing journey.
              Our services blend traditional wisdom with modern mental health practices.
            </p>
          </div>
          
          <Tabs defaultValue="consultations">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="consultations">Priest Consultations</TabsTrigger>
              <TabsTrigger value="tours">Spiritual Tours</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consultations" className="space-y-6">
              <div className="bg-meant-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Connect with Spiritual Guides</h2>
                <p className="mb-4">
                  Our experienced spiritual guides offer personal consultations to help you navigate life's challenges 
                  through a spiritual lens, providing rituals and practices that complement mental health care.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {priestConsultations.map(service => (
                    <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
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
              </div>
            </TabsContent>
            
            <TabsContent value="tours" className="space-y-6">
              <div className="bg-meant-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Experience Sacred Journeys</h2>
                <p className="mb-4">
                  Join our guided tours to sacred sites and retreats designed to provide space for reflection,
                  meditation, and connecting with traditional spiritual practices.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {spiritualTours.map(tour => (
                    <div key={tour.id} className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-medium mb-2">{tour.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{tour.description}</p>
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpiritualityServices;
