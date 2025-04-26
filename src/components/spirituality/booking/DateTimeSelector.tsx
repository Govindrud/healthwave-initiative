
import { useState } from "react";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <Label className="block text-sm text-muted-foreground mb-1">Date</Label>
        <select 
          className="w-full p-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
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
        <Label className="block text-sm text-muted-foreground mb-1">Time</Label>
        <select 
          className="w-full p-2 border rounded-md"
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
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
  );
};

export default DateTimeSelector;
