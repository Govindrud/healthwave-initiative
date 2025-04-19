
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Doctors from "@/pages/Doctors";
import SpiritualityServices from "@/pages/SpiritualityServices";
import Spirituality from "@/pages/Spirituality"; // Import for spirituality-new route
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
import Activities from "@/pages/Activities"; // Import the new Activities page
import DeAddiction from "@/pages/DeAddiction"; // Import the new DeAddiction page
import { AIProvider } from "@/providers/AIProvider"; // Import AI Provider

function App() {
  return (
    <AIProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/spirituality" element={<SpiritualityServices />} />
          <Route path="/spirituality-new" element={<Spirituality />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/surender" element={<Surender />} />
          <Route path="/student-psychologists" element={<StudentPsychologists />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/corporate-plans" element={<CorporatePlans />} />
          <Route path="/corporate-certification" element={<CorporateCertification />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/services" element={<Services />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/games" element={<Games />} />
          <Route path="/ai-voice-agent" element={<AIVoiceAgent />} />
          <Route path="/whatsapp-config" element={<WhatsAppConfig />} />
          <Route path="/de-addiction" element={<DeAddiction />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </Router>
    </AIProvider>
  );
}

export default App;
