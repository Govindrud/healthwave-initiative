
import React from 'react';
import { Phone, MessageCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const CrisisActionButtons = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 py-8 shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 bg-white/20 rounded-full mb-4">
            <Activity className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Need Immediate Support?</h2>
          <p className="text-white/90 text-lg">We're here to help you 24/7 - You're not alone</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Crisis Helpline */}
          <Link to="/crisis-helpline" className="block group">
            <Button className="w-full h-24 md:h-20 bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 group-hover:border-white/50 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 relative z-10 p-2">
                <div className="p-3 bg-white/20 rounded-full">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 animate-pulse" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-lg md:text-xl">Crisis Helpline</div>
                  <div className="text-sm opacity-90">24/7 Emergency Support</div>
                  <div className="text-xs opacity-75 font-semibold">Call 988</div>
                </div>
              </div>
            </Button>
          </Link>

          {/* Chat Support */}
          <Link to="/chat-support" className="block group">
            <Button className="w-full h-24 md:h-20 bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 group-hover:border-white/50 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 relative z-10 p-2">
                <div className="p-3 bg-white/20 rounded-full">
                  <MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-lg md:text-xl">Chat Support</div>
                  <div className="text-sm opacity-90">Live Help Available</div>
                  <div className="text-xs opacity-75 font-semibold">Start Chat Now</div>
                </div>
              </div>
            </Button>
          </Link>

          {/* Quick Assessment */}
          <Link to="/assessment" className="block group">
            <Button className="w-full h-24 md:h-20 bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 group-hover:border-white/50 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-white/10 to-green-600/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 relative z-10 p-2">
                <div className="p-3 bg-white/20 rounded-full">
                  <Activity className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-lg md:text-xl">Quick Assessment</div>
                  <div className="text-sm opacity-90">Check Your Wellness</div>
                  <div className="text-xs opacity-75 font-semibold">Free 5-min Test</div>
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
