
import React, { useEffect } from 'react';
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

// Strategic components
import TrustBadges from '@/components/trust/TrustBadges';
import PricingOptimization from '@/components/pricing/PricingOptimization';
import UserEngagementTracker from '@/components/analytics/UserEngagementTracker';
import MobileOptimizedLayout from '@/components/mobile/MobileOptimizedLayout';
import AssessmentCTA from '@/components/assessment/AssessmentCTA';

// Lazy-loaded components for better performance
const GoalSetting = React.lazy(() => import('@/components/GoalSetting'));
const PeerSupportSection = React.lazy(() => import('@/components/PeerSupportSection'));
const SleepBetterSection = React.lazy(() => import('@/components/SleepBetterSection'));
const HappyPeopleSlider = React.lazy(() => import('@/components/HappyPeopleSlider'));
const AIPersonalAssistant = React.lazy(() => import('@/components/ai/AIPersonalAssistant'));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => <Skeleton className="w-full h-40" />;

const Home: React.FC = () => {
  // Safe scrolling handler that doesn't directly use useLocation
  useEffect(() => {
    // Set page title
    document.title = "MeantToHelp - Mental Health Support";
    
    // Handle initial hash fragment for direct navigation
    const handleInitialScroll = () => {
      // Always scroll to top first
      window.scrollTo(0, 0);
      
      const hash = window.location.hash;
      if (hash) {
        // Remove the # character
        const targetId = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Increased delay to ensure page is fully loaded
      }
    };

    // Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Run initial scroll handler after a small delay
    const timeoutId = setTimeout(handleInitialScroll, 100);

    console.log("Home component rendered");
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <UserEngagementTracker>
      <MobileOptimizedLayout>
        <MainLayout title="MeantToHelp - Mental Health Support">
          <div className="w-full">
            <ErrorBoundary>
              {/* Critical components loaded immediately */}
              <Hero />
              <TrustBadges />
              <About />
              <ServicesSlider />
              <ProductsSection />
              <SolutionsSection />
            </ErrorBoundary>
            
            {/* Assessment CTA - Key conversion point */}
            <ErrorBoundary>
              <AssessmentCTA />
            </ErrorBoundary>
            
            {/* Pricing section - key for monetization */}
            <ErrorBoundary>
              <PricingOptimization />
            </ErrorBoundary>
            
            {/* Secondary components lazy-loaded */}
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingFallback />}>
                <HappyPeopleSlider />
              </React.Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <PartnerLogosSection />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingFallback />}>
                <GoalSetting />
              </React.Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingFallback />}>
                <PeerSupportSection />
              </React.Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingFallback />}>
                <SleepBetterSection />
              </React.Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <ProblemForm />
              <Spirituality />
              <VoiceAssistantPromo />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingFallback />}>
                <AIPersonalAssistant />
              </React.Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <SocialFeed />
              <Contact />
            </ErrorBoundary>
          </div>
        </MainLayout>
      </MobileOptimizedLayout>
    </UserEngagementTracker>
  );
};

export default Home;
