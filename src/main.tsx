
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/ui/theme-provider'
import { StrictMode } from 'react'

// Create the root first
const root = createRoot(document.getElementById("root")!);

// Then render the app
root.render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="mean-to-help-theme">
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
