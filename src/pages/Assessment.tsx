
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import MentalHealthAssessment from '@/components/assessment/MentalHealthAssessment';
import AssessmentResults from '@/components/assessment/AssessmentResults';
import TherapistMatching from '@/components/matching/TherapistMatching';
import ServiceRecommendationEngine from '@/components/assessment/ServiceRecommendationEngine';

type AssessmentStep = 'assessment' | 'results' | 'therapist_matching' | 'service_recommendations';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('assessment');
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);

  useEffect(() => {
    document.title = "Mental Health Assessment - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentStep('results');
  };

  const handleProceedToMatching = () => {
    setCurrentStep('therapist_matching');
  };

  const handleTherapistSelected = (therapist: any) => {
    setSelectedTherapist(therapist);
    setCurrentStep('service_recommendations');
  };

  const handleServiceSelected = (service: any) => {
    // Navigate to booking with selected service and therapist
    navigate('/services', { 
      state: { 
        selectedService: service,
        selectedTherapist,
        assessmentResults 
      }
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'assessment':
        return <MentalHealthAssessment onComplete={handleAssessmentComplete} />;
      
      case 'results':
        return (
          <AssessmentResults 
            results={assessmentResults}
            onProceedToMatching={handleProceedToMatching}
          />
        );
      
      case 'therapist_matching':
        return (
          <TherapistMatching
            assessmentResults={assessmentResults}
            onSelectTherapist={handleTherapistSelected}
          />
        );
      
      case 'service_recommendations':
        return (
          <ServiceRecommendationEngine
            assessmentResults={assessmentResults}
            onSelectService={handleServiceSelected}
          />
        );
      
      default:
        return <MentalHealthAssessment onComplete={handleAssessmentComplete} />;
    }
  };

  return (
    <MainLayout title="Mental Health Assessment - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        {renderCurrentStep()}
      </div>
    </MainLayout>
  );
};

export default Assessment;
