
import { useEffect } from "react";
import WebinarListing from "@/components/webinars/WebinarListing";
import MainLayout from "@/components/layouts/MainLayout";

const Webinars = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Mental Health Webinars";
  }, []);

  return (
    <MainLayout title="Mental Health Webinars">
      <WebinarListing />
    </MainLayout>
  );
};

export default Webinars;
