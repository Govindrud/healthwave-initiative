
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Doctors from "@/pages/Doctors";
import Spirituality from "@/pages/Spirituality";
import Services from "@/pages/Services";
import Surender from "@/pages/Surender";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import Admin from "@/pages/Admin";
import ProtectedRoute from "@/components/ProtectedRoute";
import CorporatePlans from "@/pages/CorporatePlans";
import CorporateCertification from "@/pages/CorporateCertification";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import StudentPsychologists from "@/pages/StudentPsychologists";
import Webinars from "@/pages/Webinars";
import Games from "@/pages/Games";
import Adventures from "@/pages/Adventures";
import DeAddiction from "@/pages/DeAddiction";
import RehabilitationConfirmation from "@/pages/RehabilitationConfirmation";
import HelpResources from "@/pages/HelpResources";
import MainLayout from "@/components/layouts/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster as SonnerToaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
            <Route path="/products/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
            <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
            <Route path="/doctors" element={<MainLayout><Doctors /></MainLayout>} />
            <Route path="/spirituality" element={<MainLayout><Spirituality /></MainLayout>} />
            <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
            <Route path="/surender" element={<MainLayout><Surender /></MainLayout>} />
            <Route path="/rehabilitation-confirmation" element={<MainLayout><RehabilitationConfirmation /></MainLayout>} />
            <Route path="/help-resources" element={<MainLayout><HelpResources /></MainLayout>} />
            <Route path="/corporate-plans" element={<MainLayout><CorporatePlans /></MainLayout>} />
            <Route path="/corporate-certification" element={<MainLayout><CorporateCertification /></MainLayout>} />
            <Route path="/student-psychologists" element={<MainLayout><StudentPsychologists /></MainLayout>} />
            <Route path="/webinars" element={<MainLayout><Webinars /></MainLayout>} />
            <Route path="/games" element={<MainLayout><Games /></MainLayout>} />
            <Route path="/adventures" element={<MainLayout><Adventures /></MainLayout>} />
            <Route path="/de-addiction" element={<MainLayout><DeAddiction /></MainLayout>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route 
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
        <SonnerToaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
