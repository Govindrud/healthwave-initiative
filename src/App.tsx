
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
import Partners from './pages/Partners';
import StudentPsychologists from './pages/StudentPsychologists';
import DeAddiction from './pages/DeAddiction';
import Activities from './pages/Activities';
import Games from './pages/Games';
import Adventures from './pages/Adventures';
import CorporateCertification from './pages/CorporateCertification';
import Spirituality from './pages/Spirituality';
import SpiritualityServices from './pages/SpiritualityServices';
import Webinars from './pages/Webinars';

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
            <Route path="/partners" element={<Partners />} />
            <Route path="/student-psychologists" element={<StudentPsychologists />} />
            <Route path="/de-addiction" element={<DeAddiction />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/games" element={<Games />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/corporate-certification" element={<CorporateCertification />} />
            <Route path="/spirituality" element={<Spirituality />} />
            <Route path="/spirituality-services" element={<SpiritualityServices />} />
            <Route path="/webinars" element={<Webinars />} />
          </Routes>
        </Router>
      </AuthProvider>
    </RegionProvider>
  );
};

export default App;
