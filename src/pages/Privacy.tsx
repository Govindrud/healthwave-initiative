import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | MeantToHelp";
  }, []);

  return (
    <MainLayout title="Privacy Policy">
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-meant-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, make an appointment, or contact us for support. This may include:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Health-related information you choose to share</li>
                  <li>Payment information for services</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Provide and improve our mental health services</li>
                  <li>Process appointments and payments</li>
                  <li>Communicate with you about your care</li>
                  <li>Send you important updates about our services</li>
                  <li>Ensure the security and integrity of our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>With healthcare providers involved in your care</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and the safety of our users</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Staff training on privacy and security protocols</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct or update your information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. HIPAA Compliance</h2>
                <p>
                  For users in the United States, we comply with the Health Insurance Portability and Accountability Act (HIPAA) to protect your health information. We have implemented appropriate safeguards to ensure the privacy and security of your protected health information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to improve your experience on our platform. You can control cookie settings through your browser preferences. We use cookies to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how our services are used</li>
                  <li>Improve our platform's functionality</li>
                  <li>Provide personalized content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-meant-50 p-4 rounded-lg mt-4">
                  <p><strong>Email:</strong> privacy@meanttohelp.com</p>
                  <p><strong>Phone:</strong> +91 9876 543 210</p>
                  <p><strong>Address:</strong> MeantToHelp Technologies, India</p>
                </div>
              </section>

              <div className="bg-meant-100 p-4 rounded-lg mt-8">
                <p className="text-sm text-center">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;