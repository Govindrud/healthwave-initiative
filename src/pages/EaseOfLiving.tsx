
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import BiomimicryHero from '@/components/biomimicry/BiomimicryHero';
import NatureInsights from '@/components/biomimicry/NatureInsights';
import PurposefulLiving from '@/components/biomimicry/PurposefulLiving';
import BiodiversitySection from '@/components/biomimicry/BiodiversitySection';

const EaseOfLiving = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <BiomimicryHero />
        <NatureInsights />
        <BiodiversitySection />
        <PurposefulLiving />
      </div>
    </MainLayout>
  );
};

export default EaseOfLiving;
