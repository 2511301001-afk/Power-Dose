import React from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    isConnected,
    setIsConnected,
    totalItemsCount,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    user
  } = useApp();

  const navItems = [
    { id: 'home', label: 'HOME', icon: 'bolt' },
    { id: 'shop', label: 'SHOP', icon: 'grid_view' },
    { id: 'explore', label: 'EXPLORE', icon: 'local_fire_department' },
    { id: 'offers', label: 'OFFERS', icon: 'local_offer' },
    { id: 'profile', label: 'PROFILE', icon: 'person' },
    { id: 'admin', label: 'ADMIN PORTAL', icon: 'admin_panel_settings' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#0c0f0f',
        borderBottom: '1px solid var(--border-dark)'
      }}
    >
      {/* Top Banner Alert */}
      <div
        style={{
          backgroundColor: 'var(--primary-yellow)',
          color: '#0c0f0f',
          fontSize: '0.75rem',
          fontWeight: 800,
          textAlign: 'center',
          padding: '0.25rem 1rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        <span>⚡ FREE SPEED EXPRESS SHIPPING ON ORDERS OVER $100</span>
        <span style={{ opacity: 0.6 }}>|</span>
        <span>USE CODE <strong style={{ textDecoration: 'underline' }}>POWER20</strong> FOR 20% OFF</span>
      </div>

      {/* Main Header Bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--primary-yellow)',
              color: '#0c0f0f',
              padding: '0.35rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px', fontWeight: 'bold' }}>
              bolt
            </span>
          </div>
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '1.75rem',
                lineHeight: 1,
                color: '#ffffff',
                letterSpacing: '0.05em'
              }}
            >
              POWER<span style={{ color: 'var(--primary-yellow)' }}>DOSE</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              HIGH PERFORMANCE NUTRITION
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'var(--bg-container-high)' : 'transparent',
                  color: isActive ? 'var(--primary-yellow)' : 'var(--text-main)',
                  border: isActive ? '1px solid var(--primary-yellow)' : '1px solid transparent',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Quick Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="input-field"
              style={{
                width: '180px',
                padding: '0.4rem 0.8rem 0.4rem 2.2rem',
                fontSize: '0.85rem'
              }}
            />
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: 'var(--text-muted)'
              }}
            >
              search
            </span>
          </div>

          {/* User Connection Switcher */}
          <button
            onClick={() => setIsConnected(!isConnected)}
            title={isConnected ? 'Connected as Jack Hammer (Click to switch to Guest)' : 'Guest Mode (Click to connect)'}
            style={{
              background: isConnected ? 'rgba(255, 212, 0, 0.1)' : 'transparent',
              border: isConnected ? '1px solid var(--primary-yellow)' : '1px solid var(--border-dark)',
              color: isConnected ? 'var(--primary-yellow)' : 'var(--text-muted)',
              padding: '0.45rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isConnected ? 'var(--primary-yellow)' : '#666'
              }}
            />
            {isConnected ? 'CONNECTED' : 'GUEST'}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.9rem', position: 'relative' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              shopping_cart
            </span>
            <span>CART</span>
            {totalItemsCount > 0 && (
              <span
                style={{
                  backgroundColor: '#0c0f0f',
                  color: 'var(--primary-yellow)',
                  border: '1px solid var(--primary-yellow)',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginLeft: '0.2rem'
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
