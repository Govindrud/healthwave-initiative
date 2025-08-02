
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Shield, Award } from 'lucide-react';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-meant-700 pt-8">
      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
        <div className="flex items-center space-x-2 text-meant-300">
          <Shield className="h-4 w-4" />
          <span className="text-sm">HIPAA Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-meant-300">
          <Award className="h-4 w-4" />
          <span className="text-sm">Licensed Professionals</span>
        </div>
        <div className="flex items-center space-x-2 text-meant-300">
          <Brain className="h-4 w-4" />
          <span className="text-sm">Evidence-Based Care</span>
        </div>
      </div>

      {/* Made With Love Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-meant-700 to-meant-600 rounded-full px-6 py-3 inline-flex items-center space-x-2 mb-4">
          <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="currentColor" />
          <span className="text-sm font-medium">Made with love for mental wellness</span>
          <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="currentColor" />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-meant-300 text-sm">
          <p>&copy; {currentYear} MeantToHelp. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
