
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Doctors from "./pages/Doctors";
import Games from "./pages/Games";
import Adventures from "./pages/Adventures";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Spirituality from "./pages/Spirituality";
import SpiritualityPage from "./pages/SpiritualityPage";
import Services from "./pages/Services";
import StudentPsychologists from "./pages/StudentPsychologists";
import Surender from "./pages/Surender";
import Webinars from "./pages/Webinars";
import Cart from "./pages/Cart";
import DeAddiction from "./pages/DeAddiction";
import CorporatePlans from "./pages/CorporatePlans";
import CorporateCertification from "./pages/CorporateCertification";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Hosting from "./pages/Hosting";
import DatabaseSetup from "./pages/DatabaseSetup";

// Components
import { Toaster } from "@/components/ui/toaster";

// Utils and Context
import { queryClient } from "@/lib/query-client";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/games" element={<Games />} />
              <Route path="/adventures" element={<Adventures />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/spirituality" element={<Spirituality />} />
              <Route path="/spirituality/:id" element={<SpiritualityPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/student-psychologists" element={<StudentPsychologists />} />
              <Route path="/surender" element={<Surender />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/de-addiction" element={<DeAddiction />} />
              <Route path="/corporate-plans" element={<CorporatePlans />} />
              <Route path="/corporate-certification" element={<CorporateCertification />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/hosting" element={<Hosting />} />
              <Route path="/setup-database" element={<DatabaseSetup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
