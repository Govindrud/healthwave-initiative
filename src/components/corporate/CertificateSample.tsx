
import React from "react";
import { CertificationLogo } from "./CertificationLogo";
import { Award, Building, Calendar } from "lucide-react";

export const CertificateSample = () => {
  return (
    <div className="max-w-xl mx-auto border-8 border-meant-100 p-8 bg-white shadow-xl relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="absolute top-2 right-2 opacity-20">
        <CertificationLogo size="lg" />
      </div>
      
      <div className="text-center mb-6 border-b-2 border-meant-200 pb-4">
        <div className="flex justify-center mb-4">
          <CertificationLogo size="md" />
        </div>
        <h2 className="text-2xl font-bold text-meant-800">STRESS-FREE ORGANIZATION</h2>
        <p className="text-lg text-meant-600">CERTIFICATION OF EXCELLENCE</p>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg">This certifies that</p>
        <h3 className="text-3xl font-serif my-3 font-semibold">Blissful Workspace Inc.</h3>
        <p className="text-lg">has been evaluated and recognized as a</p>
        <h4 className="text-xl font-bold text-meant-700 my-3">STRESS-FREE CERTIFIED ORGANIZATION</h4>
        <p className="text-sm text-muted-foreground">
          This organization has demonstrated outstanding commitment to employee wellness,
          work-life balance, and creating a positive, stress-free work environment.
        </p>
      </div>
      
      <div className="flex justify-between items-center text-sm text-meant-600 mt-8">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Valid until: April 10, 2026</span>
        </div>
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-1" />
          <span>Certificate ID: SF202504-1089</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-meant-200">
        <div className="text-center">
          <div className="w-32 h-12 mx-auto mb-1">
            <img 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" 
              alt="Digital Signature" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs">Dr. Sarah Johnson</p>
          <p className="text-xs text-muted-foreground">Chief Wellness Officer</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-meant-300 flex items-center justify-center text-meant-400 mb-1">
            <Award className="h-10 w-10" />
          </div>
          <p className="text-xs">Official Seal</p>
        </div>
        
        <div className="text-center">
          <div className="w-32 h-12 mx-auto mb-1">
            <img 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" 
              alt="Digital Signature" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs">Mark Williams</p>
          <p className="text-xs text-muted-foreground">Director of Certification</p>
        </div>
      </div>
    </div>
  );
};
