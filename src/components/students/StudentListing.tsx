
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, BookOpen, Clock, UserCheck, Calendar, Search, Filter, Info } from "lucide-react";
import { studentPsychologists } from "@/data/students";
import { Badge } from "@/components/ui/badge";
import StudentBookingForm from "./StudentBookingForm";
import { toast } from "sonner";

const StudentListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const filteredStudents = studentPsychologists.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return student.name.toLowerCase().includes(searchLower) || 
           student.university.toLowerCase().includes(searchLower) ||
           student.specialInterests.some(interest => 
             interest.toLowerCase().includes(searchLower)
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
    toast.info(`Booking session with ${student.name}`);
  };

  const handleCancelBooking = () => {
    setIsBookingFormOpen(false);
    setSelectedStudent(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="container mx-auto px-4">
      {!isBookingFormOpen ? (
        <>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, university or interest areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <Button variant="outline" size="sm" className="flex gap-2 items-center">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <div className="bg-meant-50 border border-meant-100 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-meant-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-meant-800 mb-2">Why Choose Student Psychologists?</h2>
                <ul className="list-disc list-inside space-y-2 text-meant-700">
                  <li>Affordable sessions (50-70% lower than standard rates)</li>
                  <li>Fresh perspectives from students trained in the latest therapeutic approaches</li>
                  <li>All sessions supervised by licensed psychologists</li>
                  <li>Flexible scheduling options including evenings and weekends</li>
                  <li>Support students in gaining valuable practical experience</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="service-card hover:shadow-lg transition-shadow bg-white border-border">
                <div className="relative">
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
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
                    className="w-full service-button" 
                    onClick={() => handleBooking(student)}
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Book Consultation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">No student psychologists found matching your search</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search term</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <StudentBookingForm 
            student={selectedStudent}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onCancel={handleCancelBooking}
          />
        </div>
      )}
    </div>
  );
};

export default StudentListing;
