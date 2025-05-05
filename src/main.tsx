
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/service-page.css';
import ErrorBoundary from './components/ErrorBoundary';

// Clear any existing service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  }).catch(error => {
    console.error('Failed to unregister service workers:', error);
  });
}

// Add error handling for global errors with more detailed logging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  console.error('Error message:', event.message);
  console.error('Error source:', event.filename, 'Line:', event.lineno, 'Column:', event.colno);
  
  // Prevent the error from breaking the entire app if possible
  // Only prevent default for non-critical errors
  if (event.error && !event.error.toString().includes('ChunkLoadError')) {
    event.preventDefault();
  }
});

// Create a custom error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  
  // Prevent the error from breaking the entire app if possible
  if (event.reason && !event.reason.toString().includes('ChunkLoadError')) {
    event.preventDefault();
  }
});

// Add detailed performance monitoring
console.log('Starting app initialization at:', new Date().toISOString());
const renderStart = performance.now();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Add diagnostic logging to help identify render issues
const renderEnd = performance.now();
console.log(`Main application rendered successfully in ${(renderEnd - renderStart).toFixed(2)}ms`);
console.log('App initialization complete at:', new Date().toISOString());
