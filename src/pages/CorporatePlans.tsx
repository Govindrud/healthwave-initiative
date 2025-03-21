
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporatePlansContent from "@/components/corporate/CorporatePlansContent";
import PageTransition from "@/components/PageTransition";

const CorporatePlans = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Corporate Mental Health Plans";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <CorporatePlansContent />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CorporatePlans;
