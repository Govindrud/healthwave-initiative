
import { useEffect } from "react";
import DoctorListing from "@/components/doctors/DoctorListing";
import MainLayout from "@/components/layouts/MainLayout";
import "@/styles/service-page.css";

const Doctors = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Consult with Doctors";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Consult with Doctors">
      <div className="service-header">
        <div className="container mx-auto px-4">
          <h1 className="service-title text-3xl md:text-4xl font-bold">Consult with Doctors</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Connect with experienced healthcare professionals for personalized medical consultations
            and expert advice from the comfort of your home.
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-meant-50 to-white pt-6 pb-12">
        <DoctorListing />
      </div>
    </MainLayout>
  );
};

export default Doctors;
