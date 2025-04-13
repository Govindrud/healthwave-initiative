
import React, { useState, useEffect } from "react";
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
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Phone, 
  MapPin, 
  Calendar, 
  Search, 
  Star, 
  Filter, 
  Clock 
} from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  rating: number;
  bio: string;
  imageUrl: string;
  price: number;
  isOnline: boolean;
  availableSlots: {
    time: string;
    date: string;
  }[];
  appointmentTypes: ('video' | 'call' | 'clinic')[];
}

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Psychiatrist, MD",
    specialization: "psychiatrist",
    experience: 15,
    rating: 4.8,
    bio: "Specializes in anxiety disorders, depression, and ADHD treatment with a compassionate, patient-centered approach.",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 1500,
    isOnline: true,
    availableSlots: [
      { time: "10:00 AM", date: "Today" },
      { time: "02:30 PM", date: "Today" },
      { time: "05:15 PM", date: "Today" },
    ],
    appointmentTypes: ["video", "call", "clinic"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Clinical Psychologist, PhD",
    specialization: "psychologist",
    experience: 8,
    rating: 4.9,
    bio: "Expert in cognitive behavioral therapy for stress, anxiety management, and trauma recovery.",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 1300,
    isOnline: false,
    availableSlots: [
      { time: "09:15 AM", date: "Tomorrow" },
      { time: "12:45 PM", date: "Tomorrow" },
      { time: "06:30 PM", date: "Tomorrow" },
    ],
    appointmentTypes: ["video", "call"]
  },
  {
    id: 3,
    name: "Dr. Amelia Rodriguez",
    title: "Family Therapist, LMFT",
    specialization: "therapist",
    experience: 12,
    rating: 4.2,
    bio: "Specializes in family dynamics, relationship counseling, and conflict resolution with a holistic approach.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 1400,
    isOnline: true,
    availableSlots: [
      { time: "11:30 AM", date: "Today" },
      { time: "03:45 PM", date: "Tomorrow" },
      { time: "07:00 PM", date: "Tomorrow" },
    ],
    appointmentTypes: ["video", "clinic"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Mental Health Counselor, LPC",
    specialization: "counselor",
    experience: 5,
    rating: 4.0,
    bio: "Focused on youth mental health, self-esteem issues, and academic stress management.",
    imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 1000,
    isOnline: false,
    availableSlots: [
      { time: "08:30 AM", date: "Tomorrow" },
      { time: "01:00 PM", date: "Tomorrow" },
      { time: "04:30 PM", date: "Tomorrow" },
    ],
    appointmentTypes: ["call", "clinic"]
  }
];

