
import React from 'react';
import { Heart, Brain, Shield, Award, Phone, MessageCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-meant-800 to-meant-900 text-white relative">
      {/* Crisis Action Bar - More prominent */}
      <div className="bg-gradient-to-r from-red-600 via-blue-600 to-green-600 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Crisis Helpline */}
            <Link to="/crisis-helpline" className="block">
              <Button className="w-full h-16 bg-red-500 hover:bg-red-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Phone className="h-6 w-6 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Crisis Helpline</div>
                    <div className="text-sm opacity-90">24/7 Emergency Support</div>
                  </div>
                </div>
              </Button>
            </Link>

            {/* Chat Support */}
            <Link to="/chat-support" className="block">
              <Button className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Chat Support</div>
                    <div className="text-sm opacity-90">Live Help Available</div>
                  </div>
                </div>
              </Button>
            </Link>

            {/* Quick Assessment */}
            <Link to="/assessment" className="block">
              <Button className="w-full h-16 bg-green-500 hover:bg-green-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Quick Assessment</div>
                    <div className="text-sm opacity-90">Check Your Wellness</div>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with Enhanced Logo */}
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <Logo size="lg" variant="full" className="text-white mb-2" />
              <div className="text-center">
                <div className="text-xs text-meant-200 opacity-75">Mental Health Solutions</div>
              </div>
            </div>
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
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-meant-200">
              <li><a href="#" className="hover:text-white transition-colors">Surender</a></li>
              <li><a href="#" className="hover:text-white transition-colors">De-addiction</a></li>
              <li><Link to="/spirituality" className="hover:text-white transition-colors">Spiritual Resources</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Doctor Consultations</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Psychologists</a></li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Corporate</h3>
            <ul className="space-y-2 text-meant-200">
              <li><Link to="/corporate-plans" className="hover:text-white transition-colors">Corporate Plans</Link></li>
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
