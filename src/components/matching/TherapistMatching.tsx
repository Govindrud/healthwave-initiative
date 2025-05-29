
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, MessageCircle, Video, Heart, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Therapist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  matchScore: number;
  sessionTypes: ('video' | 'audio' | 'chat')[];
  bio: string;
  experience: string;
  image?: string;
}

interface TherapistMatchingProps {
  assessmentResults: {
    scores: Record<string, number>;
    recommendations: any[];
  };
  onSelectTherapist: (therapist: Therapist) => void;
}

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Licensed Clinical Psychologist',
    specializations: ['Anxiety Disorders', 'Cognitive Behavioral Therapy', 'Mindfulness'],
    rating: 4.9,
    reviewCount: 127,
    location: 'Mumbai, India',
    availability: 'Available today',
    matchScore: 95,
    sessionTypes: ['video', 'audio', 'chat'],
    bio: 'Specializing in anxiety and stress management with over 8 years of experience.',
    experience: '8+ years',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Patel',
    title: 'Licensed Marriage & Family Therapist',
    specializations: ['Relationship Counseling', 'Family Therapy', 'Communication Skills'],
    rating: 4.8,
    reviewCount: 94,
    location: 'Delhi, India',
    availability: 'Available tomorrow',
    matchScore: 88,
    sessionTypes: ['video', 'audio'],
    bio: 'Helping couples and families build stronger relationships for over 10 years.',
    experience: '10+ years',
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    title: 'Licensed Clinical Social Worker',
    specializations: ['Depression', 'Trauma Therapy', 'EMDR'],
    rating: 4.9,
    reviewCount: 156,
    location: 'Bangalore, India',
    availability: 'Available in 2 days',
    matchScore: 82,
    sessionTypes: ['video', 'chat'],
    bio: 'Specialized in trauma-informed care and evidence-based treatments.',
    experience: '6+ years',
  }
];

const TherapistMatching: React.FC<TherapistMatchingProps> = ({ 
  assessmentResults, 
  onSelectTherapist 
}) => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  useEffect(() => {
    // Simulate matching algorithm
    const matchTherapists = async () => {
      setIsLoading(true);
      
      // In real implementation, this would call an API with assessment results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sort therapists by match score and filter based on assessment results
      const matchedTherapists = mockTherapists
        .map(therapist => ({
          ...therapist,
          matchScore: calculateMatchScore(therapist, assessmentResults)
        }))
        .sort((a, b) => b.matchScore - a.matchScore);
      
      setTherapists(matchedTherapists);
      setIsLoading(false);
    };

    matchTherapists();
  }, [assessmentResults]);

  const calculateMatchScore = (therapist: Therapist, results: any) => {
    // Simple matching algorithm based on specializations and assessment scores
    let baseScore = therapist.matchScore;
    
    // Boost score for anxiety specialists if high anxiety score
    if (results.scores.anxiety > 60 && therapist.specializations.some(s => s.toLowerCase().includes('anxiety'))) {
      baseScore += 10;
    }
    
    // Boost score for depression specialists if high depression score
    if (results.scores.depression > 60 && therapist.specializations.some(s => s.toLowerCase().includes('depression'))) {
      baseScore += 10;
    }
    
    // Boost score for relationship counselors if low relationship satisfaction
    if (results.scores.relationships > 60 && therapist.specializations.some(s => s.toLowerCase().includes('relationship'))) {
      baseScore += 10;
    }
    
    return Math.min(100, baseScore);
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <MessageCircle className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meant-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Finding Your Perfect Match</h3>
              <p className="text-muted-foreground">
                We're analyzing your assessment results to match you with the best therapists...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-meant-800 mb-4">Your Therapist Matches</h1>
        <p className="text-muted-foreground">
          We've found {therapists.length} therapists who are specially matched to your needs
        </p>
      </motion.div>

      {/* Therapist Cards */}
      <div className="space-y-4">
        {therapists.map((therapist, index) => (
          <motion.div
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 transition-all hover:shadow-md ${
              selectedTherapist === therapist.id ? 'border-meant-600 bg-meant-50' : 'border-meant-100'
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Therapist Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={therapist.image} />
                          <AvatarFallback className="bg-meant-100 text-meant-600">
                            {therapist.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold text-meant-800">
                            {therapist.name}
                          </h3>
                          <p className="text-muted-foreground">{therapist.title}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{therapist.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({therapist.reviewCount} reviews)
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {therapist.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">
                          {therapist.matchScore}% Match
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {therapist.availability}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{therapist.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapist.specializations.map((spec, i) => (
                        <Badge key={i} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">Available via:</span>
                        {therapist.sessionTypes.map((type, i) => (
                          <div key={i} className="flex items-center space-x-1">
                            {getSessionTypeIcon(type)}
                            <span className="text-sm capitalize">{type}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        {therapist.experience} experience
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center space-y-3 md:w-48">
                    <Button
                      onClick={() => {
                        setSelectedTherapist(therapist.id);
                        onSelectTherapist(therapist);
                      }}
                      className="w-full bg-meant-600 hover:bg-meant-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Select Therapist
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Save for Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Matches Message */}
      {therapists.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              We couldn't find any therapists matching your criteria. Please try adjusting your preferences.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TherapistMatching;
