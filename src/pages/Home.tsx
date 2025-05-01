
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import SocialFeed from '@/components/SocialFeed';
import ProblemForm from '@/components/ProblemForm';
import SolutionsSection from '@/components/SolutionsSection';
import ServicesSlider from '@/components/ServicesSlider';
import VoiceAssistantPromo from '@/components/voice/VoiceAssistantPromo';
import Spirituality from '@/components/Spirituality';
import PartnerLogosSection from '@/components/partners/PartnerLogosSection';
import GoalSetting from '@/components/GoalSetting';
import PeerSupportSection from '@/components/PeerSupportSection';
import SleepBetterSection from '@/components/SleepBetterSection';
import HappyPeopleSlider from '@/components/HappyPeopleSlider';
import AIPersonalAssistant from '@/components/ai/AIPersonalAssistant';
import MainLayout from '@/components/layouts/MainLayout';

const Home = () => {
  useEffect(() => {
    document.title = "MeantToHelp - Mental Health Support";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Hero />
      <About />
      <ServicesSlider />
      <HappyPeopleSlider />
      <ProductsSection />
      <SolutionsSection />
      <PartnerLogosSection />
      <GoalSetting />
      <PeerSupportSection />
      <SleepBetterSection />
      <ProblemForm />
      <Spirituality />
      <VoiceAssistantPromo />
      <AIPersonalAssistant />
      <SocialFeed />
      <Contact />
    </MainLayout>
  );
};

export default Home;
