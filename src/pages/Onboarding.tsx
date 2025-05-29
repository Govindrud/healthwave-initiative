
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import UserOnboarding from '@/components/onboarding/UserOnboarding';

const Onboarding = () => {
  useEffect(() => {
    document.title = "Welcome - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Welcome - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <UserOnboarding />
      </div>
    </MainLayout>
  );
};

export default Onboarding;
