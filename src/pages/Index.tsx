
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BusinessSolutions from "@/components/BusinessSolutions";
import AIMentalHealthAssistant from "@/components/AIMentalHealthAssistant";
import ProblemForm from "@/components/ProblemForm";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/ProductsSection";
import { useIsPlatform } from "@/hooks/use-mobile";

const Index = () => {
  const { isIOS } = useIsPlatform();

  useEffect(() => {
    // Update the document title
    document.title = "MeantToHelp | Mental Health Solutions";
    
    // Fix for iOS vh calculation
    if (isIOS) {
      const setVhVariable = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
      window.addEventListener('orientationchange', setVhVariable);
      
      return () => {
        window.removeEventListener('resize', setVhVariable);
        window.removeEventListener('orientationchange', setVhVariable);
      };
    }
  }, [isIOS]);

  return (
    <div className={`min-h-screen flex flex-col ${isIOS ? 'ios-fix' : ''}`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <BusinessSolutions />
        <ProductsSection />
        <AIMentalHealthAssistant />
        <ProblemForm />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
