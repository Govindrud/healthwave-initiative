
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ReferralProgram from '@/components/growth/ReferralProgram';

const Referrals = () => {
  useEffect(() => {
    document.title = "Referral Program - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Referral Program - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <ReferralProgram />
      </div>
    </MainLayout>
  );
};

export default Referrals;