const DoctorListing: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [filters, setFilters] = useState({
    specialization: "",
    experience: "",
    search: "",
    onlineOnly: false
  });
  const [selectedSlots, setSelectedSlots] = useState<Record<number, string>>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Apply filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialization = !filters.specialization || doctor.specialization === filters.specialization;
    
    let matchesExperience = true;
    if (filters.experience === "0-5") {
      matchesExperience = doctor.experience >= 0 && doctor.experience <= 5;
    } else if (filters.experience === "5-10") {
      matchesExperience = doctor.experience > 5 && doctor.experience <= 10;
    } else if (filters.experience === "10+") {
      matchesExperience = doctor.experience > 10;
    }
    
    const matchesSearch = !filters.search || 
      doctor.name.toLowerCase().includes(filters.search.toLowerCase()) || 
      doctor.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(filters.search.toLowerCase());
      
    const matchesOnlineStatus = !filters.onlineOnly || doctor.isOnline;
    
    return matchesSpecialization && matchesExperience && matchesSearch && matchesOnlineStatus;
  });

  const handleSlotSelect = (doctorId: number, slotInfo: string) => {
    setSelectedSlots({
      ...selectedSlots,
      [doctorId]: slotInfo
    });
  };

  const handleBookAppointment = (doctor: Doctor) => {
    if (!selectedSlots[doctor.id]) {
      toast.error("Please select a time slot first");
      return;
    }
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in your contact information");
      return;
    }
    
    // Show payment options
    showPaymentOptions({
      orderId: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      productName: `Consultation with ${doctor.name}`,
      amount: doctor.price,
      customerInfo,
      dateTime: selectedSlots[doctor.id]
    });
  };
  
  const showPaymentOptions = (data: any) => {
    toast.success("Redirecting to payment options...", {
      duration: 2000,
      onDismiss: () => {
        // In a real app, this would open the payment modal
        setTimeout(() => {
          toast.message("Payment successful!", {
            description: `Your appointment with has been booked for ${data.dateTime}`,
          });
        }, 1000);
      }
    });
  };

  const formatRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {halfStar && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 fill-half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Find a Doctor</h1>
          <p className="text-muted-foreground mt-1">Connect with mental health professionals</p>
        </div>
        
        {/* Filter toggle for mobile */}
        <Button variant="outline" className="mt-4 md:hidden w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filter Options
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="hidden md:block bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium block mb-2">Specialization</label>
              <Select 
                onValueChange={(value) => setFilters({...filters, specialization: value})}
                value={filters.specialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                  <SelectItem value="psychologist">Psychologist</SelectItem>
                  <SelectItem value="therapist">Therapist</SelectItem>
                  <SelectItem value="counselor">Counselor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Experience</label>
              <Select
                onValueChange={(value) => setFilters({...filters, experience: value})}
                value={filters.experience}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Experience Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  <SelectItem value="0-5">0-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="onlineOnly"
                checked={filters.onlineOnly}
                onChange={(e) => setFilters({...filters, onlineOnly: e.target.checked})}
                className="rounded text-primary"
              />
              <label htmlFor="onlineOnly" className="text-sm">Online Now</label>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search doctors..." 
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor listings */}
        <div className="col-span-1 md:col-span-3">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={doctor.imageUrl} 
                      alt={doctor.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={doctor.isOnline ? "default" : "secondary"} className={doctor.isOnline ? "bg-green-500 hover:bg-green-600" : ""}>
                        <span className={`status-indicator ${doctor.isOnline ? 'status-online' : 'status-offline'} mr-1.5`}></span>
                        {doctor.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.title}</CardDescription>
                      </div>
                      {formatRating(doctor.rating)}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctor.appointmentTypes.map(type => (
                        <span key={type} className={`appointment-type appointment-type-${type}`}>
                          {type === 'video' && <Video className="h-3.5 w-3.5 mr-1" />}
                          {type === 'call' && <Phone className="h-3.5 w-3.5 mr-1" />}
                          {type === 'clinic' && <MapPin className="h-3.5 w-3.5 mr-1" />}
                          {type === 'video' && 'Video'}
                          {type === 'call' && 'Phone'}
                          {type === 'clinic' && 'In Clinic'}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{doctor.bio}</p>
                    
                    <div>
                      <h4 className="text-sm font-medium flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        Available Slots
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availableSlots.map((slot, i) => (
                          <Button 
                            key={`${slot.date}-${slot.time}`}
                            variant={selectedSlots[doctor.id] === `${slot.date} at ${slot.time}` ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSlotSelect(doctor.id, `${slot.date} at ${slot.time}`)}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <details>
                        <summary className="cursor-pointer text-sm text-primary font-medium">
                          {customerInfo.name ? 'Edit contact information' : 'Add contact information'}
                        </summary>
                        <div className="mt-3 space-y-2 bg-muted/50 p-3 rounded-md">
                          <Input 
                            placeholder="Your Name" 
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          />
                          <Input 
                            placeholder="Your Email" 
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          />
                          <Input 
                            placeholder="Your Phone" 
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          />
                        </div>
                      </details>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Consultation Fee</p>
                      <p className="font-semibold">₹{doctor.price}</p>
                    </div>
                    <Button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="bg-meant-700 hover:bg-meant-800"
                    >
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p>No doctors match your filter criteria. Please adjust your filters.</p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({specialization: "", experience: "", search: "", onlineOnly: false})}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;

