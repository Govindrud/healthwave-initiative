
import { useEffect } from "react";
import StudentListing from "@/components/students/StudentListing";
import MainLayout from "@/components/layouts/MainLayout";
import "@/styles/service-page.css";

const StudentPsychologists = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Student Psychologists";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Student Psychologists">
      <div className="service-header">
        <div className="container mx-auto px-4">
          <h1 className="service-title text-3xl md:text-4xl font-bold">Student Psychologists</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Get quality mental health support at affordable rates while helping psychology students gain valuable experience.
            All sessions are supervised by licensed professionals.
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-meant-50 to-white pt-6 pb-12">
        <StudentListing />
      </div>
    </MainLayout>
  );
};

export default StudentPsychologists;
