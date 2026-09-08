import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    shipping,
    total,
    appliedPromo,
    applyPromoCode,
    clearCart,
    showToast,
    setActiveTab,
    user
  } = useApp();

  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    firstName: 'Jack',
    lastName: 'Hammer',
    email: 'jack.hammer@powerdose.com',
    address: '742 Hyper-G Street, Suite 500',
    city: 'Austin',
    zip: '78701',
    paymentMethod: 'credit_card'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const handlePlaceOrder = e => {
    e.preventDefault();
    const newId = '#PD-' + Math.floor(1000 + Math.random() * 9000) + '-X';
    setConfirmedOrderId(newId);
    setOrderConfirmed(true);
    clearCart();
    showToast('ORDER SECURED', `Mission ${newId} dispatched to Speed Express.`);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* Header Banner */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
        <div className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
          256-BIT ENCRYPTED CHECKOUT
        </div>
        <h1 className="font-display" style={{ fontSize: '3rem', color: '#fff' }}>
          SECURE CHECKOUT
        </h1>
      </div>

      {orderConfirmed ? (
        /* Order Confirmed View */
        <div
          className="card-surface"
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '2px solid var(--primary-yellow)'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--primary-yellow)',
              color: '#0c0f0f',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '48px', fontWeight: 'bold' }}>
              check_circle
            </span>
          </div>

          <div className="badge-yellow" style={{ marginBottom: '0.75rem' }}>
            ORDER DISPATCH CONFIRMED
          </div>
          <h2 className="font-display" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem' }}>
            MISSION SECURED: {confirmedOrderId}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your high-performance power stack has been queued for immediate Speed Express dispatch. Estimated arrival: Tomorrow by 2:00 PM.
          </p>

          {/* Tracking Progress */}
          <div style={{ backgroundColor: '#0c0f0f', padding: '1.5rem', border: '1px solid #2a2a2a', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-yellow)', marginBottom: '0.75rem' }}>
              <span>STATUS: DISPATCH IN PROGRESS</span>
              <span>TRACKING ID: SPEED-8920-TX</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--primary-yellow)' }} />
              <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--primary-yellow)' }} />
              <div style={{ flex: 1, height: '8px', backgroundColor: '#2a2a2a' }} />
              <div style={{ flex: 1, height: '8px', backgroundColor: '#2a2a2a' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveTab('profile')} className="btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
              VIEW PROFILE & TRACKING →
            </button>
            <button onClick={() => setActiveTab('shop')} className="btn-secondary" style={{ padding: '0.8rem 1.75rem' }}>
              RETURN TO SHOP
            </button>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#444' }}>
            shopping_cart
          </span>
          <div className="font-display" style={{ fontSize: '1.8rem', marginTop: '1rem' }}>
            YOUR CART IS EMPTY
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Please add products to your cart before proceeding to checkout.
          </p>
          <button onClick={() => setActiveTab('shop')} className="btn-primary">
            GO TO CATALOG →
          </button>
        </div>
      ) : (
        /* Standard 2-Column Checkout Layout */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Left Column: Form Details */}
          <div>
            {/* Step 1: Shipping Details */}
            <div className="card-surface" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
              <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--primary-yellow)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">local_shipping</span>
                1. SHIPPING ADDRESS
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>FIRST NAME</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LAST NAME</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ATHLETE EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>STREET ADDRESS</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CITY</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ZIP CODE</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="card-surface" style={{ padding: '1.75rem' }}>
              <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--primary-yellow)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">payments</span>
                2. PAYMENT METHOD
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'credit_card', label: 'CREDIT / DEBIT CARD (VISA / MASTERCARD / AMEX)', icon: 'credit_card' },
                  { id: 'apple_pay', label: 'APPLE PAY / GOOGLE PAY (EXPRESS)', icon: 'account_balance_wallet' },
                  { id: 'crypto', label: 'CRYPTO (USDT / BTC / ETH - 5% EXTRA BONUS)', icon: 'currency_bitcoin' }
                ].map(pay => (
                  <label
                    key={pay.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: formData.paymentMethod === pay.id ? 'rgba(255, 212, 0, 0.1)' : '#0c0f0f',
                      border: formData.paymentMethod === pay.id ? '1px solid var(--primary-yellow)' : '1px solid #2a2a2a',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === pay.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: pay.id })}
                      style={{ accentColor: 'var(--primary-yellow)' }}
                    />
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary-yellow)' }}>
                      {pay.icon}
                    </span>
                    {pay.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="card-surface" style={{ padding: '1.75rem', position: 'sticky', top: '100px' }}>
              <div className="font-display" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>
                ORDER SUMMARY
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.product.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>{item.product.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-yellow)' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary-yellow)' }}>
                    <span>Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontFamily: 'var(--font-display)', borderTop: '1px solid #2a2a2a', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <span>TOTAL</span>
                  <span style={{ color: 'var(--primary-yellow)' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', marginTop: '1.5rem' }}
              >
                PLACE ORDER NOW →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
