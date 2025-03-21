
import { useEffect } from "react";
import StudentListing from "@/components/students/StudentListing";
import MainLayout from "@/components/layouts/MainLayout";

const StudentPsychologists = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Student Psychologists";
  }, []);

  return (
    <MainLayout title="Student Psychologists">
      <StudentListing />
    </MainLayout>
  );
};

export default StudentPsychologists;
