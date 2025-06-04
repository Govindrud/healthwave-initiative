
import React from 'react';
import Logo from '../Logo';

const CompanyInfo = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Logo Section */}
      <div className="p-6 bg-gradient-to-br from-white/15 to-white/5 rounded-xl backdrop-blur-md border-2 border-white/30 shadow-xl">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-white/20 rounded-full border-2 border-white/40">
              <Logo size="lg" variant="full" className="text-white scale-125" />
            </div>
          </div>
          <div className="text-white font-semibold text-lg mb-2">MeantToHelp</div>
          <div className="text-meant-200 text-sm">Mental Health Solutions</div>
        </div>
      </div>
      
      <p className="text-meant-200 text-sm leading-relaxed">
        Empowering individuals through innovative mental health solutions. 
        Our mission is to make mental wellness accessible to everyone.
      </p>
      
      <div className="flex justify-center space-x-4">
        <a href="#" className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors hover:scale-110 transform">
          <span className="text-sm">f</span>
        </a>
        <a href="#" className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors hover:scale-110 transform">
          <span className="text-sm">t</span>
        </a>
        <a href="#" className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors hover:scale-110 transform">
          <span className="text-sm">in</span>
        </a>
      </div>
    </div>
  );
};

export default CompanyInfo;
