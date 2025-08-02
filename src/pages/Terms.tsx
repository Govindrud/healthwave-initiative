import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service | MeantToHelp";
  }, []);

  return (
    <MainLayout title="Terms of Service">
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-meant-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using MeantToHelp's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on MeantToHelp's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on MeantToHelp's website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Medical Disclaimer</h2>
                <p>
                  The information provided through our services is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our services. By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
                <p>
                  You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services. Prohibited behavior includes:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Harassing or mistreating other users or service providers</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Impersonating other persons or entities</li>
                  <li>Interfering with or disrupting the services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
                <p>
                  We strive to keep our services available 24/7, but we cannot guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p>
                  In no event shall MeantToHelp or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MeantToHelp's website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
                <p>
                  MeantToHelp may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-meant-50 p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> legal@meanttohelp.com</p>
                  <p><strong>Phone:</strong> +91 9876 543 210</p>
                  <p><strong>Address:</strong> MeantToHelp Technologies, India</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Terms;