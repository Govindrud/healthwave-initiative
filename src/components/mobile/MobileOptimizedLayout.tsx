import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCrisisButton, setShowCrisisButton] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show crisis help button on mobile after a delay
    const timer = setTimeout(() => {
      setShowCrisisButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      icon: Phone,
      label: 'Crisis Helpline',
      action: () => window.open('tel:988', '_self'),
      color: 'bg-red-500 hover:bg-red-600',
      urgent: true
    },
    {
      icon: MessageCircle,
      label: 'Chat Support',
      action: () => window.location.href = '/chat-support',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Heart,
      label: 'Quick Assessment',
      action: () => window.location.href = '/assessment',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-meant-100 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-meant-800">MeantToHelp</h1>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
                <nav className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Home
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Services
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    My Account
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Resources
                  </Button>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Crisis Help Button */}
      <AnimatePresence>
        {showCrisisButton && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-20 right-4 z-30"
          >
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              onClick={() => window.open('tel:988', '_self')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Crisis Help
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Quick Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-meant-100 shadow-lg z-30 safe-area-inset-bottom">
        <div className="grid grid-cols-3 gap-1 p-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`flex flex-col items-center gap-1 h-auto py-3 text-white ${action.color}`}
              size="sm"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="fixed bottom-20 right-4 z-30 space-y-2 safe-area-inset-bottom">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-white shadow-lg"
          onClick={() => {
            document.body.style.fontSize = document.body.style.fontSize === '120%' ? '100%' : '120%';
          }}
        >
          A+
        </Button>
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;
