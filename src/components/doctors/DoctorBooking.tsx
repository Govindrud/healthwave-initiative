
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, Video, User } from "lucide-react";

interface DoctorBookingProps {
  doctorId: string;
  doctorName: string;
  specialization: string;
  consultationFee: number;
  availableTimes?: string[];
}

const DoctorBooking = ({
  doctorId,
  doctorName,
  specialization,
  consultationFee,
  availableTimes = ["09:00", "11:00", "14:00", "16:00", "18:00"]
}: DoctorBookingProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  
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
  
  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date for your consultation");
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a time for your consultation");
      return;
    }
    
    setIsBooking(true);
    toast("Booking Initiated", {
      description: `You are booking a consultation with ${doctorName}`
    });
    
    // Format date for display
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Format time for display
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const formattedTime = timeFormatter.format(new Date(`2000-01-01T${selectedTime}`));
    
    // Redirect to booking confirmation page
    setTimeout(() => {
      setIsBooking(false);
      navigate(`/booking-confirmation?doctor_id=${doctorId}&title=${encodeURIComponent(`Consultation with ${doctorName}, ${specialization}`)}&amount=${consultationFee}&duration=45 minutes&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(formattedTime)}&location=Online&type=consultation`);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Book a Consultation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-muted-foreground">
          <Video size={16} className="mr-2" />
          <span>Online Consultation</span>
        </div>
        
        <div className="flex items-center text-muted-foreground">
          <Clock size={16} className="mr-2" />
          <span>45 minutes</span>
        </div>
        
        <div className="flex items-center text-muted-foreground">
          <User size={16} className="mr-2" />
          <span>{doctorName}, {specialization}</span>
        </div>
        
        <div className="font-medium text-meant-700">
          ₹{consultationFee} / session
        </div>
      </div>
      
      <div className="border-t pt-4 mb-4">
        <h4 className="font-medium mb-2">Select Date & Time</h4>
        
        <div className="mb-3">
          <label className="block text-sm text-muted-foreground mb-1">Date</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Select a date</option>
            {availableDates.map(date => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label className="block text-sm text-muted-foreground mb-1">Time</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDate}
          >
            <option value="">Select a time</option>
            {selectedDate && availableTimes.map(time => (
              <option key={time} value={time}>
                {new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Button 
        className="w-full bg-meant-600 hover:bg-meant-700"
        onClick={handleBookNow}
        disabled={isBooking}
      >
        {isBooking ? "Processing..." : "Book Consultation"}
      </Button>
    </div>
  );
};

export default DoctorBooking;
