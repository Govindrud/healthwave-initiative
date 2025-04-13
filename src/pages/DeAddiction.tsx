
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import HeroSection from "@/components/deaddiction/HeroSection";
import AddictionTypes from "@/components/deaddiction/AddictionTypes";
import RehabApproach from "@/components/deaddiction/RehabApproach";
import CTASection from "@/components/deaddiction/CTASection";

const DeAddiction = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AddictionTypes />
      <RehabApproach />
      <CTASection />
    </MainLayout>
  );
};

export default DeAddiction;
