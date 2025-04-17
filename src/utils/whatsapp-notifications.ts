
import WhatsAppService from "@/services/WhatsAppService";

export const sendBookingConfirmationWhatsApp = async (
  booking: {
    customerName: string;
    customerPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
  }
) => {
  // Check if WhatsApp notifications are enabled
  const notificationSettings = localStorage.getItem("whatsapp_notification_settings");
  if (!notificationSettings) return;
  
  const settings = JSON.parse(notificationSettings);
  if (!settings.bookingConfirmation) return;
  
  try {
    const whatsappService = WhatsAppService.getInstance();
    const result = await whatsappService.sendBookingConfirmation(booking);
    
    if (result) {
      console.log("WhatsApp booking confirmation sent successfully");
      return true;
    } else {
      console.error("Failed to send WhatsApp booking confirmation");
      return false;
    }
  } catch (error) {
    console.error("Error sending WhatsApp booking confirmation:", error);
    return false;
  }
};

export const sendAppointmentReminderWhatsApp = async (
  appointment: {
    customerName: string;
    customerPhone: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
  }
) => {
  // Check if WhatsApp notifications are enabled
  const notificationSettings = localStorage.getItem("whatsapp_notification_settings");
  if (!notificationSettings) return;
  
  const settings = JSON.parse(notificationSettings);
  if (!settings.appointmentReminder) return;
  
  try {
    const whatsappService = WhatsAppService.getInstance();
    const result = await whatsappService.sendAppointmentReminder(appointment);
    
    if (result) {
      console.log("WhatsApp appointment reminder sent successfully");
      return true;
    } else {
      console.error("Failed to send WhatsApp appointment reminder");
      return false;
    }
  } catch (error) {
    console.error("Error sending WhatsApp appointment reminder:", error);
    return false;
  }
};

export const sendServicePromotionWhatsApp = async (
  promotion: {
    serviceName: string;
    description: string;
    offerDetails: string;
  },
  recipients: {
    name: string;
    phone: string;
  }[]
) => {
  // Check if WhatsApp notifications are enabled
  const notificationSettings = localStorage.getItem("whatsapp_notification_settings");
  if (!notificationSettings) return;
  
  const settings = JSON.parse(notificationSettings);
  if (!settings.servicePromotions) return;
  
  try {
    const whatsappService = WhatsAppService.getInstance();
    const result = await whatsappService.sendServicePromotion(promotion, recipients);
    
    console.log(`WhatsApp promotion sent to ${result.success} recipients, failed for ${result.failed}`);
    return result;
  } catch (error) {
    console.error("Error sending WhatsApp service promotion:", error);
    return { success: 0, failed: recipients.length };
  }
};
