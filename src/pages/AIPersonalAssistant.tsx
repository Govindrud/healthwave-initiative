
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import AIPersonalAssistantComponent from '@/components/ai/AIPersonalAssistant';

const AIPersonalAssistantPage = () => {
  useEffect(() => {
    document.title = "AI Personal Assistant | MeantToHelp";
  }, []);

  return (
    <MainLayout title="AI Personal Assistant">
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-meant-800 mb-4">Mental Health AI Assistant</h1>
            <p className="text-lg text-meant-600 max-w-3xl mx-auto">
              Chat with our specialized AI assistant trained to help with mental health concerns.
              Choose from different personas to get the type of support you need.
            </p>
          </div>
          
          <AIPersonalAssistantComponent />
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-meant-700 mb-4">How Our AI Assistant Helps You</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-medium text-meant-800 mb-2">24/7 Support</h4>
                <p className="text-gray-600">Get helpful guidance any time you need it, without waiting for an appointment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-medium text-meant-800 mb-2">Private Conversations</h4>
                <p className="text-gray-600">Share your thoughts in a completely private and judgment-free environment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-medium text-meant-800 mb-2">Personalized Support</h4>
                <p className="text-gray-600">Choose the persona that best matches your needs and preferences.</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              While our AI assistant can provide support and guidance, it is not a replacement for professional mental health care.
              If you're experiencing a crisis, please contact emergency services or a healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AIPersonalAssistantPage;
