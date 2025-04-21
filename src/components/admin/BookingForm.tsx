
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSheetDB } from "@/hooks/useSheetDB";
import { toast } from "sonner";

interface BookingFormProps {
  onBookingAdded?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBookingAdded }) => {
  const { createRecord, loading } = useSheetDB();
  
  const [booking, setBooking] = useState({
    CustomerID: "",
    Service: "",
    BookingDate: "",
    Status: "New",
    Notes: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setBooking(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createRecord(booking, { sheet: 'Bookings' });
      
      if (result.created) {
        toast.success("Booking created successfully!");
        setBooking({
          CustomerID: "",
          Service: "",
          BookingDate: "",
          Status: "New",
          Notes: "",
        });
        if (onBookingAdded) {
          onBookingAdded();
        }
      } else {
        toast.error("Failed to create booking");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="booking-form">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="CustomerID">Customer ID</Label>
              <Input
                id="CustomerID"
                name="CustomerID"
                value={booking.CustomerID}
                onChange={handleChange}
                placeholder="Enter customer ID or leave blank for new customer"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Service">Service</Label>
              <Input
                id="Service"
                name="Service"
                value={booking.Service}
                onChange={handleChange}
                placeholder="Enter service name"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="BookingDate">Booking Date</Label>
              <Input
                id="BookingDate"
                name="BookingDate"
                type="date"
                value={booking.BookingDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Status">Status</Label>
              <Select 
                value={booking.Status}
                onValueChange={(value) => handleSelectChange("Status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Notes">Notes</Label>
              <Textarea
                id="Notes"
                name="Notes"
                value={booking.Notes}
                onChange={handleChange}
                placeholder="Any additional notes"
                rows={3}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="submit"
          form="booking-form"
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Saving..." : "Save Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
