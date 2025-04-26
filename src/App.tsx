
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Doctors from "@/pages/Doctors";
import SpiritualityServices from "@/pages/SpiritualityServices";
import Spirituality from "@/pages/Spirituality";
import BookingConfirmation from "@/pages/BookingConfirmation";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Surender from "@/pages/Surender";
import StudentPsychologists from "@/pages/StudentPsychologists";
import Webinars from "@/pages/Webinars";
import CorporatePlans from "@/pages/CorporatePlans";
import CorporateCertification from "@/pages/CorporateCertification";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import AIVoiceAgent from "@/pages/AIVoiceAgent";
import Services from "@/pages/Services";
import WhatsAppConfig from "@/pages/WhatsAppConfig";
import Adventures from "@/pages/Adventures";
import Games from "@/pages/Games";
import Activities from "@/pages/Activities";
import DeAddiction from "@/pages/DeAddiction";
import EaseOfLiving from "@/pages/EaseOfLiving";
import AdminDashboard from "./pages/AdminDashboard";
import AngerManagement from "@/pages/AngerManagement";
import { AIProvider } from "@/providers/AIProvider";
import AdminLogin from "@/pages/AdminLogin";
import Admin from "@/pages/Admin";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { RegionProvider } from "@/context/RegionContext";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import ProductDetail from "@/pages/ProductDetail";
import RehabilitationConfirmation from "@/pages/RehabilitationConfirmation";

function App() {
  return (
    <RegionProvider>
      <AIProvider>
        <AuthProvider>
          <Router>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/spirituality" element={<Spirituality />} />
              <Route path="/spirituality-services" element={<SpiritualityServices />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/surender" element={<Surender />} />
              <Route path="/rehabilitation-confirmation" element={<RehabilitationConfirmation />} />
              <Route path="/student-psychologists" element={<StudentPsychologists />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/corporate-plans" element={<CorporatePlans />} />
              <Route path="/corporate-certification" element={<CorporateCertification />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/services" element={<Services />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/adventures" element={<Adventures />} />
              <Route path="/games" element={<Games />} />
              <Route path="/ai-voice-agent" element={<AIVoiceAgent />} />
              <Route path="/whatsapp-config" element={<WhatsAppConfig />} />
              <Route path="/de-addiction" element={<DeAddiction />} />
              <Route path="/ease-of-living" element={<EaseOfLiving />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/anger-management" element={<AngerManagement />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="*" element={<Index />} />
            </Routes>
          </Router>
        </AuthProvider>
      </AIProvider>
    </RegionProvider>
  );
}

export default App;
