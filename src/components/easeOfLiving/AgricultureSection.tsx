
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AgricultureSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center mb-16">
      <h2 className="text-2xl font-bold mb-4">Agricultural Connection Programs</h2>
      <p className="text-lg mb-6 max-w-3xl mx-auto">
        Reconnect with nature's wisdom through our agricultural connection programs. 
        From farm visits to urban gardening workshops, we help you build a deeper understanding 
        of sustainable food systems.
      </p>
      <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
        <Link to="/contact">Learn About Farm Connections <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </div>
  );
};

export default AgricultureSection;
