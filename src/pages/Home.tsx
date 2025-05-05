
import React, { useEffect, Suspense } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
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
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy-loaded components for better performance
const GoalSetting = React.lazy(() => import('@/components/GoalSetting'));
const PeerSupportSection = React.lazy(() => import('@/components/PeerSupportSection'));
const SleepBetterSection = React.lazy(() => import('@/components/SleepBetterSection'));
const HappyPeopleSlider = React.lazy(() => import('@/components/HappyPeopleSlider'));
const AIPersonalAssistant = React.lazy(() => import('@/components/ai/AIPersonalAssistant'));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => <Skeleton className="w-full h-40" />;

const Home = () => {
  useEffect(() => {
    document.title = "MeantToHelp - Mental Health Support";
    window.scrollTo(0, 0);
    console.log("Home component rendered");
  }, []);

  return (
    <MainLayout title="MeantToHelp - Mental Health Support">
      <ErrorBoundary>
        {/* Critical components loaded immediately */}
        <Hero />
        <About />
        <ServicesSlider />
        <ProductsSection />
        <SolutionsSection />
      </ErrorBoundary>
      
      {/* Secondary components lazy-loaded */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <HappyPeopleSlider />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PartnerLogosSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <GoalSetting />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <PeerSupportSection />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <SleepBetterSection />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ProblemForm />
        <Spirituality />
        <VoiceAssistantPromo />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <AIPersonalAssistant />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <SocialFeed />
        <Contact />
      </ErrorBoundary>
    </MainLayout>
  );
};

export default Home;
