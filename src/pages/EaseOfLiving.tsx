
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import NatureInsights from '@/components/biomimicry/NatureInsights';
import PurposefulLiving from '@/components/biomimicry/PurposefulLiving';

// Import refactored components
import EaseOfLivingHero from '@/components/easeOfLiving/EaseOfLivingHero';
import IntroSection from '@/components/easeOfLiving/IntroSection';
import ServicesSection from '@/components/easeOfLiving/ServicesSection';
import AgricultureSection from '@/components/easeOfLiving/AgricultureSection';
import SustainableApproachSection from '@/components/easeOfLiving/SustainableApproachSection';

const EaseOfLiving = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Ease of Living - Mental Health Support">
      {/* Hero Section with Biomimicry Integration */}
      <EaseOfLivingHero />

      {/* Main content - Enhanced with sustainable focus */}
      <IntroSection />

      {/* Nature Insights Section */}
      <NatureInsights />

      {/* Services Section */}
      <ServicesSection />
      
      {/* Purposeful Living Section */}
      <PurposefulLiving />
      
      {/* Agriculture Connection Programs */}
      <AgricultureSection />
      
      {/* Sustainable Approach Section */}
      <SustainableApproachSection />
    </MainLayout>
  );
};

export default EaseOfLiving;
