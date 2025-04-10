
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { CertificationLogo } from "./CertificationLogo";
import { Star, Building, Users, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CompanyData {
  id: number;
  name: string;
  logo: string;
  industry: string;
  category: string;
  rating: number;
  employeeSatisfaction: number;
  year: number;
  employees?: string;
  location?: string;
  website?: string;
}

interface CertifiedCompaniesSliderProps {
  category: string;
}

// Sample company data with enhanced information
const COMPANIES: CompanyData[] = [
  {
    id: 1,
    name: "Zenith Technologies",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=250&h=250&fit=crop&auto=format",
    industry: "Software Development",
    category: "tech",
    rating: 4.8,
    employeeSatisfaction: 96,
    year: 2023,
    employees: "500-1000",
    location: "San Francisco, CA",
    website: "https://example.com/zenith"
  },
  {
    id: 2,
    name: "Harmony Health",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=250&h=250&fit=crop&auto=format",
    industry: "Healthcare",
    category: "healthcare",
    rating: 4.7,
    employeeSatisfaction: 94,
    year: 2023,
    employees: "1000-5000",
    location: "Boston, MA",
    website: "https://example.com/harmony"
  },
  {
    id: 3,
    name: "Balance Financial",
    logo: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=250&h=250&fit=crop&auto=format",
    industry: "Banking",
    category: "finance",
    rating: 4.6,
    employeeSatisfaction: 92,
    year: 2022,
    employees: "5000+",
    location: "New York, NY",
    website: "https://example.com/balance"
  },
  {
    id: 4,
    name: "Mindful Learning",
    logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=250&h=250&fit=crop&auto=format",
    industry: "Education",
    category: "education",
    rating: 4.9,
    employeeSatisfaction: 98,
    year: 2023,
    employees: "100-500",
    location: "Austin, TX",
    website: "https://example.com/mindful"
  },
  {
    id: 5,
    name: "Tranquil Solutions",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=250&h=250&fit=crop&auto=format",
    industry: "Consulting",
    category: "tech",
    rating: 4.5,
    employeeSatisfaction: 90,
    year: 2022,
    employees: "100-500",
    location: "Seattle, WA",
    website: "https://example.com/tranquil"
  },
  {
    id: 6,
    name: "Wellbeing Medical Group",
    logo: "https://images.unsplash.com/photo-1516841273335-e39b37888115?w=250&h=250&fit=crop&auto=format",
    industry: "Medical Services",
    category: "healthcare",
    rating: 4.7,
    employeeSatisfaction: 93,
    year: 2023,
    employees: "1000-5000",
    location: "Chicago, IL",
    website: "https://example.com/wellbeing"
  },
  {
    id: 7,
    name: "Serenity Investment Partners",
    logo: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=250&h=250&fit=crop&auto=format",
    industry: "Investment Banking",
    category: "finance",
    rating: 4.4,
    employeeSatisfaction: 89,
    year: 2022,
    employees: "100-500",
    location: "Dallas, TX",
    website: "https://example.com/serenity"
  },
  {
    id: 8,
    name: "Enlightened Academy",
    logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=250&h=250&fit=crop&auto=format",
    industry: "Higher Education",
    category: "education",
    rating: 4.8,
    employeeSatisfaction: 95,
    year: 2023,
    employees: "500-1000",
    location: "Denver, CO",
    website: "https://example.com/enlightened"
  }
];

export const CertifiedCompaniesSlider = ({ category }: CertifiedCompaniesSliderProps) => {
  // Filter companies based on category
  const filteredCompanies = category === "all" 
    ? COMPANIES 
    : COMPANIES.filter(company => company.category === category);

  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {filteredCompanies.map((company) => (
          <CarouselItem key={company.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full border-t-4 border-t-meant-500 hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="relative h-16 mb-4 flex items-center justify-center bg-white rounded-md p-2">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-meant-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <CertificationLogo size="sm" />
                  <div className="flex items-center text-sm text-muted-foreground bg-meant-50 px-2 py-1 rounded-full">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Certified {company.year}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-3">{company.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{company.industry}</p>
                
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Building className="h-3 w-3 mr-1" />
                  <span>{company.location}</span>
                  
                  <span className="mx-2">•</span>
                  
                  <Users className="h-3 w-3 mr-1" />
                  <span>{company.employees}</span>
                </div>
                
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex items-center mb-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          fill={star <= Math.round(company.rating) ? "currentColor" : "none"}
                          className={`h-4 w-4 ${
                            star <= Math.round(company.rating) ? "text-amber-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{company.rating}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-meant-500 to-meant-600 h-2 rounded-full" 
                      style={{ width: `${company.employeeSatisfaction}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {company.employeeSatisfaction}% Employee Satisfaction
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                      <a href={company.website} target="_blank" rel="noopener noreferrer" title="Visit website">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
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
  );
};
