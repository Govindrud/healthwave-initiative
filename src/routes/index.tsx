import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Products from '@/pages/Products';
import Services from '@/pages/Services';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import Doctors from '@/pages/Doctors';
import DoctorDetails from '@/pages/DoctorDetails';
import Spirituality from '@/pages/Spirituality';
import EaseOfLiving from '@/pages/EaseOfLiving';
import NotFound from '@/pages/NotFound';
import PaymentSuccess from '@/pages/PaymentSuccess';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminDoctors from '@/pages/admin/AdminDoctors';
import AdminSpirituality from '@/pages/admin/AdminSpirituality';
import AdminTours from '@/pages/admin/AdminTours';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminContactMessages from '@/pages/admin/AdminContactMessages';
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
        <Route path="/account" element={<Account />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/spirituality" element={<Spirituality />} />
        <Route path="/ease-of-living" element={<EaseOfLiving />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/admin/spirituality" element={<AdminSpirituality />} />
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
        
        {/* Add new strategic routes */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/referrals" element={<Referrals />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
