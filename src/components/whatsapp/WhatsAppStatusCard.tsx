
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const WhatsAppStatusCard = () => {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected" | "error">("disconnected");
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  
  const checkConnection = () => {
    setStatus("connecting");
    
    const businessId = localStorage.getItem("whatsapp_business_id");
    const accessToken = localStorage.getItem("whatsapp_access_token");
    const phoneId = localStorage.getItem("whatsapp_phone_id");
    
    if (!businessId || !accessToken || !phoneId) {
      toast.error("WhatsApp configuration is incomplete");
      setStatus("disconnected");
      return;
    }
    
    // Simulate connection check
    setTimeout(() => {
      const now = new Date();
      setLastChecked(now.toLocaleString());
      
      // For demo purposes, alternate between connected and error
      const randomStatus = Math.random() > 0.3 ? "connected" : "error";
      setStatus(randomStatus);
      
      if (randomStatus === "connected") {
        toast.success("WhatsApp connection verified successfully");
        localStorage.setItem("whatsapp_last_connected", now.toISOString());
      } else {
        toast.error("WhatsApp connection failed. Check your credentials");
      }
    }, 2000);
  };
  
  useEffect(() => {
    // Check if we've connected before
    const lastConnected = localStorage.getItem("whatsapp_last_connected");
    if (lastConnected) {
      const date = new Date(lastConnected);
      setLastChecked(date.toLocaleString());
      setStatus("connected");
    }
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Status</CardTitle>
        <CardDescription>
          WhatsApp Business API connection status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center space-y-3 bg-meant-50 p-6 rounded-lg border border-meant-100">
          {status === "disconnected" && (
            <Badge variant="outline" className="bg-gray-100">
              Disconnected
            </Badge>
          )}
          
          {status === "connecting" && (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Connecting
            </Badge>
          )}
          
          {status === "connected" && (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
          
          {status === "error" && (
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Connection Error
            </Badge>
          )}
          
          {lastChecked && (
            <p className="text-xs text-muted-foreground mt-1">
              Last checked: {lastChecked}
            </p>
          )}
        </div>
        
        <Button 
          onClick={checkConnection} 
          variant="outline" 
          className="w-full"
          disabled={status === "connecting"}
        >
          {status === "connecting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking connection
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WhatsAppStatusCard;
