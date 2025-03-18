
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Hosting from "./pages/Hosting";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

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
          path="/admin" 
          element={
            <PageTransition>
              <Admin />
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
