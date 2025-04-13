
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import Index from "@/pages/Index";
import MainLayout from "@/components/layouts/MainLayout";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Services from "./pages/Services";
import Hosting from "./pages/Hosting";
import NotFound from "./pages/NotFound";
import SpiritualityPage from "./pages/SpiritualityPage";
import Spirituality from "./pages/Spirituality";
import CorporateCertification from "./pages/CorporateCertification";
import Surender from "./pages/Surender";
import DeAddiction from "./pages/DeAddiction";
import AdminLogin from "./pages/AdminLogin";
import CorporatePlans from "./pages/CorporatePlans";
import Doctors from "./pages/Doctors";
import Adventures from "./pages/Adventures";
import Games from "./pages/Games";
import StudentPsychologists from "./pages/StudentPsychologists";
import Webinars from "./pages/Webinars";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || 
                      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout title="Home"><Index /></MainLayout>} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/spirituality" element={<Spirituality />} />
          <Route path="/spirituality-new" element={<SpiritualityPage />} />
          <Route path="/corporate-certification" element={<CorporateCertification />} />
          <Route path="/corporate-plans" element={<CorporatePlans />} />
          <Route path="/surender" element={<Surender />} />
          <Route path="/de-addiction" element={<DeAddiction />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/games" element={<Games />} />
          <Route path="/student-psychologists" element={<StudentPsychologists />} />
          <Route path="/webinars" element={<Webinars />} />
          
          <Route path="/surrender" element={<Navigate to="/surender" replace />} />
          <Route path="/deaddiction" element={<Navigate to="/de-addiction" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
