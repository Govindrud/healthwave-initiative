
import Hero from "@/components/Hero";
import About from "@/components/About";
import BusinessSolutions from "@/components/BusinessSolutions";
import ProblemForm from "@/components/ProblemForm";
import ProductsSection from "@/components/ProductsSection";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import AIMentalHealthAssistant from "@/components/AIMentalHealthAssistant";
import Spirituality from "@/components/Spirituality";
import PageTransition from "@/components/PageTransition";
import ServicesSlider from "@/components/ServicesSlider";

const Index = () => {
  return (
    <PageTransition>
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
    </PageTransition>
  );
};

export default Index;
