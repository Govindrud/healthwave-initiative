import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './hooks/useFetch';
import { RegionProvider } from './context/RegionContext';
import { AuthProvider } from './hooks/useAuth';
import { AIProvider } from './providers/AIProvider';
import { Skeleton } from '@/components/ui/skeleton';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Authentication Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyBookings from './pages/MyBookings';

// Lazy load non-critical pages
const Doctors = React.lazy(() => import('./pages/Doctors'));
const Services = React.lazy(() => import('./pages/Services'));
const StudentPsychologists = React.lazy(() => import('./pages/StudentPsychologists'));
const Activities = React.lazy(() => import('./pages/Activities'));
const DeAddiction = React.lazy(() => import('./pages/DeAddiction'));
const Surender = React.lazy(() => import('./pages/Surender'));
const Webinars = React.lazy(() => import('./pages/Webinars'));
const Adventures = React.lazy(() => import('./pages/Adventures'));
const Games = React.lazy(() => import('./pages/Games'));
const EaseOfLiving = React.lazy(() => import('./pages/EaseOfLiving'));
const Spirituality = React.lazy(() => import('./pages/Spirituality'));
const SpiritualityServices = React.lazy(() => import('./pages/SpiritualityServices'));
const AIPersonalAssistant = React.lazy(() => import('./pages/AIPersonalAssistant'));
const AIVoiceAgent = React.lazy(() => import('./pages/AIVoiceAgent'));
const CorporatePlans = React.lazy(() => import('./pages/CorporatePlans'));
const CorporateCertification = React.lazy(() => import('./pages/CorporateCertification'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Partners = React.lazy(() => import('./pages/Partners'));
const PaymentSuccess = React.lazy(() => import('./pages/PaymentSuccess'));
const BookingConfirmation = React.lazy(() => import('./pages/BookingConfirmation'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const WhatsAppServices = React.lazy(() => import('./pages/WhatsAppServices'));

// Loading fallback
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Skeleton className="h-12 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-2" />
    <Skeleton className="h-4 w-4/6" />
  </div>
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <AuthProvider>
          <AIProvider>
            <Router>
              <Toaster position="top-center" richColors />
              <Routes>
                {/* Home route - using Home component directly */}
                <Route path="/" element={<Home />} />
                
                {/* Critical routes - not lazy loaded */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Legacy index page if needed */}
                <Route path="/index" element={<Index />} />
                
                {/* Lazy-loaded routes */}
                <Route path="/forgot-password" element={
                  <Suspense fallback={<PageLoading />}>
                    <ForgotPassword />
                  </Suspense>
                } />
                <Route path="/my-bookings" element={
                  <Suspense fallback={<PageLoading />}>
                    <MyBookings />
                  </Suspense>
                } />
                <Route path="/doctors" element={
                  <Suspense fallback={<PageLoading />}>
                    <Doctors />
                  </Suspense>
                } />
                <Route path="/services" element={
                  <Suspense fallback={<PageLoading />}>
                    <Services />
                  </Suspense>
                } />
                <Route path="/student-psychologists" element={
                  <Suspense fallback={<PageLoading />}>
                    <StudentPsychologists />
                  </Suspense>
                } />
                <Route path="/activities" element={
                  <Suspense fallback={<PageLoading />}>
                    <Activities />
                  </Suspense>
                } />
                <Route path="/de-addiction" element={
                  <Suspense fallback={<PageLoading />}>
                    <DeAddiction />
                  </Suspense>
                } />
                <Route path="/surender" element={
                  <Suspense fallback={<PageLoading />}>
                    <Surender />
                  </Suspense>
                } />
                <Route path="/webinars" element={
                  <Suspense fallback={<PageLoading />}>
                    <Webinars />
                  </Suspense>
                } />
                <Route path="/adventures" element={
                  <Suspense fallback={<PageLoading />}>
                    <Adventures />
                  </Suspense>
                } />
                <Route path="/games" element={
                  <Suspense fallback={<PageLoading />}>
                    <Games />
                  </Suspense>
                } />
                <Route path="/ease-of-living" element={
                  <Suspense fallback={<PageLoading />}>
                    <EaseOfLiving />
                  </Suspense>
                } />
                <Route path="/spirituality" element={
                  <Suspense fallback={<PageLoading />}>
                    <Spirituality />
                  </Suspense>
                } />
                <Route path="/spirituality-services" element={
                  <Suspense fallback={<PageLoading />}>
                    <SpiritualityServices />
                  </Suspense>
                } />
                <Route path="/ai-personal-assistant" element={
                  <Suspense fallback={<PageLoading />}>
                    <AIPersonalAssistant />
                  </Suspense>
                } />
                <Route path="/ai-voice-agent" element={
                  <Suspense fallback={<PageLoading />}>
                    <AIVoiceAgent />
                  </Suspense>
                } />
                <Route path="/corporate-plans" element={
                  <Suspense fallback={<PageLoading />}>
                    <CorporatePlans />
                  </Suspense>
                } />
                <Route path="/corporate-certification" element={
                  <Suspense fallback={<PageLoading />}>
                    <CorporateCertification />
                  </Suspense>
                } />
                <Route path="/products" element={
                  <Suspense fallback={<PageLoading />}>
                    <Products />
                  </Suspense>
                } />
                <Route path="/products/:id" element={
                  <Suspense fallback={<PageLoading />}>
                    <ProductDetails />
                  </Suspense>
                } />
                <Route path="/cart" element={
                  <Suspense fallback={<PageLoading />}>
                    <Cart />
                  </Suspense>
                } />
                <Route path="/partners" element={
                  <Suspense fallback={<PageLoading />}>
                    <Partners />
                  </Suspense>
                } />
                <Route path="/payment-success" element={
                  <Suspense fallback={<PageLoading />}>
                    <PaymentSuccess />
                  </Suspense>
                } />
                <Route path="/booking-confirmation" element={
                  <Suspense fallback={<PageLoading />}>
                    <BookingConfirmation />
                  </Suspense>
                } />
                <Route path="/admin-login" element={
                  <Suspense fallback={<PageLoading />}>
                    <AdminLogin />
                  </Suspense>
                } />
                <Route path="/admin" element={
                  <Suspense fallback={<PageLoading />}>
                    <AdminDashboard />
                  </Suspense>
                } />
                <Route path="/whatsapp-services" element={
                  <Suspense fallback={<PageLoading />}>
                    <WhatsAppServices />
                  </Suspense>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AIProvider>
        </AuthProvider>
      </RegionProvider>
    </QueryClientProvider>
  );
};

export default App;
