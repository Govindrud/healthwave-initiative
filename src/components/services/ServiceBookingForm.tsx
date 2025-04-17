
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServicePaymentButton from "./ServicePaymentButton";

interface ServiceBookingFormProps {
  serviceTitle: string;
  servicePrice: number;
  serviceId?: string;
  serviceType: string;
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({
  serviceTitle,
  servicePrice,
  serviceId,
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

  return (
    <Card className="w-full border-meant-100">
      <CardHeader>
        <CardTitle className="text-meant-800">Book {serviceTitle}</CardTitle>
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
        <div className="text-xl font-bold text-meant-800 mb-4">₹{servicePrice}</div>
        <ServicePaymentButton 
          amount={servicePrice}
          title={serviceTitle}
          serviceType={serviceType}
          serviceId={serviceId}
          customerInfo={customerInfo}
          disabled={!formIsValid}
        />
      </CardFooter>
    </Card>
  );
};

export default ServiceBookingForm;
