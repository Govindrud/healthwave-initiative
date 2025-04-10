
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { HeroSection } from "@/components/corporate/HeroSection";
import { ProcessSection } from "@/components/corporate/ProcessSection";
import { CompaniesSection } from "@/components/corporate/CompaniesSection";
import { CertificateSection } from "@/components/corporate/CertificateSection";
import { StandardsSection } from "@/components/corporate/StandardsSection";
import { CorporateBenefits } from "@/components/corporate/CorporateBenefits";
import { ReviewsSection } from "@/components/corporate/ReviewsSection";
import { CTASection } from "@/components/corporate/CTASection";

const CorporateCertification = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works */}
      <ProcessSection />
      
      {/* Certified Companies */}
      <CompaniesSection />
      
      {/* Certificate Sample */}
      <CertificateSection />
      
      {/* Benefits */}
      <section className="py-16 bg-gradient-to-b from-meant-50/50 to-white">
        <CorporateBenefits />
      </section>
      
      {/* Standards Metrics */}
      <StandardsSection />
      
      {/* Reviews */}
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <ReviewsSection />
      </section>
      
      {/* CTA Section */}
      <CTASection />
    </MainLayout>
  );
};

export default CorporateCertification;
