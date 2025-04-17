
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MessageSquare, Check, Webhook, Bell, Calendar, Sparkles, CircleOff, Copy } from "lucide-react";
import WhatsAppStatusCard from "@/components/whatsapp/WhatsAppStatusCard";
import WhatsAppTemplateEditor from "@/components/whatsapp/WhatsAppTemplateEditor";

const WhatsAppConfig = () => {
  const [configData, setConfigData] = useState({
    whatsappBusinessId: localStorage.getItem("whatsapp_business_id") || "",
    whatsappAccessToken: localStorage.getItem("whatsapp_access_token") || "",
    whatsappPhoneId: localStorage.getItem("whatsapp_phone_id") || "",
    webhookUrl: window.location.origin + "/api/whatsapp-webhook",
    verifyToken: localStorage.getItem("whatsapp_verify_token") || generateRandomToken(),
  });

  const [notificationSettings, setNotificationSettings] = useState({
    bookingConfirmation: true,
    appointmentReminder: true,
    servicePromotions: false,
    aiAgentCalls: false
  });

  function generateRandomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const saveConfiguration = () => {
    // Save to localStorage for now
    localStorage.setItem("whatsapp_business_id", configData.whatsappBusinessId);
    localStorage.setItem("whatsapp_access_token", configData.whatsappAccessToken);
    localStorage.setItem("whatsapp_phone_id", configData.whatsappPhoneId);
    localStorage.setItem("whatsapp_verify_token", configData.verifyToken);
    localStorage.setItem("whatsapp_notification_settings", JSON.stringify(notificationSettings));

    toast.success("WhatsApp configuration saved successfully");
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const onTokenRegenerate = () => {
    const newToken = generateRandomToken();
    setConfigData({...configData, verifyToken: newToken});
    toast.info("Verify token regenerated. Don't forget to save your configuration.");
  };

  return (
    <MainLayout title="WhatsApp Integration">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <MessageSquare className="h-8 w-8 mr-2 text-green-500" />
            WhatsApp Integration
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure WhatsApp Business API integration to send notifications, booking confirmations, and service updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Business API Configuration</CardTitle>
                <CardDescription>
                  Enter your WhatsApp Business API credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-id">Business Account ID</Label>
                  <Input
                    id="business-id"
                    placeholder="Enter your WhatsApp Business Account ID"
                    value={configData.whatsappBusinessId}
                    onChange={(e) => setConfigData({...configData, whatsappBusinessId: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="access-token">Permanent Access Token</Label>
                  <Input
                    id="access-token"
                    type="password"
                    placeholder="Enter your WhatsApp Access Token"
                    value={configData.whatsappAccessToken}
                    onChange={(e) => setConfigData({...configData, whatsappAccessToken: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone-id">Phone Number ID</Label>
                  <Input
                    id="phone-id"
                    placeholder="Enter your WhatsApp Phone Number ID"
                    value={configData.whatsappPhoneId}
                    onChange={(e) => setConfigData({...configData, whatsappPhoneId: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveConfiguration} className="bg-meant-600 hover:bg-meant-700">
                  <Check className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Set up these webhook details in your WhatsApp Business API dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex">
                    <Input
                      id="webhook-url"
                      readOnly
                      value={configData.webhookUrl}
                      className="rounded-r-none"
                    />
                    <Button 
                      variant="outline" 
                      className="rounded-l-none border-l-0"
                      onClick={() => copyToClipboard(configData.webhookUrl, "Webhook URL copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="verify-token">Verify Token</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onTokenRegenerate}
                    >
                      Regenerate
                    </Button>
                  </div>
                  <div className="flex">
                    <Input
                      id="verify-token"
                      readOnly
                      value={configData.verifyToken}
                      className="rounded-r-none"
                    />
                    <Button 
                      variant="outline" 
                      className="rounded-l-none border-l-0"
                      onClick={() => copyToClipboard(configData.verifyToken, "Verify token copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-meant-50 p-4 rounded-md border border-meant-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Webhook className="h-4 w-4 mr-2 text-meant-600" />
                    WhatsApp Webhook Setup Instructions
                  </h4>
                  <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                    <li>Go to your WhatsApp Business Platform or Facebook Developer Dashboard</li>
                    <li>Navigate to your WhatsApp app configuration</li>
                    <li>In the Webhooks section, add a new webhook using the URL and verify token above</li>
                    <li>Subscribe to the following webhook fields: messages, message_status_updates</li>
                    <li>Verify and save your webhook configuration</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="templates">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="templates">Message Templates</TabsTrigger>
                <TabsTrigger value="settings">Notification Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>WhatsApp Message Templates</CardTitle>
                    <CardDescription>
                      Create and manage message templates for different notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WhatsAppTemplateEditor />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure which notifications to send via WhatsApp
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="booking-confirmation">Booking Confirmations</Label>
                        <p className="text-sm text-muted-foreground">Send confirmation messages after successful bookings</p>
                      </div>
                      <Switch
                        id="booking-confirmation"
                        checked={notificationSettings.bookingConfirmation}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, bookingConfirmation: checked})}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appointment-reminder">Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send reminders 24 hours before scheduled appointments</p>
                      </div>
                      <Switch
                        id="appointment-reminder"
                        checked={notificationSettings.appointmentReminder}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, appointmentReminder: checked})}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="service-promotions">Service Promotions</Label>
                        <p className="text-sm text-muted-foreground">Send promotional messages about new services and offers</p>
                      </div>
                      <Switch
                        id="service-promotions"
                        checked={notificationSettings.servicePromotions}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, servicePromotions: checked})}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-agent-calls">AI Voice Agent Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications about AI voice agent calls and interactions</p>
                      </div>
                      <Switch
                        id="ai-agent-calls"
                        checked={notificationSettings.aiAgentCalls}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, aiAgentCalls: checked})}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={saveConfiguration} className="bg-meant-600 hover:bg-meant-700">
                      <Check className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <WhatsAppStatusCard />
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Booking Confirmations</h3>
                    <p className="text-sm text-muted-foreground">Sent after successful booking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Appointment Reminders</h3>
                    <p className="text-sm text-muted-foreground">Sent 24h before appointment</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Service Promotions</h3>
                    <p className="text-sm text-muted-foreground">New features and offers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <CircleOff className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cancellation Notices</h3>
                    <p className="text-sm text-muted-foreground">Sent when appointments are cancelled</p>
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

export default WhatsAppConfig;
