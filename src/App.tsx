
import React from 'react';
import AppRoutes from '@/routes';
import AppProviders from '@/providers/AppProviders';

const App: React.FC = () => {
  // We'll move the usePageScrolling hook inside AppRoutes where Router is available
  console.log("App component rendered");
  
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
