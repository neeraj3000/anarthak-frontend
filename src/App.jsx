// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { AuthModal } from './components/auth/AuthModal';

// Views / Separate Route Pages
import { HomeView } from './components/home/HomeView';
import { ShopView } from './components/shop/ShopView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CollectionsView } from './components/collections/CollectionsView';
import { WishlistView } from './components/wishlist/WishlistView';
import { FullCartView } from './components/cart/FullCartView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderConfirmationView } from './components/checkout/OrderConfirmationView';
import { AccountView } from './components/account/AccountView';

// Auto scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/shop" element={<ShopView />} />
          <Route path="/collections" element={<CollectionsView />} />
          <Route path="/collections/:category" element={<CollectionsView />} />
          <Route path="/product/:id" element={<ProductDetailView />} />
          <Route path="/cart" element={<FullCartView />} />
          <Route path="/wishlist" element={<WishlistView />} />
          <Route path="/checkout" element={<CheckoutView />} />
          <Route path="/order-confirmation" element={<OrderConfirmationView />} />
          <Route path="/account" element={<AccountView />} />
          {/* Catch-all fallback route */}
          <Route path="*" element={<HomeView />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals & Tactical Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <SizeGuideModal />
      <AuthModal />
      <ToastContainer />
      <MobileBottomBar />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </StoreProvider>
  );
}
