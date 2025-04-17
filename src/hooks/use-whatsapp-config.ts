
import { useState, useEffect } from "react";
import WhatsAppService from "@/services/WhatsAppService";
import { toast } from "sonner";

export interface WhatsAppConfig {
  businessId: string;
  accessToken: string;
  phoneId: string;
  verifyToken: string;
  isConfigured: boolean;
}

export interface NotificationSettings {
  bookingConfirmation: boolean;
  appointmentReminder: boolean;
  servicePromotions: boolean;
  aiAgentCalls: boolean;
}

export const useWhatsAppConfig = () => {
  const [config, setConfig] = useState<WhatsAppConfig>({
    businessId: "",
    accessToken: "",
    phoneId: "",
    verifyToken: "",
    isConfigured: false
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    bookingConfirmation: true,
    appointmentReminder: true,
    servicePromotions: false,
    aiAgentCalls: false
  });
  
  const [isConnectionValid, setIsConnectionValid] = useState<boolean | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  
  useEffect(() => {
    // Load configuration from localStorage
    const businessId = localStorage.getItem("whatsapp_business_id") || "";
    const accessToken = localStorage.getItem("whatsapp_access_token") || "";
    const phoneId = localStorage.getItem("whatsapp_phone_id") || "";
    const verifyToken = localStorage.getItem("whatsapp_verify_token") || "";
    
    const isConfigured = !!(businessId && accessToken && phoneId);
    
    setConfig({
      businessId,
      accessToken,
      phoneId,
      verifyToken,
      isConfigured
    });
    
    // Load notification settings
    const savedSettings = localStorage.getItem("whatsapp_notification_settings");
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
    
    // Check connection status if configured
    if (isConfigured) {
      // If last checked within the last 24 hours, use cached result
      const lastChecked = localStorage.getItem("whatsapp_last_checked");
      const lastStatus = localStorage.getItem("whatsapp_connection_valid");
      
      if (lastChecked && lastStatus) {
        const checkedDate = new Date(lastChecked);
        const now = new Date();
        const hoursDiff = (now.getTime() - checkedDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsConnectionValid(lastStatus === "true");
        }
      }
    }
  }, []);
  
  const saveConfiguration = (newConfig: Partial<WhatsAppConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    
    localStorage.setItem("whatsapp_business_id", updatedConfig.businessId);
    localStorage.setItem("whatsapp_access_token", updatedConfig.accessToken);
    localStorage.setItem("whatsapp_phone_id", updatedConfig.phoneId);
    
    if (updatedConfig.verifyToken) {
      localStorage.setItem("whatsapp_verify_token", updatedConfig.verifyToken);
    }
    
    const isConfigured = !!(updatedConfig.businessId && updatedConfig.accessToken && updatedConfig.phoneId);
    
    setConfig({
      ...updatedConfig,
      isConfigured
    });
    
    return isConfigured;
  };
  
  const saveNotificationSettings = (settings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...notificationSettings, ...settings };
    
    localStorage.setItem("whatsapp_notification_settings", JSON.stringify(updatedSettings));
    setNotificationSettings(updatedSettings);
    
    return true;
  };
  
  const testConnection = async () => {
    if (!config.isConfigured) {
      toast.error("WhatsApp configuration is incomplete");
      return false;
    }
    
    setIsTestingConnection(true);
    
    try {
      const whatsappService = WhatsAppService.getInstance();
      const isValid = await whatsappService.testConnection();
      
      setIsConnectionValid(isValid);
      
      // Store the result
      localStorage.setItem("whatsapp_last_checked", new Date().toISOString());
      localStorage.setItem("whatsapp_connection_valid", isValid.toString());
      
      if (isValid) {
        toast.success("WhatsApp connection validated successfully");
      } else {
        toast.error("WhatsApp connection failed. Check your credentials");
      }
      
      return isValid;
    } catch (error) {
      console.error("Error testing WhatsApp connection:", error);
      setIsConnectionValid(false);
      toast.error("Error testing WhatsApp connection");
      return false;
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  const generateVerifyToken = () => {
    const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    localStorage.setItem("whatsapp_verify_token", newToken);
    setConfig({ ...config, verifyToken: newToken });
    
    return newToken;
  };
  
  return {
    config,
    notificationSettings,
    isConnectionValid,
    isTestingConnection,
    saveConfiguration,
    saveNotificationSettings,
    testConnection,
    generateVerifyToken
  };
};

export default useWhatsAppConfig;
