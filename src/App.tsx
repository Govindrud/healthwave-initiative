
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
import SpiritualityPageNew from "@/pages/SpiritualityPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout>{<IndexPage />}</MainLayout>} />
          <Route path="products" element={<MainLayout>{<ProductsPage />}</MainLayout>} />
          <Route path="products/:id" element={<MainLayout>{<ProductDetailPage />}</MainLayout>} />
          <Route path="services" element={<MainLayout>{<ServicesPage />}</MainLayout>} />
          <Route path="doctors" element={<MainLayout>{<DoctorsPage />}</MainLayout>} />
          <Route path="spirituality" element={<MainLayout>{<SpiritualityPage />}</MainLayout>} />
          <Route path="spirituality-new" element={<MainLayout>{<SpiritualityPageNew />}</MainLayout>} />
          <Route path="hosting" element={<MainLayout>{<HostingPage />}</MainLayout>} />
          <Route path="cart" element={<MainLayout>{<CartPage />}</MainLayout>} />
          <Route path="webinars" element={<MainLayout>{<WebinarsPage />}</MainLayout>} />
          <Route path="adventures" element={<MainLayout>{<AdventuresPage />}</MainLayout>} />
          <Route path="games" element={<MainLayout>{<GamesPage />}</MainLayout>} />
          <Route path="student-psychologists" element={<MainLayout>{<StudentPsychologistsPage />}</MainLayout>} />
          <Route path="corporate-plans" element={<MainLayout>{<CorporatePlansPage />}</MainLayout>} />
          <Route path="admin-login" element={<MainLayout>{<AdminLoginPage />}</MainLayout>} />
          <Route path="forgot-password" element={<MainLayout>{<ForgotPasswordPage />}</MainLayout>} />
          <Route path="reset-password" element={<MainLayout>{<ResetPasswordPage />}</MainLayout>} />
          <Route path="*" element={<MainLayout>{<NotFoundPage />}</MainLayout>} />
          
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
