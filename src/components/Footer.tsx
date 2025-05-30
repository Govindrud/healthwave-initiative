
import React from 'react';
import { Heart, Brain, Shield, Award } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-meant-800 to-meant-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="lg" variant="full" className="text-white" />
            <p className="text-meant-200 text-sm leading-relaxed">
              Empowering individuals through innovative mental health solutions. 
              Our mission is to make mental wellness accessible to everyone.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="w-8 h-8 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors">
                <span className="text-xs">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors">
                <span className="text-xs">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-meant-700 rounded-full flex items-center justify-center hover:bg-meant-600 transition-colors">
                <span className="text-xs">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-meant-200">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-meant-200">
              <li><a href="#" className="hover:text-white transition-colors">Surender</a></li>
              <li><a href="#" className="hover:text-white transition-colors">De-addiction</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spiritual Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Doctor Consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Psychologists</a></li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Corporate</h3>
            <ul className="space-y-2 text-meant-200">
              <li><a href="#" className="hover:text-white transition-colors">Corporate Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Certification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
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

        {/* Enhanced Bottom Section */}
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

          {/* Improved Made With Love Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-meant-700 to-meant-600 rounded-full px-6 py-3 inline-flex items-center space-x-2 mb-4">
              <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="currentColor" />
              <span className="text-sm font-medium">Made with love for mental wellness</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="currentColor" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-meant-300 text-sm">
              <p>&copy; {currentYear} MeantToHelp. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
