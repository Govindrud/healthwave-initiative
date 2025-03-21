
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Hosting from "./pages/Hosting";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Doctors from "./pages/Doctors";
import StudentPsychologists from "./pages/StudentPsychologists";
import Webinars from "./pages/Webinars";
import Adventures from "./pages/Adventures";
import Games from "./pages/Games";
import CorporatePlans from "./pages/CorporatePlans";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          } 
        />
        <Route 
          path="/admin-login" 
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <PageTransition>
              <ForgotPassword />
            </PageTransition>
          } 
        />
        <Route 
          path="/reset-password/:token" 
          element={
            <PageTransition>
              <ResetPassword />
            </PageTransition>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PageTransition>
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            </PageTransition>
          } 
        />
        <Route 
          path="/hosting" 
          element={
            <PageTransition>
              <Hosting />
            </PageTransition>
          } 
        />
        <Route 
          path="/products" 
          element={
            <PageTransition>
              <Products />
            </PageTransition>
          } 
        />
        <Route 
          path="/products/:productId" 
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          } 
        />
        <Route 
          path="/services" 
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          } 
        />
        <Route 
          path="/doctors" 
          element={
            <PageTransition>
              <Doctors />
            </PageTransition>
          } 
        />
        <Route 
          path="/student-psychologists" 
          element={
            <PageTransition>
              <StudentPsychologists />
            </PageTransition>
          } 
        />
        <Route 
          path="/webinars" 
          element={
            <PageTransition>
              <Webinars />
            </PageTransition>
          } 
        />
        <Route 
          path="/adventures" 
          element={
            <PageTransition>
              <Adventures />
            </PageTransition>
          } 
        />
        <Route 
          path="/games" 
          element={
            <PageTransition>
              <Games />
            </PageTransition>
          } 
        />
        <Route 
          path="/corporate-plans" 
          element={
            <PageTransition>
              <CorporatePlans />
            </PageTransition>
          } 
        />
        <Route 
          path="*" 
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
