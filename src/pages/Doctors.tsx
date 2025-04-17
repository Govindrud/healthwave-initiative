
import { useEffect } from "react";
import DoctorListing from "@/components/doctors/DoctorListing";
import MainLayout from "@/components/layouts/MainLayout";

const Doctors = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Consult with Doctors";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Consult with Doctors">
      <div className="bg-gradient-to-b from-meant-50 to-white pt-6 pb-12">
        <DoctorListing />
      </div>
    </MainLayout>
  );
};

export default Doctors;
