import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <ScrollToTop />
      <Toast />
      <CartDrawer />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/collections/:slug" element={<PageTransition><CollectionPage /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/order-success" element={<PageTransition><OrderSuccessPage /></PageTransition>} />
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
