
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Stethoscope, Star, UserCheck, Calendar as CalendarIcon } from "lucide-react";
import { doctors } from "@/data/doctors";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

  const handleBooking = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time for your appointment");
      return;
    }
    
    toast.success(`Appointment booked with Dr. ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
    setIsBookingOpen(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Consult with Mental Health Experts</h1>
        <p className="text-muted-foreground max-w-3xl">
          Our team of licensed psychiatrists, psychologists, and therapists are here to provide expert care and support for your mental health journey.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="flex-1">
          <Input
            placeholder="Search by doctor name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-meant-600">{doctor.specialty}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Dr. {doctor.name}</span>
                <div className="flex items-center text-amber-500">
                  <Star size={16} className="fill-amber-500" />
                  <span className="ml-1 text-sm">{doctor.rating}</span>
                </div>
              </CardTitle>
              <CardDescription>{doctor.qualifications}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Stethoscope size={16} className="mr-2" />
                <span>{doctor.experience} years experience</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin size={16} className="mr-2" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-2" />
                <span>{doctor.availability}</span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <UserCheck size={16} className="mr-2" />
                <span>{doctor.patientsHelped}+ patients helped</span>
              </div>
              <div className="font-medium text-lg mt-3">₹{doctor.consultationFee} per session</div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="meant" 
                className="w-full" 
                onClick={() => handleBooking(doctor)}
              >
                <Calendar className="mr-2 h-4 w-4" /> Book Consultation
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No doctors found matching your search criteria</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              {selectedDoctor && (
                <div className="flex items-center mt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium">Dr. {selectedDoctor.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedDoctor.specialty}</div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <div className="grid grid-cols-4 gap-2">
                {["Today", "Tomorrow", new Date(Date.now() + 2*24*60*60*1000).toLocaleDateString(), new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString()].map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    className="flex flex-col items-center py-3 h-auto"
                    onClick={() => setSelectedDate(date)}
                  >
                    <CalendarIcon size={16} className="mb-1" />
                    <span className="text-xs">{date}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"].map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="text-xs py-2"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedDoctor && (
              <div className="bg-muted p-3 rounded-md mt-4">
                <div className="font-medium">Appointment Details</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>Fee: ₹{selectedDoctor.consultationFee}</div>
                  <div>Duration: 45 minutes</div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
            <Button onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorListing;
