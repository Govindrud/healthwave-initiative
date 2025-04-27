
import React, { useState } from "react";
import DoctorBookingCard from "./DoctorBookingCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample data for doctors
const doctorsData = [
  {
    id: "doc1",
    name: "Dr. Sarah Johnson",
    specialization: "Psychiatrist, MD",
    experience: 15,
    expertise: ["anxiety", "depression", "ADHD"],
    rating: 4.8,
    price: 1500,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Specializes in anxiety disorders, depression, and ADHD treatment with a compassionate, patient-centered approach."
  },
  {
    id: "doc2",
    name: "Dr. Michael Chen",
    specialization: "Clinical Psychologist, PhD",
    experience: 8,
    expertise: ["stress", "therapy", "trauma"],
    rating: 4.9,
    price: 1300,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Expert in cognitive behavioral therapy for stress, anxiety management, and trauma recovery."
  },
  {
    id: "doc3",
    name: "Dr. Amelia Rodriguez",
    specialization: "Family Therapist, LMFT",
    experience: 12,
    expertise: ["family", "relationships", "counseling"],
    rating: 4.2,
    price: 1400,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", 
    bio: "Specializes in family dynamics, relationship counseling, and conflict resolution with a holistic approach."
  },
  {
    id: "doc4",
    name: "Dr. James Wilson",
    specialization: "Mental Health Counselor, LPC",
    experience: 5,
    expertise: ["youth", "self-esteem", "academic"],
    rating: 4.0,
    price: 1000,
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Focused on youth mental health, self-esteem issues, and academic stress management."
  }
];

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialization = 
      !specialization || 
      doctor.specialization.toLowerCase().includes(specialization.toLowerCase());
      
    let matchesExperience = true;
    if (experience) {
      if (experience === "0-5") {
        matchesExperience = doctor.experience >= 0 && doctor.experience <= 5;
      } else if (experience === "5-10") {
        matchesExperience = doctor.experience > 5 && doctor.experience <= 10;
      } else if (experience === "10+") {
        matchesExperience = doctor.experience > 10;
      }
    }
    
    return matchesSearch && matchesSpecialization && matchesExperience;
  });
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by name or keyword..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="p-2 border rounded-md"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          <option value="psychiatrist">Psychiatrist</option>
          <option value="psychologist">Psychologist</option>
          <option value="therapist">Therapist</option>
          <option value="counselor">Counselor</option>
        </select>
        
        <select 
          className="p-2 border rounded-md"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">All Experience Levels</option>
          <option value="0-5">0-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>
      
      {/* Results */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="flex flex-col h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-1 mb-4">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-meant-600">{doctor.specialization}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{doctor.experience} years</span>
                  </div>
                  <p className="text-sm mt-2 text-gray-600 line-clamp-2">{doctor.bio}</p>
                </div>
              </div>
              <DoctorBookingCard
                doctorId={doctor.id}
                name={doctor.name}
                specialization={doctor.specialization}
                price={doctor.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg font-medium text-muted-foreground">No doctors found matching your criteria</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default DoctorListing;
