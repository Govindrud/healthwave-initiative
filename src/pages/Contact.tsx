
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Contact from '@/components/Contact';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us | MeantToHelp";
    window.scrollTo(0, 0);
    console.log("Contact page rendered");
  }, []);

  return (
    <MainLayout title="Contact Us | MeantToHelp" description="Get in touch with our mental health support team">
      <div className="pt-10">
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
