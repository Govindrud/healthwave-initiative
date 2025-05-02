
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const Surender = () => {
  useEffect(() => {
    document.title = "Surender | MeantToHelp";
  }, []);

  return (
    <MainLayout title="Surender - Find Peace">
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-meant-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Surender</h1>
            <p className="text-lg text-muted-foreground">
              Finding peace and professional support to help you let go of stress and anxiety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Peaceful meditation scene" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                fallbackSrc="/images/spirituality-hero.jpg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">The Art of Letting Go</h2>
              <p className="mb-4">
                Surender is about finding the strength to let go of what no longer serves you. It's about making peace with uncertainty and finding calm in the midst of life's challenges.
              </p>
              <p>
                Our approach combines ancient wisdom with modern therapeutic techniques to help you release stress, anxiety, and negative thought patterns that prevent you from living fully.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Surender Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-meant-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Acknowledge</h3>
                <p>Begin by acknowledging your feelings and the struggles you're experiencing without judgment or criticism.</p>
              </div>
              <div className="bg-meant-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Release</h3>
                <p>Learn practical techniques for releasing tension, worry, and the need to control outcomes.</p>
              </div>
              <div className="bg-meant-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Transform</h3>
                <p>Discover how surrendering creates space for new perspectives, peace, and personal growth.</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">How We Can Support You</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Professional Guidance</h3>
                <p>Our experienced therapists and counselors provide compassionate support tailored to your unique journey.</p>
                <a href="/doctors" className="text-meant-600 hover:text-meant-800 mt-3 inline-block font-medium">Meet our professionals →</a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Stress Relief Practices</h3>
                <p>Learn evidence-based techniques for managing stress and cultivating inner peace.</p>
                <a href="/services" className="text-meant-600 hover:text-meant-800 mt-3 inline-block font-medium">View services →</a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Community Support</h3>
                <p>Connect with others on a similar journey in our supportive group sessions.</p>
                <a href="/activities" className="text-meant-600 hover:text-meant-800 mt-3 inline-block font-medium">Join activities →</a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Spiritual Guidance</h3>
                <p>Explore the spiritual dimensions of surrender with our experienced guides.</p>
                <a href="/spirituality" className="text-meant-600 hover:text-meant-800 mt-3 inline-block font-medium">Spiritual services →</a>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Begin Your Journey to Peace</h2>
            <p className="mb-6">
              The path to inner peace begins with a single step. We're here to walk alongside you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-meant-600 hover:bg-meant-700 text-white px-6 py-3 rounded-md font-medium">
                Contact Us
              </a>
              <a href="/booking-confirmation" className="border border-meant-600 text-meant-600 hover:bg-meant-50 px-6 py-3 rounded-md font-medium">
                Book a Session
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Surender;
