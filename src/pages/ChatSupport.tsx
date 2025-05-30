
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Clock, Users, CheckCircle } from 'lucide-react';

const ChatSupport = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    document.title = "Chat Support - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Chat Support - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <Badge className={`${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isOnline ? 'Support Online' : 'Support Offline'}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-meant-800 mb-4">Live Chat Support</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Connect with our mental health support team in real-time for immediate assistance
              </p>
            </div>

            {/* Chat Interface */}
            <Card className="mb-8 border-blue-200">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <span>Start a Conversation</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">3 agents online</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-4">Ready to Help You</h3>
                  <p className="text-muted-foreground mb-6">
                    Our trained support specialists are here to listen and provide guidance
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={() => {
                      // In a real app, this would open a chat widget
                      alert('Chat feature will be implemented with a real chat service');
                    }}
                  >
                    <MessageCircle className="mr-2" />
                    Start Chat Now
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Average response time: Under 30 seconds
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Instant Response</h3>
                  <p className="text-muted-foreground">Get help within seconds, not hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Trained Specialists</h3>
                  <p className="text-muted-foreground">Certified mental health support professionals</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Confidential</h3>
                  <p className="text-muted-foreground">Secure, private conversations</p>
                </CardContent>
              </Card>
            </div>

            {/* Alternative Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Get Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Phone Support</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Speak directly with our support team
                    </p>
                    <Button variant="outline" className="w-full">
                      Call +1 (800) 123-4567
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send us a detailed message
                    </p>
                    <Button variant="outline" className="w-full">
                      Email Us
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatSupport;
