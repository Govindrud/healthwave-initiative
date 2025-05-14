
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServicePaymentButton from "@/components/services/ServicePaymentButton";

interface ServiceBookingFormProps {
  serviceId?: string;
  title: string;
  price: number;
  duration?: string;
  provider?: string;
  location?: string;
  type: string;
  serviceTitle?: string;
  servicePrice?: number;
  serviceType?: string;
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({
  serviceId,
  title,
  price,
  duration,
  provider,
  location,
  type,
  serviceTitle,
  servicePrice,
  serviceType
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formIsValid = customerInfo.name && customerInfo.email && customerInfo.phone;
  
  // Use the service-specific props if provided, otherwise use the general props
  const finalTitle = serviceTitle || title;
  const finalPrice = servicePrice || price;
  const finalType = serviceType || type;

  return (
    <Card className="w-full border-green-100">
      <CardHeader>
        <CardTitle className="text-green-800">{duration && provider ? `Book ${finalTitle}` : finalTitle}</CardTitle>
        {duration && provider && (
          <div className="text-sm text-muted-foreground">
            <div>{duration} with {provider}</div>
            {location && <div>Location: {location}</div>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="text-xl font-bold text-green-800 mb-4">₹{finalPrice}</div>
        <ServicePaymentButton 
          amount={finalPrice}
          title={finalTitle}
          serviceType={finalType}
          serviceId={serviceId}
          customerInfo={customerInfo}
          disabled={!formIsValid}
        />
      </CardFooter>
    </Card>
  );
};

export default ServiceBookingForm;
