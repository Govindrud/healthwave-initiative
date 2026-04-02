
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { FileText, Download, BookOpen, Video, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources & Downloads</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access our comprehensive collection of guides, templates, and resources to support your mental health initiatives and certification journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-card border border-border rounded-lg shadow-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <category.icon className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.type} • {item.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-accent rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Need Custom Resources?</h2>
              <p className="text-muted-foreground mb-6">
                Looking for specific materials tailored to your organization? Our team can create custom resources to meet your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/corporate-certification">Learn About Certification</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                All resources are provided for educational and informational purposes. 
                Please review our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> before downloading.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Resources;
