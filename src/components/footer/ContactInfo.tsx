
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Activity } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="border-t border-meant-700 mt-8 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center">
            <span className="text-sm">📍</span>
          </div>
          <div>
            <p className="text-sm font-medium">123 Mental Health Street</p>
            <p className="text-meant-300 text-sm">Wellness City, WC 10001</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center">
            <span className="text-sm">📞</span>
          </div>
          <div>
            <p className="text-sm font-medium">+1 (800) 123-4567</p>
            <p className="text-meant-300 text-sm">24/7 Crisis Support</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-meant-700 rounded-full flex items-center justify-center">
            <span className="text-sm">📧</span>
          </div>
          <div>
            <p className="text-sm font-medium">support@meanttohelp.com</p>
            <p className="text-meant-300 text-sm">Get Help Anytime</p>
          </div>
        </div>
      </div>
      
      {/* Emergency Contact Section - Mobile Optimized */}
      <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 rounded-xl p-4 md:p-6 text-white mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <Activity className="h-6 w-6 animate-pulse mr-2" />
            <h3 className="text-lg font-bold">Crisis Emergency</h3>
          </div>
          <p className="text-sm mb-4">If you're in immediate danger, call 911</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <Link to="/crisis-helpline">Crisis Support</Link>
            </Button>
            <Button 
              asChild
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <a href="tel:988">Call 988</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
