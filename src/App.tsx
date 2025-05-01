
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { RegionProvider } from './context/RegionContext';
import { AuthProvider } from './hooks/useAuth';
import { AIProvider } from './providers/AIProvider';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';

// Authentication Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyBookings from './pages/MyBookings';

// Services Pages
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import StudentPsychologists from './pages/StudentPsychologists';
import Activities from './pages/Activities';
import DeAddiction from './pages/DeAddiction';
import Surender from './pages/Surender';
import Webinars from './pages/Webinars';
import Adventures from './pages/Adventures';
import Games from './pages/Games';
import EaseOfLiving from './pages/EaseOfLiving';
import Spirituality from './pages/Spirituality';
import SpiritualityServices from './pages/SpiritualityServices';
import AIPersonalAssistant from './pages/AIPersonalAssistant';
import AIVoiceAgent from './pages/AIVoiceAgent';

// Corporate Pages
import CorporatePlans from './pages/CorporatePlans';
import CorporateCertification from './pages/CorporateCertification';

// Product Pages
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

// Partner Pages
import Partners from './pages/Partners';

// Payment Pages
import PaymentSuccess from './pages/PaymentSuccess';
import BookingConfirmation from './pages/BookingConfirmation';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <RegionProvider>
      <AuthProvider>
        <AIProvider>
          <Router>
            <Toaster position="top-center" richColors />
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/documentation" element={<Documentation />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              
              {/* Service Routes */}
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/services" element={<Services />} />
              <Route path="/student-psychologists" element={<StudentPsychologists />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/de-addiction" element={<DeAddiction />} />
              <Route path="/surender" element={<Surender />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/adventures" element={<Adventures />} />
              <Route path="/games" element={<Games />} />
              <Route path="/ease-of-living" element={<EaseOfLiving />} />
              <Route path="/spirituality" element={<Spirituality />} />
              <Route path="/spirituality-services" element={<SpiritualityServices />} />
              
              {/* AI Routes */}
              <Route path="/ai-personal-assistant" element={<AIPersonalAssistant />} />
              <Route path="/ai-voice-agent" element={<AIVoiceAgent />} />
              
              {/* Corporate Routes */}
              <Route path="/corporate-plans" element={<CorporatePlans />} />
              <Route path="/corporate-certification" element={<CorporateCertification />} />
              
              {/* Product Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Partner Routes */}
              <Route path="/partners" element={<Partners />} />
              
              {/* Payment Routes */}
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              
              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AIProvider>
      </AuthProvider>
    </RegionProvider>
  );
};

export default App;
