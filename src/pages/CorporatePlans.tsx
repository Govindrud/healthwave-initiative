
import { useEffect } from "react";
import CorporatePlansContent from "@/components/corporate/CorporatePlansContent";
import MainLayout from "@/components/layouts/MainLayout";

const CorporatePlans = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Corporate Mental Health Plans";
  }, []);

  return (
    <MainLayout title="Corporate Mental Health Plans">
      <CorporatePlansContent />
    </MainLayout>
  );
};

export default CorporatePlans;
