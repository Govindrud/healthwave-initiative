
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
          </Routes>
        </Router>
      </AuthProvider>
    </RegionProvider>
  );
};

export default App;
