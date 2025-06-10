
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Products from '@/pages/Products';
import Services from '@/pages/Services';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/spirituality" element={<Spirituality />} />
      <Route path="/ease-of-living" element={<EaseOfLiving />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/corporate-plans" element={<CorporatePlans />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/crisis-helpline" element={<CrisisHelpline />} />
      <Route path="/chat-support" element={<ChatSupport />} />
      <Route path="/investor-pitch" element={<InvestorPitch />} />
      
      {/* Strategic routes */}
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/referrals" element={<Referrals />} />
      <Route path="/assessment" element={<Assessment />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
