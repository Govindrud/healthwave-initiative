
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ServiceDetails from "./booking/ServiceDetails";
import DateTimeSelector from "./booking/DateTimeSelector";
import ParticipantsSelector from "./booking/ParticipantsSelector";

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
      <ServiceDetails 
        title={title}
        price={price}
        duration={duration}
        location={location}
        isGroup={isGroup}
        maxParticipants={maxParticipants}
      />
      
      <div className="border-t pt-4 mb-4">
        <h4 className="font-medium mb-2">Select Date & Time</h4>
        
        <DateTimeSelector
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          availableDates={availableDates}
          availableTimes={availableTimes}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
        />
        
        {isGroup && (
          <ParticipantsSelector
            maxParticipants={maxParticipants}
            participants={participants}
            onParticipantsChange={setParticipants}
          />
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
