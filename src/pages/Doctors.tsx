
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorListing from "@/components/doctors/DoctorListing";
import PageTransition from "@/components/PageTransition";

const Doctors = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Consult with Doctors";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <DoctorListing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Doctors;
