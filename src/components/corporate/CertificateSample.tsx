
import React from "react";
import { CertificationLogo } from "./CertificationLogo";
import { Award, Building, Calendar, Shield, CheckCircle } from "lucide-react";

export const CertificateSample = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-meant-50/50 blur-xl rounded-lg transform -rotate-3"></div>
      
      <div className="max-w-xl mx-auto border-8 border-gradient-to-r from-meant-100 to-meant-200 p-8 bg-white shadow-xl relative transform hover:rotate-0 transition-all duration-500 rounded-sm" 
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
          backgroundBlendMode: "overlay",
          transform: "rotate(-1deg)" 
        }}>
        <div className="absolute top-2 right-2 opacity-10">
          <CertificationLogo size="lg" />
        </div>
        
        <div className="text-center mb-6 border-b-2 border-meant-200 pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CertificationLogo size="md" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-meant-800 tracking-wide">STRESS-FREE ORGANIZATION</h2>
          <p className="text-lg text-meant-600">CERTIFICATION OF EXCELLENCE</p>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-lg">This certifies that</p>
          <h3 className="text-3xl font-serif my-3 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-meant-700 to-meant-900">Blissful Workspace Inc.</h3>
          <p className="text-lg">has been evaluated and recognized as a</p>
          <h4 className="text-xl font-bold text-meant-700 my-3 tracking-wider">STRESS-FREE CERTIFIED ORGANIZATION</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            This organization has demonstrated outstanding commitment to employee wellness,
            work-life balance, and creating a positive, stress-free work environment.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm text-center my-6">
          {[
            { score: "98%", label: "Employee Satisfaction" },
            { score: "A+", label: "Workplace Environment" },
            { score: "95%", label: "Work-Life Balance" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-2 border-meant-300 flex items-center justify-center text-meant-700 mb-1 font-bold text-xl">
                {item.score}
              </div>
              <p className="text-xs text-meant-600">{item.label}</p>
            </div>
          ))}
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
            <div className="w-32 h-12 mx-auto mb-1 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 30" width="100%" height="100%">
                  <path d="M10,20 Q25,5 40,20 T70,20" stroke="#6E59A5" fill="transparent" strokeWidth="2"/>
                  <text x="25" y="10" fontFamily="cursive" fontSize="12" fill="#6E59A5">Sarah Johnson</text>
                </svg>
              </div>
            </div>
            <p className="text-xs">Dr. Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Chief Wellness Officer</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-meant-50 to-meant-100 flex items-center justify-center border-2 border-meant-300 mb-1">
              <Shield className="h-10 w-10 text-meant-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs">Official Seal</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-12 mx-auto mb-1 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 30" width="100%" height="100%">
                  <path d="M15,15 Q30,25 50,10 T85,15" stroke="#6E59A5" fill="transparent" strokeWidth="2"/>
                  <text x="32" y="25" fontFamily="cursive" fontSize="12" fill="#6E59A5">M. Williams</text>
                </svg>
              </div>
            </div>
            <p className="text-xs">Mark Williams</p>
            <p className="text-xs text-muted-foreground">Director of Certification</p>
          </div>
        </div>
        
        {/* Hologram effect */}
        <div className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-gradient-to-r from-blue-300 via-meant-300 to-purple-300 opacity-60 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <CheckCircle className="h-6 w-6 text-white absolute inset-0 m-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
