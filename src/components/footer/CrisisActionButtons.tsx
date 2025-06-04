
import React from 'react';
import { Phone, MessageCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const CrisisActionButtons = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 py-6 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Need Immediate Support?</h2>
          <p className="text-white/90">We're here to help you 24/7</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Crisis Helpline */}
          <Link to="/crisis-helpline" className="block group">
            <Button className="w-full h-20 bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-3 border-white/30 group-hover:border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-full">
                  <Phone className="h-8 w-8 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Crisis Helpline</div>
                  <div className="text-sm opacity-90">24/7 Emergency Support</div>
                </div>
              </div>
            </Button>
          </Link>

          {/* Chat Support */}
          <Link to="/chat-support" className="block group">
            <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-3 border-white/30 group-hover:border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-full">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Chat Support</div>
                  <div className="text-sm opacity-90">Live Help Available</div>
                </div>
              </div>
            </Button>
          </Link>

          {/* Quick Assessment */}
          <Link to="/assessment" className="block group">
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-3 border-white/30 group-hover:border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-white/10 to-green-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-full">
                  <Activity className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Quick Assessment</div>
                  <div className="text-sm opacity-90">Check Your Wellness</div>
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrisisActionButtons;
