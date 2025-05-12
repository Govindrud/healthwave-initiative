
import React from 'react';
import AppRoutes from '@/routes';
import AppProviders from '@/providers/AppProviders';

const App: React.FC = () => {
  console.log("App component rendered");
  
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
