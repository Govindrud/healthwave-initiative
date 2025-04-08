
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import IndexPage from "@/pages/Index";
import AdminPage from "@/pages/Admin";
import AdminLoginPage from "@/pages/AdminLogin";
import ProductsPage from "@/pages/Products";
import ProductDetailPage from "@/pages/ProductDetail";
import ServicesPage from "@/pages/Services";
import DoctorsPage from "@/pages/Doctors";
import NotFoundPage from "@/pages/NotFound";
import HostingPage from "@/pages/Hosting";
import CartPage from "@/pages/Cart";
import WebinarsPage from "@/pages/Webinars";
import AdventuresPage from "@/pages/Adventures";
import GamesPage from "@/pages/Games";
import StudentPsychologistsPage from "@/pages/StudentPsychologists";
import CorporatePlansPage from "@/pages/CorporatePlans";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import SpiritualityPage from "@/pages/Spirituality";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="spirituality" element={<SpiritualityPage />} />
            <Route path="hosting" element={<HostingPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="webinars" element={<WebinarsPage />} />
            <Route path="adventures" element={<AdventuresPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="student-psychologists" element={<StudentPsychologistsPage />} />
            <Route path="corporate-plans" element={<CorporatePlansPage />} />
            <Route path="admin-login" element={<AdminLoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AdminPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
