
import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ServicePaymentButton from "../services/ServicePaymentButton";
import { StudentPsychologist } from "@/data/students";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <Card className="w-full border-meant-100 shadow-md overflow-hidden">
      <CardHeader className="bg-meant-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src={student.image} />
              <AvatarFallback className="bg-meant-700 text-white">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white">Book Session with {student.name}</CardTitle>
              <p className="text-white/80 text-sm">{student.university}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="bg-meant-50 p-4 rounded-lg flex gap-4 items-center border border-meant-100">
          <CalendarIcon className="h-5 w-5 text-meant-600" />
          <div>
            <div className="font-medium">Appointment Details</div>
            <div className="text-sm">{selectedDate} at {selectedTime}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage 
                src={student.image}
                alt={student.name}
                className="object-cover"
              />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-lg">{student.name}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin size={14} className="mr-1" /> {student.location}
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock size={14} className="mr-1" /> {student.availability}
              </div>
            </div>
          </div>
          <div className="text-xl font-bold text-meant-800">₹{student.sessionFee}</div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Your Information</h3>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              className="bg-white"
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
              className="bg-white"
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
              className="bg-white"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start border-t border-gray-100 pt-4">
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <ServicePaymentButton 
            amount={student.sessionFee}
            title={sessionTitle}
            serviceType="student_psychologist"
            serviceId={student.id.toString()}
            customerInfo={customerInfo}
            disabled={!formIsValid}
            className="flex-1"
            buttonText="Pay & Confirm"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentBookingForm;
