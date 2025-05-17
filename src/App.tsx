
import React from 'react';
import AppRoutes from '@/routes';
import AppProviders from '@/providers/AppProviders';
import usePageScrolling from '@/hooks/use-scroll';

const App: React.FC = () => {
  // Use our custom hook that combines scroll behaviors
  usePageScrolling();
  
  console.log("App component rendered");
  
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
