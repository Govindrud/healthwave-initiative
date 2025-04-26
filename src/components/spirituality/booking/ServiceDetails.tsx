
import { Clock, MapPin, Users } from "lucide-react";

interface ServiceDetailsProps {
  title: string;
  price: number;
  duration: string;
  location: string;
  isGroup?: boolean;
  maxParticipants?: number;
}

const ServiceDetails = ({ 
  title,
  price,
  duration,
  location,
  isGroup,
  maxParticipants
}: ServiceDetailsProps) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{location}</span>
        </div>
        
        {isGroup && maxParticipants && (
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>Group (max {maxParticipants})</span>
          </div>
        )}
        
        <div className="font-medium text-meant-700">
          ₹{price} / session
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
