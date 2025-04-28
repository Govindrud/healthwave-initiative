
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Check, ThumbsUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ServicePartnerCardProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  availableNow?: boolean;
  verified?: boolean;
  partnerSince: string;
  url: string;
}

const ServicePartnerCard: React.FC<ServicePartnerCardProps> = ({
  id,
  name,
  logo,
  description,
  rating,
  reviewCount,
  specialties,
  availableNow = false,
  verified = false,
  partnerSince,
  url
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 relative rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
              <img src={logo} alt={`${name} logo`} className="object-cover w-full h-full" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-1">
                {name}
                {verified && (
                  <span className="inline-flex ml-1" title="Verified Partner">
                    <Check size={16} className="text-green-500" />
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14}
                      className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({reviewCount})</span>
              </div>
            </div>
          </div>
          {availableNow && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <Clock size={12} />
              <span>Available now</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="mb-3">{description}</CardDescription>
        <div className="flex flex-wrap gap-1 mt-1">
          {specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary" className="bg-meant-50 text-meant-700">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 3 && (
            <Badge variant="secondary" className="bg-gray-50 text-gray-600">
              +{specialties.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="text-xs text-muted-foreground">Partner since {partnerSince}</div>
        <Button size="sm" asChild>
          <Link to={url}>
            <span>View Services</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicePartnerCard;
