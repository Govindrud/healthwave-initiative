
import { useEffect } from "react";
import StudentListing from "@/components/students/StudentListing";
import MainLayout from "@/components/layouts/MainLayout";

const StudentPsychologists = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Student Psychologists";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Student Psychologists">
      <div className="bg-gradient-to-b from-meant-50 to-white pt-6 pb-12">
        <StudentListing />
      </div>
    </MainLayout>
  );
};

export default StudentPsychologists;
