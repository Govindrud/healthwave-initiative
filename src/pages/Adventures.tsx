
import { useEffect } from "react";
import AdventureListing from "@/components/adventures/AdventureListing";
import MainLayout from "@/components/layouts/MainLayout";

const Adventures = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Stress-Free Adventures";
  }, []);

  return (
    <MainLayout title="Stress-Free Adventures">
      <AdventureListing />
    </MainLayout>
  );
};

export default Adventures;
