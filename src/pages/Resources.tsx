import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { FileText, Download, BookOpen, Video, Heart, Shield } from 'lucide-react';

const Resources = () => {
  useEffect(() => {
    document.title = "Resources | MeantToHelp";
  }, []);

  const resourceCategories = [
    {
      title: "Certification Guidelines",
      icon: Shield,
      items: [
        { name: "Corporate Stress-Free Certification Guide", type: "PDF", size: "2.3 MB" },
        { name: "Assessment Criteria Checklist", type: "PDF", size: "1.1 MB" },
        { name: "Implementation Timeline Template", type: "DOCX", size: "850 KB" }
      ]
    },
    {
      title: "Mental Health Resources",
      icon: Heart,
      items: [
        { name: "Employee Wellness Program Guide", type: "PDF", size: "3.2 MB" },
        { name: "Stress Management Techniques", type: "PDF", size: "1.8 MB" },
        { name: "Crisis Intervention Protocols", type: "PDF", size: "2.1 MB" }
      ]
    },
    {
      title: "Training Materials",
      icon: BookOpen,
      items: [
        { name: "Manager Training Handbook", type: "PDF", size: "4.5 MB" },
        { name: "Peer Support Training Guide", type: "PDF", size: "2.7 MB" },
        { name: "Wellness Champion Toolkit", type: "ZIP", size: "12.3 MB" }
      ]
    },
    {
      title: "Video Resources",
      icon: Video,
      items: [
        { name: "Introduction to Mental Health at Work", type: "MP4", size: "45 MB" },
        { name: "Creating Psychologically Safe Workplaces", type: "MP4", size: "38 MB" },
        { name: "Recognizing Signs of Burnout", type: "MP4", size: "32 MB" }
      ]
    }
  ];

  return (
    <MainLayout title="Resources">
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-meant-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources & Downloads</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access our comprehensive collection of guides, templates, and resources to support your mental health initiatives and certification journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <category.icon className="h-6 w-6 text-meant-600 mr-3" />
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-meant-300 transition-colors">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.type} • {item.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center space-x-1 text-meant-600 hover:text-meant-700 transition-colors">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-meant-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Need Custom Resources?</h2>
              <p className="text-muted-foreground mb-6">
                Looking for specific materials tailored to your organization? Our team can create custom resources to meet your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-meant-600 hover:bg-meant-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Contact Our Team
                </a>
                <a 
                  href="/corporate-certification" 
                  className="border border-meant-600 text-meant-600 hover:bg-meant-50 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Learn About Certification
                </a>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                All resources are provided for educational and informational purposes. 
                Please review our <a href="/terms" className="text-meant-600 hover:underline">Terms of Service</a> before downloading.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Resources;