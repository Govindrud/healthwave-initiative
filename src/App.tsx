
import React from 'react';
import AppRoutes from '@/routes';
import AppProviders from '@/providers/AppProviders';

const App: React.FC = () => {
  // We should not use hooks that depend on Router context here
  console.log("App component rendered");
  
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
