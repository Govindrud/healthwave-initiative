
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from "@/components/Hero";
import About from "@/components/About";
import BusinessSolutions from "@/components/BusinessSolutions";
import ProblemForm from "@/components/ProblemForm";
import ProductsSection from "@/components/ProductsSection";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import AIMentalHealthAssistant from "@/components/AIMentalHealthAssistant";
import Spirituality from "@/components/Spirituality";
import ServicesSlider from "@/components/ServicesSlider";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <ServicesSlider />
      <BusinessSolutions />
      <ProductsSection />
      <Spirituality />
      <ProblemForm />
      <SocialFeed />
      <AIMentalHealthAssistant />
      <Contact />
    </MainLayout>
  );
};

export default Index;
