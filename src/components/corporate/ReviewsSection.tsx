
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Star, ThumbsUp, HeadphonesIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReviewData {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  review: string;
  date: string;
  customerServiceRating: number;
  easeOfUseRating: number;
  valueRating: number;
}

const REVIEWS: ReviewData[] = [
  {
    id: 1,
    name: "Jennifer Thompson",
    role: "HR Director",
    company: "Zenith Technologies",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format",
    review: "The certification process was thorough and insightful. It helped us identify areas for improvement we hadn't considered before. Our team is proud to display the Stress-Free Certification.",
    date: "March 15, 2025",
    customerServiceRating: 5,
    easeOfUseRating: 4,
    valueRating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CEO",
    company: "Balance Financial",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&auto=format",
    review: "Since becoming certified, we've seen a 40% increase in qualified job applications and a 25% reduction in turnover. The ROI has been phenomenal for our organization.",
    date: "February 22, 2025",
    customerServiceRating: 5,
    easeOfUseRating: 5,
    valueRating: 4
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Chief Wellness Officer",
    company: "Harmony Health",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format",
    review: "The MeantToHelp team was incredibly supportive throughout the entire certification process. They provided valuable insights that helped us improve our wellness programs.",
    date: "April 5, 2025",
    customerServiceRating: 5,
    easeOfUseRating: 4,
    valueRating: 5
  }
];

export const ReviewsSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
          Testimonials
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
          What Our Certified Organizations Say
        </h2>
        <p className="text-muted-foreground">
          Hear from companies that have earned our Stress-Free Certification and the impact it's made on their organizations.
        </p>
      </div>
      
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {REVIEWS.map((review) => (
            <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {review.role}, {review.company}
                          </p>
                        </div>
                        
                        <MessageSquare className="h-5 w-5 text-meant-500" />
                      </div>
                      
                      <p className="mt-4 text-muted-foreground">"{review.review}"</p>
                      
                      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <HeadphonesIcon className="h-4 w-4 text-meant-600 mr-1" />
                            <span className="text-xs font-medium">Support</span>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                fill={star <= review.customerServiceRating ? "currentColor" : "none"}
                                className={`h-3 w-3 ${
                                  star <= review.customerServiceRating ? "text-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <ThumbsUp className="h-4 w-4 text-meant-600 mr-1" />
                            <span className="text-xs font-medium">Ease</span>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                fill={star <= review.easeOfUseRating ? "currentColor" : "none"}
                                className={`h-3 w-3 ${
                                  star <= review.easeOfUseRating ? "text-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <Zap className="h-4 w-4 text-meant-600 mr-1" />
                            <span className="text-xs font-medium">Value</span>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                fill={star <= review.valueRating ? "currentColor" : "none"}
                                className={`h-3 w-3 ${
                                  star <= review.valueRating ? "text-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-4">
                        {review.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-center gap-2">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};
