
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
