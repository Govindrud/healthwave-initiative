
import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ServicePaymentButton from "../services/ServicePaymentButton";
import { StudentPsychologist } from "@/data/students";

interface StudentBookingFormProps {
  student: StudentPsychologist;
  selectedDate: string;
  selectedTime: string;
  onCancel: () => void;
}

const StudentBookingForm: React.FC<StudentBookingFormProps> = ({
  student,
  selectedDate,
  selectedTime,
  onCancel
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
  const sessionTitle = `Consultation with ${student.name}`;

  return (
    <Card className="w-full border-meant-100 bg-white">
      <CardHeader className="bg-gradient-to-r from-meant-50 to-white">
        <CardTitle className="text-meant-800">Book Student Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={student.image} 
              alt={student.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <div className="font-medium text-lg">{student.name}</div>
            <div className="text-sm text-muted-foreground">{student.university}</div>
            <div className="text-sm text-muted-foreground">{student.specialInterests.join(", ")}</div>
          </div>
        </div>

        <div className="bg-meant-50 p-4 rounded-lg mb-4 flex gap-4 items-center">
          <CalendarIcon className="h-5 w-5 text-meant-600" />
          <div>
            <div className="font-medium">Appointment</div>
            <div className="text-sm">{selectedDate} at {selectedTime}</div>
          </div>
        </div>
        
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
      <CardFooter className="flex-col items-start border-t border-gray-100 pt-4">
        <div className="text-xl font-bold text-meant-800 mb-4">₹{student.sessionFee}</div>
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <ServicePaymentButton 
            amount={student.sessionFee}
            title={sessionTitle}
            serviceType="student_psychologist"
            serviceId={student.id.toString()}
            customerInfo={customerInfo}
            disabled={!formIsValid}
            className="flex-1"
            buttonText="Pay Now"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentBookingForm;
