import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shipping,
    total,
    appliedPromo,
    applyPromoCode,
    setActiveTab
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        onClick={() => setIsCartOpen(false)}
        style={{ flex: 1, cursor: 'pointer' }}
      />
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#0c0f0f',
          borderLeft: '2px solid var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            backgroundColor: 'var(--bg-container)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-yellow)', fontSize: '24px' }}>
              shopping_cart
            </span>
            <span className="font-display" style={{ fontSize: '1.25rem' }}>
              YOUR POWER STACK ({cart.reduce((a, b) => a + b.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#2a2a2a' }}>
                remove_shopping_cart
              </span>
              <p style={{ marginTop: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                YOUR STACK IS EMPTY
              </p>
              <p style={{ fontSize: '0.875rem' }}>Add supplements from the shop to build your formula.</p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                style={{
                  backgroundColor: 'var(--bg-container)',
                  border: '1px solid var(--border-dark)',
                  padding: '1rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', border: '1px solid #2a2a2a' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: '#fff' }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.product.size || item.product.flavor}
                  </div>
                  <div style={{ color: 'var(--primary-yellow)', fontWeight: 800, marginTop: '0.2rem', fontSize: '0.9rem' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-dark)', background: '#0c0f0f' }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      style={{ background: 'none', border: 'none', color: '#fff', width: '24px', height: '24px', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 0.5rem', fontSize: '0.85rem', fontWeight: 800 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', width: '24px', height: '24px', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Box */}
        {cart.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-dark)', backgroundColor: 'var(--bg-container)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              PROMO CODE
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Try POWER20"
                value={promoInput}
                onChange={e => setPromoInput(e.target.value)}
                className="input-field"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
              />
              <button
                onClick={() => {
                  applyPromoCode(promoInput);
                  setPromoInput('');
                }}
                className="btn-secondary"
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                APPLY
              </button>
            </div>
            {appliedPromo && (
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-yellow)', marginTop: '0.3rem', fontWeight: 700 }}>
                ✓ Promo code {appliedPromo} active!
              </div>
            )}
          </div>
        )}

        {/* Drawer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-dark)', backgroundColor: '#0c0f0f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.3rem', color: 'var(--primary-yellow)' }}>
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', borderTop: '1px solid #2a2a2a', paddingTop: '0.5rem' }}>
              <span>TOTAL</span>
              <span style={{ color: 'var(--primary-yellow)' }}>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setActiveTab('checkout');
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.1rem' }}
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
