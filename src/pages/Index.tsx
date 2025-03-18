
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

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "MeantToHelp | Mental Health Solutions";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
