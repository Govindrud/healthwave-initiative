
import React, { useEffect } from 'react';
import InvestorPitch from '@/components/investor/InvestorPitch';

const InvestorPitchPage = () => {
  useEffect(() => {
    document.title = "Investor Pitch | MeantToHelp";
  }, []);

  return <InvestorPitch />;
};

export default InvestorPitchPage;
