import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ExplorePage from './pages/ExplorePage';
import OfferPage from './pages/OfferPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';

export default function App() {
  const { activeTab, toast, setToast } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <CategoryPage />;
      case 'explore':
        return <ExplorePage />;
      case 'offers':
        return <OfferPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'admin':
        return <AdminPanelPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-surface)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{renderPage()}</main>
      <Footer />
      <CartDrawer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
