
import React from 'react';

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
    </div>
  );
};

export default ContactInfo;
