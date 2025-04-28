
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { RegionProvider } from './context/RegionContext';
import { AuthProvider } from './hooks/useAuth';

import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import PaymentSuccess from './pages/PaymentSuccess';
import BookingConfirmation from './pages/BookingConfirmation';
import CorporatePlans from './pages/CorporatePlans';
import ForgotPassword from './pages/ForgotPassword';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <RegionProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/corporate-plans" element={<CorporatePlans />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </RegionProvider>
  );
};

export default App;
