
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ExternalLink, Info, MapPin, Star } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  specialties: string[];
  location: string;
  verified?: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  website?: string;
  type?: string;
  acceptingNew?: boolean;
}

interface ServicePartnerCardProps {
  partner: Partner;
}

export const ServicePartnerCard: React.FC<ServicePartnerCardProps> = ({ partner }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      {partner.featured && (
        <div className="bg-meant-600 text-white text-xs font-bold py-1 px-3 text-center">
          FEATURED PARTNER
        </div>
      )}
      <CardContent className="flex-grow p-0">
        <div className="p-6 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-md p-2 h-12 w-12 flex items-center justify-center mr-3">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-lg">{partner.name}</h3>
                  {partner.verified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="ml-2 bg-green-100 text-green-600 rounded-full p-0.5" title="Verified Partner">
                            <Check size={14} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Verified Partner - Credentials and quality standards validated by MeantToHelp</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                {partner.type && (
                  <span className="text-xs text-gray-500 capitalize">{partner.type} Partner</span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
          
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span>{partner.location}</span>
            </div>
            {partner.rating && (
              <div className="flex items-center">
                <div className="flex text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill={partner.rating >= 4.8 ? "currentColor" : "none"} stroke="currentColor" />
                </div>
                <span className="text-sm ml-1 text-gray-600">{partner.rating}</span>
                {partner.reviews && (
                  <span className="text-xs ml-1 text-gray-500">({partner.reviews} reviews)</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {partner.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                {specialty}
              </Badge>
            ))}
            {partner.specialties.length > 3 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs bg-gray-50 cursor-help">
                      <Info size={10} className="mr-1" />
                      +{partner.specialties.length - 3} more
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Also specializes in: {partner.specialties.slice(3).join(", ")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 border-t">
        <div>
          {partner.acceptingNew ? (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">Accepting New Clients</Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500">Waitlist Only</Badge>
          )}
        </div>
        <Button size="sm" className="bg-meant-600 hover:bg-meant-700">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicePartnerCard;
