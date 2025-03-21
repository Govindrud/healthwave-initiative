
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentListing from "@/components/students/StudentListing";
import PageTransition from "@/components/PageTransition";

const StudentPsychologists = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Student Psychologists";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <StudentListing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StudentPsychologists;
