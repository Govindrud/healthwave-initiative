
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import PartnerLogosSection from '@/components/partners/PartnerLogosSection';

const Partners = () => {
  useEffect(() => {
    document.title = "Our Partners - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Our Partners - MeantToHelp">
      <div className="pt-16">
        <PartnerLogosSection />
      </div>
    </MainLayout>
  );
};

export default Partners;
