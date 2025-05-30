
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Settings, BookOpen, Heart, Calendar } from 'lucide-react';

const Profile = () => {
  useEffect(() => {
    document.title = "My Profile - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="My Profile - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-meant-800 mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your account and track your mental health journey</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Info */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-meant-600" />
                    </div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Activity Overview */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Your Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-meant-600">3</div>
                      <div className="text-sm text-muted-foreground">Assessments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-meant-600">8</div>
                      <div className="text-sm text-muted-foreground">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-meant-600">15</div>
                      <div className="text-sm text-muted-foreground">Days Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-meant-600">85%</div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-meant-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-meant-600" />
                        <span>Latest Assessment</span>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-meant-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-5 w-5 text-meant-600" />
                        <span>Therapy Session</span>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-meant-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-meant-600" />
                        <span>Next Appointment</span>
                      </div>
                      <Badge variant="secondary">Tomorrow</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
