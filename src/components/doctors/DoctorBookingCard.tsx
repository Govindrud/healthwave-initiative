
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, IndianRupee } from "lucide-react";
import { usePayment } from "@/hooks/use-payment";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface DoctorBookingCardProps {
  doctorId: string;
  name: string;
  specialization: string;
  price: number;
  availableTimes?: string[];
}

const DoctorBookingCard = ({
  doctorId,
  name,
  specialization,
  price,
  availableTimes = ["09:00", "11:30", "14:00", "16:30", "18:00"]
}: DoctorBookingCardProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  
  // Generate available dates (next 7 days)
  const generateAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };
  
  const availableDates = generateAvailableDates();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Set up payment hook
  const { isLoading, handlePayment } = usePayment({
    amount: price,
    title: `Consultation with ${name}`,
    bookingDetails: {
      date: selectedDate ? formatDate(selectedDate) : undefined,
      time: selectedTime,
      type: "consultation",
      doctorId: doctorId,
      duration: "30 minutes"
    },
    customerInfo: {
      name: user?.displayName || customerInfo.name,
      email: user?.email || customerInfo.email,
      phone: customerInfo.phone
    }
  });
  
  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a date for your appointment");
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a time for your appointment");
      return;
    }
    
    if (!user && !showForm) {
      setShowForm(true);
      return;
    }
    
    if (!user && showForm) {
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        toast.error("Please fill in your contact information");
        return;
      }
    }
    
    handlePayment();
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-meant-600">{specialization}</p>
        <div className="flex items-center mt-1">
          <IndianRupee className="h-4 w-4 text-meant-700 mr-1" />
          <span className="font-semibold text-meant-700">{price}</span>
          <span className="text-sm text-muted-foreground ml-1">per session</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-muted-foreground">
          <Calendar className="inline-block h-4 w-4 mr-1" /> Select Date
        </label>
        <select 
          className="w-full p-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">-- Select Date --</option>
          {availableDates.map(date => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-muted-foreground">
          <Clock className="inline-block h-4 w-4 mr-1" /> Select Time
        </label>
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map(time => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`p-2 border rounded text-sm ${
                selectedTime === time 
                  ? "bg-meant-100 border-meant-500 text-meant-700" 
                  : "hover:bg-meant-50"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {!user && showForm && (
        <div className="mb-4 p-3 border rounded-md border-meant-200 bg-meant-50">
          <p className="text-sm font-medium mb-2">Your information</p>
          <div className="space-y-2">
            <input 
              type="text"
              className="w-full p-2 text-sm border rounded-md"
              placeholder="Your name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            />
            <input 
              type="email"
              className="w-full p-2 text-sm border rounded-md"
              placeholder="Your email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            />
            <input 
              type="tel"
              className="w-full p-2 text-sm border rounded-md"
              placeholder="Your phone number"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            />
          </div>
        </div>
      )}
      
      <Button 
        className="w-full bg-meant-600 hover:bg-meant-700 font-medium"
        disabled={isLoading}
        onClick={handleBooking}
      >
        {isLoading ? "Processing..." : "Book Appointment"}
      </Button>
    </div>
  );
};

export default DoctorBookingCard;
