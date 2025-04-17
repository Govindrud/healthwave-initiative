
export interface WhatsAppTemplate {
  name: string;
  language: {
    code: string;
  };
  components: Array<{
    type: string;
    parameters: Array<{
      type: string;
      text?: string;
      image?: {
        link: string;
      };
      document?: {
        link: string;
      };
    }>;
  }>;
}

export interface WhatsAppRecipient {
  name: string;
  phone: string;
  variables?: string[];
}

class WhatsAppService {
  private static instance: WhatsAppService;
  private baseUrl = "https://graph.facebook.com/v17.0";
  
  private constructor() {}
  
  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }
  
  private getConfiguration() {
    const businessId = localStorage.getItem("whatsapp_business_id");
    const accessToken = localStorage.getItem("whatsapp_access_token");
    const phoneId = localStorage.getItem("whatsapp_phone_id");
    
    if (!businessId || !accessToken || !phoneId) {
      throw new Error("WhatsApp configuration is incomplete");
    }
    
    return { businessId, accessToken, phoneId };
  }
  
  async sendTemplateMessage(
    templateName: string,
    recipient: WhatsAppRecipient
  ): Promise<boolean> {
    try {
      const { phoneId, accessToken } = this.getConfiguration();
      
      // For demonstration, we're just logging the request
      console.log("Sending WhatsApp template message:", {
        templateName,
        recipient,
        to: recipient.phone
      });
      
      // In a real implementation, this would send an API request to WhatsApp
      // const response = await fetch(`${this.baseUrl}/${phoneId}/messages`, {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${accessToken}`,
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     messaging_product: "whatsapp",
      //     to: recipient.phone,
      //     type: "template",
      //     template: {
      //       name: templateName,
      //       language: {
      //         code: "en_US"
      //       },
      //       components: this.buildTemplateComponents(recipient.variables || [])
      //     }
      //   })
      // });
      
      // For demo purposes, simulate success
      return true;
    } catch (error) {
      console.error("Failed to send WhatsApp message:", error);
      return false;
    }
  }
  
  private buildTemplateComponents(variables: string[]) {
    // Build the components array for template variables
    const components = [];
    
    if (variables.length > 0) {
      const component = {
        type: "body",
        parameters: variables.map(text => ({ type: "text", text }))
      };
      components.push(component);
    }
    
    return components;
  }
  
  async sendBookingConfirmation(booking: {
    customerName: string;
    customerPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
  }): Promise<boolean> {
    const template = "booking_confirmation";
    const recipient = {
      name: booking.customerName,
      phone: booking.customerPhone,
      variables: [
        booking.customerName,
        booking.serviceName,
        `${booking.bookingDate} at ${booking.bookingTime}`
      ]
    };
    
    return this.sendTemplateMessage(template, recipient);
  }
  
  async sendAppointmentReminder(appointment: {
    customerName: string;
    customerPhone: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
  }): Promise<boolean> {
    const template = "appointment_reminder";
    const recipient = {
      name: appointment.customerName,
      phone: appointment.customerPhone,
      variables: [
        appointment.customerName,
        appointment.serviceName,
        appointment.appointmentTime
      ]
    };
    
    return this.sendTemplateMessage(template, recipient);
  }
  
  async sendServicePromotion(
    promotion: {
      serviceName: string;
      description: string;
      offerDetails: string;
    },
    recipients: {
      name: string;
      phone: string;
    }[]
  ): Promise<{success: number; failed: number}> {
    let success = 0;
    let failed = 0;
    
    for (const recipient of recipients) {
      const result = await this.sendTemplateMessage("service_promotion", {
        name: recipient.name,
        phone: recipient.phone,
        variables: [
          recipient.name,
          promotion.serviceName,
          promotion.description,
          promotion.offerDetails
        ]
      });
      
      if (result) {
        success++;
      } else {
        failed++;
      }
    }
    
    return { success, failed };
  }
  
  // Used to test the WhatsApp connection
  async testConnection(): Promise<boolean> {
    try {
      const { businessId, accessToken } = this.getConfiguration();
      
      // In a real implementation, this would check connection with the WhatsApp API
      // const response = await fetch(`${this.baseUrl}/${businessId}`, {
      //   headers: {
      //     "Authorization": `Bearer ${accessToken}`
      //   }
      // });
      
      // For demo purposes, simulate success
      return true;
    } catch (error) {
      console.error("Failed to test WhatsApp connection:", error);
      return false;
    }
  }
}

export default WhatsAppService;
