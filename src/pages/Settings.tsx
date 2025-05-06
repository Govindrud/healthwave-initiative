
import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useRegion } from "@/context/RegionContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Settings: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { region, setRegion, currency, setCurrency, language, setLanguage } = useRegion();
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view settings</h1>
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
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Regional Preferences</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={region} onValueChange={(value) => setRegion(value as any)}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={(value) => setCurrency(value as any)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Notification Settings</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive booking confirmations and reminders</p>
                </div>
                <Switch defaultChecked id="email-notifications" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">WhatsApp Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get important updates via WhatsApp</p>
                </div>
                <Switch id="whatsapp-notifications" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Special Offers</h3>
                  <p className="text-sm text-muted-foreground">Receive information about promotions and discounts</p>
                </div>
                <Switch id="special-offers" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  These actions are permanent and cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
