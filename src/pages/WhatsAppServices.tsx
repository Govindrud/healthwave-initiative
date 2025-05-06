
import React from "react";
import Layout from "@/components/Layout";

const WhatsAppServices: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">WhatsApp Services</h1>
        <p className="text-lg mb-8">
          Connect with our mental health professionals through WhatsApp for convenient and accessible support.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Daily Check-ins</h2>
            <p>Regular mental health check-ins delivered straight to your WhatsApp.</p>
            <button className="mt-4 px-4 py-2 bg-meant-600 text-white rounded hover:bg-meant-700">
              Subscribe
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crisis Support</h2>
            <p>Immediate support during difficult moments, available 24/7.</p>
            <button className="mt-4 px-4 py-2 bg-meant-600 text-white rounded hover:bg-meant-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatsAppServices;
