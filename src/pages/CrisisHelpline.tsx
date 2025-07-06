
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Shield, Heart } from 'lucide-react';
import crisisSupport from '@/assets/crisis-support.jpg';

const CrisisHelpline = () => {
  useEffect(() => {
    document.title = "Crisis Helpline - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const crisisNumbers = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 support via text message"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service"
    }
  ];

  return (
    <MainLayout title="Crisis Helpline - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <img 
                  src={crisisSupport} 
                  alt="Crisis Support" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
                />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Crisis Support Available 24/7</h1>
                <p className="text-lg md:text-xl">If you're in immediate danger, call 911 or go to your nearest emergency room</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-red-200">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Call Now</h3>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
                    onClick={() => window.open('tel:988', '_self')}
                  >
                    <Phone className="mr-2" />
                    Call 988
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Free, confidential, 24/7</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Text Support</h3>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={() => window.open('sms:741741?body=HOME', '_self')}
                  >
                    <MessageCircle className="mr-2" />
                    Text HOME to 741741
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Crisis Text Line</p>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Numbers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-center mb-6">Crisis Resources</h2>
              <div className="space-y-4">
                {crisisNumbers.map((crisis, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{crisis.name}</h3>
                          <p className="text-muted-foreground">{crisis.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{crisis.number}</div>
                          <Button size="sm" className="mt-2">
                            Call Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Support Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-10 w-10 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-sm text-muted-foreground">Round-the-clock support when you need it most</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-10 w-10 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Confidential</h3>
                  <p className="text-sm text-muted-foreground">Your privacy is protected and respected</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-10 w-10 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Compassionate</h3>
                  <p className="text-sm text-muted-foreground">Trained professionals who understand and care</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CrisisHelpline;
