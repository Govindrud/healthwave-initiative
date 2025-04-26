
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";

interface DateTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  availableDates: string[];
  availableTimes: string[];
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const DateTimeSelector = ({
  selectedDate,
  selectedTime,
  availableDates,
  availableTimes,
  onDateChange,
  onTimeChange
}: DateTimeSelectorProps) => {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onDateChange(format(newDate, "yyyy-MM-dd"));
    }
  };

  const formatTimeDisplay = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Convert availableDates strings to Date objects for disabled dates logic
  const availableDateObjects = availableDates.map(d => new Date(d));

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label className="text-sm text-muted-foreground">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(date) => {
                // Disable dates not in availableDates
                return !availableDateObjects.some(
                  availableDate =>
                    availableDate.toISOString().split('T')[0] === 
                    date.toISOString().split('T')[0]
                );
              }}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col space-y-2">
        <Label className="text-sm text-muted-foreground">Time</Label>
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              className={cn(
                "flex items-center justify-center py-2",
                selectedTime === time && "bg-meant-600 text-white hover:bg-meant-700",
                !selectedDate && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => selectedDate && onTimeChange(time)}
              disabled={!selectedDate}
            >
              <Clock className="mr-2 h-4 w-4" />
              {formatTimeDisplay(time)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
