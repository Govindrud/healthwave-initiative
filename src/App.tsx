
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/spirituality" element={<Spirituality />} />
        <Route path="/spirituality-new" element={<SpiritualityPage />} />
        <Route path="/corporate-certification" element={<CorporateCertification />} />
        <Route path="/surender" element={<Surender />} />
        <Route path="/de-addiction" element={<DeAddiction />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
