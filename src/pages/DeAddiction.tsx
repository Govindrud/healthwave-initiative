
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Milestone, BadgeHelp, Heart, Shield, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceBookingForm from "@/components/services/ServiceBookingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DeAddiction = () => {
  useEffect(() => {
    document.title = "MeantToHelp | De-addiction Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="De-addiction Services">
      <div className="bg-gradient-to-b from-meant-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-meant-800">De-addiction Services</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Our specialized de-addiction services provide comprehensive support for individuals 
              dealing with substance abuse and behavioral addictions.
            </p>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <Card className="border-meant-100">
                <CardContent className="p-6">
                  <Tabs defaultValue="program">
                    <TabsList className="mb-6">
                      <TabsTrigger value="program">Program Details</TabsTrigger>
                      <TabsTrigger value="booking">Book Consultation</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="program">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Milestone className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Personalized Recovery Plan</h3>
                            <p className="text-muted-foreground text-sm">
                              Tailored approach based on individual needs and addiction patterns
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <BadgeHelp className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Professional Guidance</h3>
                            <p className="text-muted-foreground text-sm">
                              Support from certified addiction specialists and therapists
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <Heart className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Holistic Healing</h3>
                            <p className="text-muted-foreground text-sm">
                              Addressing physical, mental and emotional aspects of recovery
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <Users className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold mb-1">Support Groups</h3>
                            <p className="text-muted-foreground text-sm">
                              Access to community support and group therapy sessions
                            </p>
                          </div>
                        </div>

                        <Button className="w-full bg-meant-600 hover:bg-meant-700 mt-4">
                          Learn More About Our Approach
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="booking">
                      <ServiceBookingForm
                        serviceTitle="De-addiction Consultation"
                        servicePrice={2500}
                        serviceType="de_addiction"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-6">
                <Card className="border-meant-100 p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Confidentiality Guaranteed</h3>
                      <p className="text-muted-foreground text-sm">
                        All sessions and information are kept strictly confidential
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="border-meant-100 p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-meant-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Programs</h3>
                      <p className="text-muted-foreground text-sm">
                        Choose from different program durations and intensity levels
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="bg-meant-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-meant-800">24/7 Support Hotline</h3>
                  <p className="text-sm text-meant-600 mb-4">
                    Access immediate support whenever you need it
                  </p>
                  <div className="text-lg font-bold text-meant-800">+91 800-123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeAddiction;
