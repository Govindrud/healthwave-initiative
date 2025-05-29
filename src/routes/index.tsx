
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Router>
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
        
        {/* Strategic routes */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/referrals" element={<Referrals />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
