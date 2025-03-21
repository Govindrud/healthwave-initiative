
import { useEffect } from "react";
import DoctorListing from "@/components/doctors/DoctorListing";
import MainLayout from "@/components/layouts/MainLayout";

const Doctors = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Consult with Doctors";
  }, []);

  return (
    <MainLayout title="Consult with Doctors">
      <DoctorListing />
    </MainLayout>
  );
};

export default Doctors;
