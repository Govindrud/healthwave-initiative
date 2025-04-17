
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, BookOpen, Clock, UserCheck, Calendar } from "lucide-react";
import { studentPsychologists } from "@/data/students";
import { Badge } from "@/components/ui/badge";
import StudentBookingForm from "./StudentBookingForm";

const StudentListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const filteredStudents = studentPsychologists.filter(student => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student.specialInterests.some(interest => 
             interest.toLowerCase().includes(searchTerm.toLowerCase())
           );
  });

  const handleBooking = (student: any) => {
    setSelectedStudent(student);
    // Get current date in a readable format
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setSelectedDate(today);
    setSelectedTime("10:00 AM"); // Default time
    setIsBookingFormOpen(true);
  };

  const handleCancelBooking = () => {
    setIsBookingFormOpen(false);
    setSelectedStudent(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-12 bg-white">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Student Psychologists Program</h1>
          <p className="text-muted-foreground max-w-3xl">
            Our internship program connects you with psychology students who provide quality support at reduced rates. 
            They're supervised by licensed professionals, making mental health care more accessible while giving students valuable experience.
          </p>
        </div>

        <div className="bg-meant-50 border border-meant-100 rounded-lg p-6 my-8">
          <h2 className="text-xl font-semibold text-meant-800 mb-2">Why Choose Student Psychologists?</h2>
          <ul className="list-disc list-inside space-y-2 text-meant-700">
            <li>Affordable sessions (50-70% lower than standard rates)</li>
            <li>Fresh perspectives from students trained in the latest therapeutic approaches</li>
            <li>All sessions supervised by licensed psychologists</li>
            <li>Flexible scheduling options including evenings and weekends</li>
            <li>Support students in gaining valuable practical experience</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-8">
          <div className="flex-1">
            <Input
              placeholder="Search by name, university or interest areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white"
            />
          </div>
        </div>

        {isBookingFormOpen && selectedStudent ? (
          <div className="max-w-2xl mx-auto">
            <StudentBookingForm 
              student={selectedStudent}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onCancel={handleCancelBooking}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white border-border">
                <div className="relative">
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-meant-500">Student Psychologist</Badge>
                  </div>
                </div>
                <CardHeader className="bg-white">
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <BookOpen size={16} className="mr-2" />
                    {student.university} - {student.yearOfStudy}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 bg-white">
                  <div>
                    <h4 className="font-medium mb-1">Special Interests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {student.specialInterests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="bg-meant-50">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin size={16} className="mr-2" />
                    <span>{student.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock size={16} className="mr-2" />
                    <span>{student.availability}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <UserCheck size={16} className="mr-2" />
                    <span>Supervised by Dr. {student.supervisor}</span>
                  </div>
                  <div className="font-medium text-lg mt-3 text-meant-700">₹{student.sessionFee} per session</div>
                </CardContent>
                <CardFooter className="bg-white">
                  <Button 
                    variant="meant" 
                    className="w-full bg-meant-600 hover:bg-meant-700" 
                    onClick={() => handleBooking(student)}
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Book Consultation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filteredStudents.length === 0 && !isBookingFormOpen && (
          <div className="text-center py-12 bg-white">
            <h3 className="text-xl font-medium">No student psychologists found matching your search</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentListing;
