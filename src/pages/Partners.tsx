
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import ServicePartnerCard from "@/components/partners/ServicePartnerCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Building, Users, Activity, HeartPulse, Clock, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/context/RegionContext";
import { motion } from "framer-motion";

// Sample partner data
const partnersData = [
  {
    id: "partner-1",
    name: "MindWell Therapy",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Specialized online therapy sessions focusing on anxiety, depression, and stress management with certified psychologists.",
    rating: 4.8,
    reviewCount: 245,
    specialties: ["Anxiety", "Depression", "Stress Management", "CBT"],
    availableNow: true,
    verified: true,
    partnerSince: "2022",
    url: "/partners/mindwell-therapy",
    type: "therapy"
  },
  {
    id: "partner-2",
    name: "Serenity Counseling",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Holistic mental health counseling services for individuals, couples, and families with focus on relationship issues.",
    rating: 4.6,
    reviewCount: 189,
    specialties: ["Couples Therapy", "Family Counseling", "Grief", "PTSD"],
    availableNow: false,
    verified: true,
    partnerSince: "2021",
    url: "/partners/serenity-counseling",
    type: "counseling"
  },
  {
    id: "partner-3",
    name: "Breathe Meditation Center",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Guided meditation sessions and mindfulness training to help manage anxiety and improve mental wellbeing.",
    rating: 4.9,
    reviewCount: 302,
    specialties: ["Meditation", "Mindfulness", "Stress Reduction", "Sleep Improvement"],
    availableNow: true,
    verified: true,
    partnerSince: "2020",
    url: "/partners/breathe-meditation",
    type: "wellness"
  },
  {
    id: "partner-4",
    name: "Recovery Path",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Specialized addiction recovery programs with personalized treatment plans and ongoing support.",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Addiction Recovery", "Substance Abuse", "Group Therapy", "Family Support"],
    availableNow: false,
    verified: true,
    partnerSince: "2019",
    url: "/partners/recovery-path",
    type: "recovery"
  },
  {
    id: "partner-5",
    name: "Thrive Corporate Wellness",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Workplace mental health programs and employee assistance services for businesses of all sizes.",
    rating: 4.5,
    reviewCount: 78,
    specialties: ["Corporate Wellness", "Employee Assistance", "Workplace Stress", "Team Building"],
    availableNow: true,
    verified: false,
    partnerSince: "2023",
    url: "/partners/thrive-corporate",
    type: "corporate"
  },
  {
    id: "partner-6",
    name: "Mind-Body Connection",
    logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
    description: "Integrative approach combining physical and mental health practices for holistic wellness.",
    rating: 4.4,
    reviewCount: 112,
    specialties: ["Yoga Therapy", "Nutritional Psychology", "Exercise Programs", "Holistic Healing"],
    availableNow: true,
    verified: true,
    partnerSince: "2020",
    url: "/partners/mind-body",
    type: "wellness"
  }
];

const Partners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [availableNowFilter, setAvailableNowFilter] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const { region } = useRegion();
  
  useEffect(() => {
    document.title = "Mental Health Partners | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);
  
  const filteredPartners = partnersData.filter((partner) => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const matchesType = filterType === null || partner.type === filterType;
    
    // Available now filter
    const matchesAvailability = !availableNowFilter || partner.availableNow;
    
    // Verified filter
    const matchesVerification = !verifiedFilter || partner.verified;
    
    return matchesSearch && matchesType && matchesAvailability && matchesVerification;
  });
  
  const categories = [
    { value: null, label: "All Partners", icon: <Users size={16} /> },
    { value: "therapy", label: "Therapy", icon: <HeartPulse size={16} /> },
    { value: "counseling", label: "Counseling", icon: <Activity size={16} /> },
    { value: "wellness", label: "Wellness", icon: <Star size={16} /> },
    { value: "recovery", label: "Recovery", icon: <Clock size={16} /> },
    { value: "corporate", label: "Corporate", icon: <Building size={16} /> }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-meant-50 to-white py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-balance max-w-3xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
                  Find Mental Health Services from Our Trusted Partners
                </span>
              </h1>
              <p className="text-muted-foreground max-w-3xl mb-8">
                Browse our network of verified mental health service providers and find the right support for your needs. 
                All partners are pre-vetted and follow our quality standards.
              </p>
            </motion.div>
            
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search by name, specialty, or keyword..."
                className="pl-10 py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Badge variant="outline" className="flex items-center gap-1 bg-meant-50 text-meant-700">
                <Globe size={14} />
                <span>Region: {region === 'india' ? 'India' : 'Global'}</span>
              </Badge>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={14} />
                <span>Filters</span>
              </Button>
              
              <div className="flex gap-4 ml-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="available"
                    checked={availableNowFilter}
                    onCheckedChange={(checked) => {
                      setAvailableNowFilter(checked === true);
                    }}
                  />
                  <label htmlFor="available" className="text-sm cursor-pointer">Available now</label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="verified"
                    checked={verifiedFilter}
                    onCheckedChange={(checked) => {
                      setVerifiedFilter(checked === true);
                    }}
                  />
                  <label htmlFor="verified" className="text-sm cursor-pointer">Verified only</label>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners listing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Tabs defaultValue={null} onValueChange={(value) => setFilterType(value as string | null)}>
                <TabsList className="bg-meant-50">
                  {categories.map((category) => (
                    <TabsTrigger key={category.label} value={category.value === null ? '' : category.value} className="flex items-center gap-1">
                      {category.icon}
                      <span>{category.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {filteredPartners.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPartners.map((partner) => (
                  <ServicePartnerCard key={partner.id} {...partner} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-2">No partners match your criteria</p>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Join as Partner CTA */}
        <section className="py-16 bg-gradient-to-r from-meant-700 to-meant-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Are You a Mental Health Service Provider?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join our network of trusted mental health partners and connect with clients who need your services.
              Our platform helps you expand your reach while maintaining quality care.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-meant-800 hover:bg-gray-100 rounded-full">
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-meant-600 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
