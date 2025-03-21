
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebinarListing from "@/components/webinars/WebinarListing";
import PageTransition from "@/components/PageTransition";

const Webinars = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Mental Health Webinars";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <WebinarListing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Webinars;
