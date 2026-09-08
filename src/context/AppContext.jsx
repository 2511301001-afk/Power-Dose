import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS, USER_PROFILE, ADMIN_STATS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isConnected, setIsConnected] = useState(true); // default to connected user state
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Admin Data state
  const [adminOrders, setAdminOrders] = useState(ADMIN_STATS.recentOrders);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('POWER STACK UPDATED', `${product.name} added to your cart.`);
  };

  const removeFromCart = productId => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = code => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'POWER20') {
      setAppliedPromo('POWER20');
      setPromoDiscount(0.20);
      showToast('PROMO APPLIED', '20% Mega Deals Discount Applied!');
      return true;
    } else if (cleanCode === 'ANABOLIC15') {
      setAppliedPromo('ANABOLIC15');
      setPromoDiscount(0.15);
      showToast('PROMO APPLIED', '15% Anabolic Stack Discount Applied!');
      return true;
    } else {
      showToast('INVALID CODE', 'Promo code not recognized or expired.');
      return false;
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const shipping = subtotal > 100 || cart.length === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addAdminOrder = newOrder => {
    setAdminOrders(prev => [newOrder, ...prev]);
    showToast('ADMIN ACTION', `New order ${newOrder.id} created successfully.`);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isConnected,
        setIsConnected,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        subtotal,
        discountAmount,
        shipping,
        total,
        totalItemsCount,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        user: USER_PROFILE,
        adminStats: ADMIN_STATS,
        adminOrders,
        addAdminOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
