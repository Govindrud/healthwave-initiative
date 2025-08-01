
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Plane, Mountain, Tent, Bike, Trees, Leaf } from "lucide-react";
import { adventures } from "@/data/adventures";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdventureListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState<any>(null);
  const [participants, setParticipants] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const adventureTypes = Array.from(new Set(adventures.map(adv => adv.type)));

  const filteredAdventures = adventures.filter(adventure => {
    const matchesSearch = adventure.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          adventure.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          adventure.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || adventure.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBooking = (adventure: any) => {
    setSelectedAdventure(adventure);
    setIsBookingOpen(true);
  };

  const confirmBooking = () => {
    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success(`Your ${selectedAdventure.title} adventure has been booked for ${participants} participant(s). Check your email for details.`);
    setIsBookingOpen(false);
    setParticipants("1");
    setName("");
    setEmail("");
    setPhone("");
  };

  // Helper function to get the right icon for adventure type
  const getAdventureIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hiking':
        return <Mountain className="h-5 w-5" />;
      case 'camping':
        return <Tent className="h-5 w-5" />;
      case 'cycling':
        return <Bike className="h-5 w-5" />;
      case 'retreat':
        return <Leaf className="h-5 w-5" />;
      case 'forest therapy':
        return <Trees className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Stress-Free Adventures</h1>
        <p className="text-muted-foreground max-w-3xl">
          Reconnect with nature and yourself through our curated adventures designed to reduce stress, 
          boost mental wellbeing, and provide a refreshing break from daily routines.
        </p>
      </div>

      <div className="bg-meant-50 border border-meant-100 rounded-lg p-6 my-8">
        <h2 className="text-xl font-semibold text-meant-800 mb-2">Why Adventure Therapy Works</h2>
        <p className="text-meant-700 mb-4">
          Adventure-based activities have been proven to reduce stress hormones, improve mood, and enhance mental wellbeing through:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="bg-white p-4 rounded-md shadow-sm flex items-start">
            <div className="bg-meant-100 rounded-full p-2 mr-3">
              <Trees className="h-5 w-5 text-meant-700" />
            </div>
            <div>
              <h3 className="font-medium text-meant-800">Nature Connection</h3>
              <p className="text-sm text-meant-600">Spending time in nature lowers cortisol levels and blood pressure</p>
            </div>
          </li>
          <li className="bg-white p-4 rounded-md shadow-sm flex items-start">
            <div className="bg-meant-100 rounded-full p-2 mr-3">
              <Users className="h-5 w-5 text-meant-700" />
            </div>
            <div>
              <h3 className="font-medium text-meant-800">Social Bonding</h3>
              <p className="text-sm text-meant-600">Shared experiences build meaningful connections and support networks</p>
            </div>
          </li>
          <li className="bg-white p-4 rounded-md shadow-sm flex items-start">
            <div className="bg-meant-100 rounded-full p-2 mr-3">
              <Mountain className="h-5 w-5 text-meant-700" />
            </div>
            <div>
              <h3 className="font-medium text-meant-800">Achievement</h3>
              <p className="text-sm text-meant-600">Completing adventures builds confidence and resilience</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="flex-1">
          <Input
            placeholder="Search adventures by name, location or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
            className="flex items-center"
          >
            <Plane className="mr-2 h-4 w-4" />
            All Types
          </Button>
          {adventureTypes.map(type => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="flex items-center"
            >
              {getAdventureIcon(type)}
              <span className="ml-2">{type}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredAdventures.map((adventure) => (
          <Card key={adventure.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="relative">
              <img 
                src={adventure.image} 
                alt={adventure.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-meant-600 flex items-center gap-1">
                  {getAdventureIcon(adventure.type)}
                  {adventure.type}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{adventure.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin size={16} className="mr-2" />
                {adventure.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-grow">
              <p className="text-sm text-muted-foreground">{adventure.description}</p>
              
              <div className="flex items-center text-muted-foreground">
                <Calendar size={16} className="mr-2" />
                <span>{adventure.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-2" />
                <span>{adventure.duration}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users size={16} className="mr-2" />
                <span>Group size: {adventure.groupSize}</span>
              </div>
              
              <div className="mt-4 font-medium text-lg">
                ₹{adventure.price} per person
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="meant" 
                className="w-full" 
                onClick={() => handleBooking(adventure)}
              >
                Book This Adventure
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAdventures.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No adventures found matching your criteria</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Your Adventure</DialogTitle>
            <DialogDescription>
              {selectedAdventure && (
                <div className="mt-2">
                  <div className="font-medium text-lg">{selectedAdventure.title}</div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin size={14} className="mr-1" />
                    {selectedAdventure.location} • {selectedAdventure.date}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Participants</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
            
            {selectedAdventure && (
              <div className="bg-muted p-3 rounded-md mt-4">
                <div className="font-medium">Booking Summary</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>{selectedAdventure.type} Adventure • {selectedAdventure.duration}</div>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span>Price per person:</span>
                      <span>₹{selectedAdventure.price}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-border mt-2 pt-2">
                      <span>Total ({participants} {parseInt(participants) === 1 ? 'person' : 'people'}):</span>
                      <span>₹{selectedAdventure.price * parseInt(participants)}</span>
                    </div>
                  </div>
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

export default AdventureListing;
