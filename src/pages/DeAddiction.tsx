
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const DeAddiction = () => {
  useEffect(() => {
    document.title = "De-addiction Services | MeantToHelp";
  }, []);

  return (
    <MainLayout title="De-addiction Services">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">De-addiction Support Services</h1>
            <p className="text-lg text-muted-foreground">
              Compassionate support for those looking to break free from addiction and reclaim their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Our Approach to Recovery</h2>
              <p className="mb-4">
                Our holistic de-addiction program addresses the physical, emotional, and psychological aspects of addiction recovery. We believe in treating the whole person, not just the addiction.
              </p>
              <p>
                With evidence-based treatment methods and personalized care plans, we provide the support needed at every stage of the recovery journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Types of Addiction We Support</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Substance abuse and chemical dependencies</li>
                <li>Alcohol addiction</li>
                <li>Gaming and internet addiction</li>
                <li>Gambling addiction</li>
                <li>Other behavioral addictions</li>
              </ul>
            </div>
          </div>

          <div className="bg-meant-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Recovery Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Outpatient Programs</h3>
                <p>Flexible treatment options that allow you to maintain your daily responsibilities while receiving the support you need.</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Intensive Counseling</h3>
                <p>One-on-one sessions with addiction specialists who provide personalized guidance through your recovery journey.</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Group Therapy</h3>
                <p>Connect with others facing similar challenges in a supportive environment facilitated by experienced counselors.</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Take the First Step?</h2>
            <p className="mb-6">
              Recovery begins with reaching out. Our compassionate team is here to guide you through the process with dignity and respect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-meant-600 hover:bg-meant-700 text-white px-6 py-3 rounded-md font-medium">
                Contact Us
              </a>
              <a href="/services?category=addiction" className="border border-meant-600 text-meant-600 hover:bg-meant-50 px-6 py-3 rounded-md font-medium">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DeAddiction;
