
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { formatDate } from '@/utils/date-utils';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface ServiceBookingFormProps {
  serviceId: string;
  title: string;
  price: number;
  duration?: string;
  provider?: string;
  location?: string;
  type?: string;
}

export const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({
  serviceId,
  title,
  price,
  duration = "60 minutes",
  provider = "",
  location = "Online",
  type = "service"
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [participants, setParticipants] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBooking = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    if (!time) {
      toast.error("Please select a time");
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirect to booking confirmation page with all necessary parameters
      navigate(`/booking-confirmation?${new URLSearchParams({
        title: title,
        amount: price.toString(),
        participants: participants.toString(),
        duration: duration,
        date: formatDate(date),
        time: time,
        location: location,
        provider: provider,
        type: type,
        service_id: serviceId,
        name: user?.displayName || "",
        email: user?.email || ""
      }).toString()}`);
    }, 1000);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-meant-600 font-medium text-xl mt-1">₹{price}</p>
            <div className="flex items-center text-sm mt-2 text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formatDate(date) : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Select Time</Label>
              <Select onValueChange={setTime} value={time}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number of Participants</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setParticipants(Math.max(1, participants - 1))}
                  disabled={participants <= 1}
                >
                  -
                </Button>
                <div className="flex items-center mx-2 min-w-[60px] justify-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{participants}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setParticipants(participants + 1)}
                  disabled={participants >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Price per person</span>
                <span>₹{price}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{price * participants}</span>
              </div>
            </div>

            <Button
              className="w-full bg-meant-600 hover:bg-meant-700"
              onClick={handleBooking}
              disabled={isLoading || !date || !time}
            >
              {isLoading ? "Processing..." : "Book Now"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceBookingForm;
