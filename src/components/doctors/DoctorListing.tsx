
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Award, Clock } from "lucide-react";
import DoctorBooking from "./DoctorBooking";

// Sample doctor data
const doctors = [
  {
    id: "d1",
    name: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300",
    specialization: "Psychiatrist",
    qualification: "MD (Psychiatry)",
    experience: 15,
    languages: ["English", "Hindi"],
    rating: 4.8,
    reviews: 124,
    consultationFee: 1500,
    about: "Dr. Sarah specializes in anxiety disorders, depression, and ADHD treatment with a compassionate, patient-centered approach."
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300",
    specialization: "Psychologist",
    qualification: "PhD (Psychology)",
    experience: 8,
    languages: ["English", "Mandarin"],
    rating: 4.9,
    reviews: 86,
    consultationFee: 1300,
    about: "Clinical psychologist specializing in cognitive behavioral therapy for stress, anxiety management, and trauma recovery."
  },
  {
    id: "d3",
    name: "Dr. Amelia Rodriguez",
    image: "https://images.unsplash.com/photo-1622253694226-0b16a93dbbca?auto=format&fit=crop&w=300&h=300",
    specialization: "Therapist",
    qualification: "LMFT",
    experience: 12,
    languages: ["English", "Spanish"],
    rating: 4.7,
    reviews: 92,
    consultationFee: 1200,
    about: "Specializes in family dynamics, relationship counseling, and conflict resolution with a holistic approach."
  }
];

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search term
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.about.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by specialization
    const matchesSpecialization = selectedSpecialization ? 
      doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase() : true;
    
    // Filter by language
    const matchesLanguage = selectedLanguage ?
      doctor.languages.some(lang => lang.toLowerCase() === selectedLanguage.toLowerCase()) : true;
    
    return matchesSearch && matchesSpecialization && matchesLanguage;
  });
  
  // Get all unique specializations and languages
  const specializations = Array.from(new Set(doctors.map(doc => doc.specialization)));
  const languages = Array.from(new Set(doctors.flatMap(doc => doc.languages)));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Mental Health Professionals</h1>
        <p className="text-muted-foreground">
          Connect with our expert mental health professionals for personalized care and support.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="md:flex-1"
        />
        
        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Specializations</SelectItem>
            {specializations.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Languages</SelectItem>
            {languages.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Doctor Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor List Column */}
        <div className="lg:col-span-2">
          {filteredDoctors.length === 0 ? (
            <div className="bg-muted p-8 text-center rounded-lg">
              <h3 className="text-xl font-medium mb-2">No doctors found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDoctors.map(doctor => (
                <Card 
                  key={doctor.id} 
                  className={`hover:shadow-md transition-shadow cursor-pointer ${
                    selectedDoctorId === doctor.id ? 'border-2 border-meant-500' : ''
                  }`}
                  onClick={() => setSelectedDoctorId(doctor.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 p-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full aspect-square object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/300x300?text=Doctor";
                        }}
                      />
                    </div>
                    <div className="w-full md:w-3/4 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{doctor.name}</h3>
                          <p className="text-muted-foreground">{doctor.specialization} • {doctor.qualification}</p>
                        </div>
                        <div className="flex items-center bg-meant-50 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-muted-foreground text-xs ml-1">({doctor.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 my-3">
                        <div className="flex items-center text-muted-foreground">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{doctor.experience} years exp</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>45 min session</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Online</span>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4">{doctor.about}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.languages.map(lang => (
                          <span key={lang} className="bg-meant-100 text-meant-700 text-xs px-2 py-1 rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">₹{doctor.consultationFee} consultation fee</div>
                        <Button 
                          className="bg-meant-600 hover:bg-meant-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDoctorId(doctor.id);
                          }}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Booking Widget Column */}
        <div className="lg:col-span-1">
          {selectedDoctorId ? (
            <div className="sticky top-4">
              {filteredDoctors
                .filter(doc => doc.id === selectedDoctorId)
                .map(doctor => (
                  <DoctorBooking 
                    key={doctor.id}
                    doctorId={doctor.id}
                    doctorName={doctor.name}
                    specialization={doctor.specialization}
                    consultationFee={doctor.consultationFee}
                  />
                ))
              }
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Book a Consultation</CardTitle>
                <CardDescription>
                  Select a doctor from the list to book a consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground mb-3">
                  <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                  <span>All our doctors are verified professionals</span>
                </div>
                <div className="flex items-center text-muted-foreground mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Same-day appointments often available</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Online consultations for your convenience</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
