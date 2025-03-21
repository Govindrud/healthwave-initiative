
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
import { Calendar, Video, Clock, Users, Mail, CalendarClock } from "lucide-react";
import { webinars } from "@/data/webinars";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const WebinarListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const today = new Date();
  
  const upcomingWebinars = webinars.filter(webinar => {
    const webinarDate = new Date(webinar.date);
    return webinarDate >= today;
  });
  
  const pastWebinars = webinars.filter(webinar => {
    const webinarDate = new Date(webinar.date);
    return webinarDate < today;
  });
  
  const filteredUpcomingWebinars = upcomingWebinars.filter(webinar => {
    return webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           webinar.presenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
           webinar.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  const filteredPastWebinars = pastWebinars.filter(webinar => {
    return webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           webinar.presenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
           webinar.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleRegistration = (webinar: any) => {
    setSelectedWebinar(webinar);
    setIsRegistrationOpen(true);
  };

  const confirmRegistration = () => {
    if (!email || !name) {
      toast.error("Please enter your name and email to register");
      return;
    }
    
    toast.success(`Successfully registered for "${selectedWebinar.title}" webinar. Check your email for details.`);
    setIsRegistrationOpen(false);
    setEmail("");
    setName("");
  };

  const notifyMe = (webinar: any) => {
    toast.success(`We'll notify you when "${webinar.title}" recording is available`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Mental Health Webinars</h1>
        <p className="text-muted-foreground max-w-3xl">
          Join our live webinars conducted by mental health experts to learn coping strategies,
          self-care techniques, and gain insights into various mental health topics.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="flex-1">
          <Input
            placeholder="Search webinars by title, presenter, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Webinars</h2>
        
        {filteredUpcomingWebinars.length === 0 ? (
          <div className="text-center py-8 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">No upcoming webinars found</h3>
            <p className="text-muted-foreground mt-2">Check back soon or browse our past webinar recordings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcomingWebinars.map((webinar) => (
              <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={webinar.image} 
                    alt={webinar.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-meant-600">Upcoming</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                  <CardDescription>Presented by {webinar.presenter}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock size={16} className="mr-2" />
                    <span>{webinar.time} • {webinar.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users size={16} className="mr-2" />
                    <span>{webinar.attendees}+ registered</span>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-medium mb-1">Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {webinar.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-meant-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="meant" 
                    className="w-full" 
                    onClick={() => handleRegistration(webinar)}
                  >
                    <Video className="mr-2 h-4 w-4" /> Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Webinars */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Past Webinars</h2>
        
        {filteredPastWebinars.length === 0 ? (
          <div className="text-center py-8 bg-muted rounded-lg">
            <h3 className="text-xl font-medium">No past webinars found</h3>
            <p className="text-muted-foreground mt-2">Check out our upcoming webinars above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPastWebinars.map((webinar) => (
              <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-shadow opacity-90">
                <div className="relative">
                  <img 
                    src={webinar.image} 
                    alt={webinar.title} 
                    className="w-full h-48 object-cover grayscale-[30%]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-background/80">Past Event</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                  <CardDescription>Presented by {webinar.presenter}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-medium mb-1">Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {webinar.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {webinar.recordingAvailable ? (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                    >
                      <Video className="mr-2 h-4 w-4" /> Watch Recording
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => notifyMe(webinar)}
                    >
                      <Mail className="mr-2 h-4 w-4" /> Notify When Available
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register for Webinar</DialogTitle>
            <DialogDescription>
              {selectedWebinar && (
                <div className="mt-2">
                  <div className="font-medium text-lg">{selectedWebinar.title}</div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarClock size={14} className="mr-1" />
                    {new Date(selectedWebinar.date).toLocaleDateString()} at {selectedWebinar.time}
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
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll send webinar details and access link to this email.
              </p>
            </div>
            
            {selectedWebinar && (
              <div className="bg-muted p-3 rounded-md mt-4">
                <div className="font-medium">Webinar Details</div>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>Duration: {selectedWebinar.duration}</div>
                  <div>Presenter: {selectedWebinar.presenter}</div>
                  <div className="mt-1">
                    You'll receive a confirmation email with a calendar invite and access link.
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegistrationOpen(false)}>Cancel</Button>
            <Button onClick={confirmRegistration}>Confirm Registration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebinarListing;
