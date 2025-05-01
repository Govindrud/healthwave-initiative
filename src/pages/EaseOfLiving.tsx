
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import BiomimicryHero from '@/components/biomimicry/BiomimicryHero';
import NatureInsights from '@/components/biomimicry/NatureInsights';
import PurposefulLiving from '@/components/biomimicry/PurposefulLiving';
import BiodiversitySection from '@/components/biomimicry/BiodiversitySection';
import ServiceOpportunities from '@/components/biomimicry/ServiceOpportunities';
import AgricultureTourism from '@/components/biomimicry/AgricultureTourism';
import EcoServiceBooking from '@/components/biomimicry/EcoServiceBooking';

const EaseOfLiving = () => {
  useEffect(() => {
    document.title = "Ease of Living | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Ease of Living - Nature-Based Solutions">
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
        <BiomimicryHero />
        <NatureInsights />
        <BiodiversitySection />
        <EcoServiceBooking />
        <AgricultureTourism />
        <ServiceOpportunities />
        <PurposefulLiving />
      </div>
    </MainLayout>
  );
};

export default EaseOfLiving;
