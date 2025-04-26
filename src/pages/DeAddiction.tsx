
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Milestone, BadgeHelp, Heart, Shield, Users, Calendar, Clock, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceBookingForm from "@/components/services/ServiceBookingForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DeAddiction = () => {
  useEffect(() => {
    document.title = "MeantToHelp | De-addiction Services";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-meant-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-meant-800">
                Your Journey to Recovery Starts Here
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Our specialized de-addiction services provide comprehensive support with a focus on lasting recovery and holistic healing.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Programs</CardTitle>
                  <CardDescription>Tailored treatment plans for your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Shield className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Personalized Care</h3>
                        <p className="text-sm text-muted-foreground">Treatment plans customized to your specific needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Flexible Programs</h3>
                        <p className="text-sm text-muted-foreground">Choose from various program durations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Group Support</h3>
                        <p className="text-sm text-muted-foreground">Access to supportive community and group therapy</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Support</CardTitle>
                  <CardDescription>Professional guidance at every step</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="consult">
                    <TabsList className="mb-4">
                      <TabsTrigger value="consult">Consultation</TabsTrigger>
                      <TabsTrigger value="book">Book Session</TabsTrigger>
                    </TabsList>
                    <TabsContent value="consult">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Schedule a confidential consultation with our addiction specialists to discuss your needs and create a recovery plan.
                        </p>
                        <Button className="w-full" variant="meant">
                          Schedule Free Consultation
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="book">
                      <ServiceBookingForm
                        serviceTitle="De-addiction Program"
                        serviceType="de_addiction"
                        servicePrice={2500}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block p-4 rounded-lg bg-meant-50 mb-8">
                <HandHeart className="h-8 w-8 text-meant-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">24/7 Support Available</h2>
              <p className="text-muted-foreground mb-6">
                Our support line is always open. Reach out anytime for immediate assistance.
              </p>
              <div className="text-xl font-bold text-meant-600">+91 800-123-4567</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeAddiction;
