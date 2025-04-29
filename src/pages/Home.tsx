
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import SocialFeed from '@/components/SocialFeed';
import AIMentalHealthAssistant from '@/components/AIMentalHealthAssistant';
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

const Home = () => {
  useEffect(() => {
    document.title = "MeantToHelp - Mental Health Support";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
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
        <SocialFeed />
        <AIMentalHealthAssistant />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
