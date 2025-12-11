
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Products from '@/pages/Products';
import Services from '@/pages/Services';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Auth from '@/pages/Auth';
import Doctors from '@/pages/Doctors';
import Spirituality from '@/pages/Spirituality';
import EaseOfLiving from '@/pages/EaseOfLiving';
import NotFound from '@/pages/NotFound';
import PaymentSuccess from '@/pages/PaymentSuccess';
import Onboarding from '@/pages/Onboarding';
import Referrals from '@/pages/Referrals';
import Assessment from '@/pages/Assessment';
import Profile from '@/pages/Profile';
import Cart from '@/pages/Cart';
import CorporatePlans from '@/pages/CorporatePlans';
import Partners from '@/pages/Partners';
import MyBookings from '@/pages/MyBookings';
import Settings from '@/pages/Settings';
import Activities from '@/pages/Activities';
import CrisisHelpline from '@/pages/CrisisHelpline';
import ChatSupport from '@/pages/ChatSupport';
import InvestorPitch from '@/pages/InvestorPitch';
import AdminDashboard from '@/pages/AdminDashboard';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Webinars from '@/pages/Webinars';
import StudentPsychologists from '@/pages/StudentPsychologists';
import Adventures from '@/pages/Adventures';
import Games from '@/pages/Games';
import SpiritualityServices from '@/pages/SpiritualityServices';
import ProductDetails from '@/pages/ProductDetails';
import WhatsAppServices from '@/pages/WhatsAppServices';
import Surender from '@/pages/Surender';
import DeAddiction from '@/pages/DeAddiction';
import Documentation from '@/pages/Documentation';
import CorporateCertification from '@/pages/CorporateCertification';
import AIPersonalAssistant from '@/pages/AIPersonalAssistant';
import AIVoiceAgent from '@/pages/AIVoiceAgent';
import AngerManagement from '@/pages/AngerManagement';
import BookingConfirmation from '@/pages/BookingConfirmation';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Resources from '@/pages/Resources';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/webinars" element={<Webinars />} />
      <Route path="/student-psychologists" element={<StudentPsychologists />} />
      <Route path="/adventures" element={<Adventures />} />
      <Route path="/games" element={<Games />} />
      <Route path="/spirituality-services" element={<SpiritualityServices />} />
      <Route path="/whatsapp-services" element={<WhatsAppServices />} />
      <Route path="/surender" element={<Surender />} />
      <Route path="/de-addiction" element={<DeAddiction />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/corporate-certification" element={<CorporateCertification />} />
      <Route path="/ai-personal-assistant" element={<AIPersonalAssistant />} />
      <Route path="/ai-voice-agent" element={<AIVoiceAgent />} />
      <Route path="/anger-management" element={<AngerManagement />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/spirituality" element={<Spirituality />} />
      <Route path="/ease-of-living" element={<EaseOfLiving />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/corporate-plans" element={<CorporatePlans />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/crisis-helpline" element={<CrisisHelpline />} />
      <Route path="/chat-support" element={<ChatSupport />} />
      <Route path="/investor-pitch" element={<InvestorPitch />} />
      
      {/* Protected routes - require authentication */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
      
      {/* Strategic routes - require authentication */}
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
      <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
      
      {/* Admin routes - require admin role */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
