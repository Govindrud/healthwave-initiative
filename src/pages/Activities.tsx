
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trees, Activity, Leaf, Calendar, Users, Clock } from 'lucide-react';

const Activities = () => {
  useEffect(() => {
    document.title = "Mental Health Activities - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const activities = [
    {
      id: 1,
      title: "Mindful Forest Walk",
      category: "Nature Therapy",
      duration: "2 hours",
      participants: "8-12 people",
      location: "Delhi Ridge Forest",
      date: "Every Saturday",
      price: "₹500",
      description: "Connect with nature through guided mindful walking in serene forest settings",
      icon: Trees,
      benefits: ["Stress reduction", "Mindfulness practice", "Fresh air therapy"]
    },
    {
      id: 2,
      title: "Therapeutic Art Workshop",
      category: "Creative Therapy",
      duration: "3 hours",
      participants: "6-10 people",
      location: "Art Studio, Mumbai",
      date: "Every Sunday",
      price: "₹800",
      description: "Express emotions and thoughts through guided art therapy sessions",
      icon: Activity,
      benefits: ["Emotional expression", "Creativity boost", "Self-discovery"]
    },
    {
      id: 3,
      title: "Breathing & Relaxation Circle",
      category: "Wellness Practice",
      duration: "1.5 hours",
      participants: "10-15 people",
      location: "Community Center, Bangalore",
      date: "Tuesday & Thursday",
      price: "₹300",
      description: "Learn advanced breathing techniques for stress management and relaxation",
      icon: Leaf,
      benefits: ["Anxiety relief", "Better sleep", "Improved focus"]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nature Therapy': return 'bg-green-100 text-green-800';
      case 'Creative Therapy': return 'bg-purple-100 text-purple-800';
      case 'Wellness Practice': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout title="Mental Health Activities - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-meant-800 mb-4">Mental Health Activities</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join our therapeutic activities designed to promote mental well-being through nature, creativity, and mindfulness
              </p>
            </div>

            {/* Activity Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {activities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-meant-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-meant-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-meant-800">{activity.title}</CardTitle>
                            <Badge className={getCategoryColor(activity.category)}>
                              {activity.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-meant-600">{activity.price}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{activity.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{activity.participants}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Trees className="h-4 w-4 mr-2" />
                          <span>{activity.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-meant-800 mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-meant-600 hover:bg-meant-700">
                        Book Activity
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Call to Action */}
            <Card className="bg-meant-50 border-meant-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-meant-800 mb-4">
                  Can't find the right activity?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We offer customized group activities for organizations and communities. 
                  Contact us to design an activity that meets your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-meant-600 hover:bg-meant-700">
                    Request Custom Activity
                  </Button>
                  <Button variant="outline" className="border-meant-600 text-meant-600 hover:bg-meant-50">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Activities;
