
import React from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar || ""} />
                    <AvatarFallback className="text-2xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-semibold">{user?.name || "User"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                  
                  <Button variant="outline" className="mt-4 w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue="bookings">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="purchases">Purchase History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium">Your Upcoming Bookings</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You have no upcoming bookings.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="purchases">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium">Recent Purchases</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No recent purchases found.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Email Notifications</h4>
                      <div className="flex items-center justify-between">
                        <span>Booking reminders</span>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Privacy Settings</h4>
                      <div className="flex items-center justify-between">
                        <span>Profile visibility</span>
                        <Button variant="outline" size="sm">Private</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
