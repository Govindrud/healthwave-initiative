
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface SpiritualServiceBookingProps {
  serviceId: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  maxParticipants?: number;
  isGroup?: boolean;
}

const SpiritualServiceBooking = ({
  serviceId,
  title,
  price,
  duration,
  location,
  maxParticipants = 5,
  isGroup = false
}: SpiritualServiceBookingProps) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(1);
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
  
  // Example available times
  const availableTimes = ["09:00", "11:00", "14:00", "16:00", "18:00"];
  
  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date for your booking");
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a time for your booking");
      return;
    }
    
    setIsBooking(true);
    toast("Booking Initiated", {
      description: `You are booking a session for ${title}`
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
    
    // Redirect to booking confirmation page with all necessary details
    setTimeout(() => {
      setIsBooking(false);
      navigate(`/booking-confirmation?service_id=${serviceId}&title=${encodeURIComponent(title)}&amount=${price}&participants=${participants}&duration=${encodeURIComponent(duration)}&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(formattedTime)}&location=${encodeURIComponent(location)}&type=spiritual`);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-muted-foreground">
          <Clock size={16} className="mr-2" />
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground">
          <MapPin size={16} className="mr-2" />
          <span>{location}</span>
        </div>
        
        {isGroup && maxParticipants && (
          <div className="flex items-center text-muted-foreground">
            <Users size={16} className="mr-2" />
            <span>Group (max {maxParticipants})</span>
          </div>
        )}
        
        <div className="font-medium text-meant-700">
          ₹{price} / session
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
        
        {isGroup && (
          <div className="mb-3">
            <label className="block text-sm text-muted-foreground mb-1">Number of Participants</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
            >
              {[...Array(maxParticipants)].map((_, i) => (
                <option key={i+1} value={i+1}>
                  {i+1} {i === 0 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <Button 
        className="w-full bg-meant-600 hover:bg-meant-700"
        onClick={handleBookNow}
        disabled={isBooking}
      >
        {isBooking ? "Processing..." : "Book Now"}
      </Button>
    </div>
  );
};

export default SpiritualServiceBooking;
