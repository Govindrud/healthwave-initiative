
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Doctors from "@/pages/Doctors";
import SpiritualityServices from "@/pages/SpiritualityServices";
import BookingConfirmation from "@/pages/BookingConfirmation";
import PaymentSuccess from "@/pages/PaymentSuccess";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mean-to-help-theme">
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/spirituality" element={<SpiritualityServices />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
