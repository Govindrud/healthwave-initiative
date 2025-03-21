
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdventureListing from "@/components/adventures/AdventureListing";
import PageTransition from "@/components/PageTransition";

const Adventures = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Stress-Free Adventures";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <AdventureListing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Adventures;
