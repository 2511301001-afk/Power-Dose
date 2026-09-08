import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { OFFERS, PRODUCTS } from '../data/mockData';

export default function OfferPage() {
  const { addToCart, applyPromoCode, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);

  // Simple countdown ticker simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = code => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* Header Banner */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#0c0f0f',
          border: '2px solid var(--primary-yellow)',
          padding: '3rem 2rem',
          marginBottom: '3.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}
      >
        <div>
          <div className="badge-yellow" style={{ marginBottom: '0.75rem' }}>
            🔥 LIMITED QUANTITY FLASH DROPS
          </div>
          <h1 className="font-display" style={{ fontSize: '3.5rem', lineHeight: 1, color: '#fff' }}>
            MEGA DEALS & BUNDLES
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Unlock up to 35% discount on high-intensity stacks. Limited stock available.
          </p>
        </div>

        {/* Countdown Timer */}
        <div style={{ backgroundColor: 'var(--bg-container)', padding: '1.25rem 2rem', border: '1px solid #2a2a2a', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            FLASH SALE ENDS IN
          </div>
          <div className="font-display" style={{ fontSize: '2.2rem', color: 'var(--primary-yellow)', letterSpacing: '0.05em' }}>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Offers & Bundles Cards */}
      <div className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>
        EXCLUSIVE HYPER BUNDLES
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        {OFFERS.map(offer => (
          <div
            key={offer.id}
            className="card-surface"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '2px solid #2a2a2a' }}
          >
            <div style={{ position: 'relative', height: '220px', backgroundColor: '#0c0f0f', marginBottom: '1.5rem' }}>
              <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="badge-yellow" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                {offer.badge}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'var(--primary-yellow)',
                  color: '#0c0f0f',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  padding: '0.3rem 0.8rem'
                }}
              >
                {offer.discount}
              </span>
            </div>

            <div className="font-display" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              {offer.title}
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <strong>INCLUDES:</strong>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
                {offer.productsIncluded.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.2rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Promo Code Box */}
            <div
              style={{
                backgroundColor: '#0c0f0f',
                border: '1px dashed var(--primary-yellow)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>PROMO CODE</div>
                <div className="font-display" style={{ fontSize: '1.3rem', color: 'var(--primary-yellow)' }}>
                  {offer.code}
                </div>
              </div>
              <button
                onClick={() => copyCode(offer.code)}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                {copiedCode === offer.code ? '✓ COPIED' : 'COPY CODE'}
              </button>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #2a2a2a' }}>
              <div>
                <span className="font-display" style={{ fontSize: '1.8rem', color: 'var(--primary-yellow)' }}>
                  ${offer.salePrice}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                  ${offer.originalPrice}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(PRODUCTS[0]);
                  addToCart(PRODUCTS[1]);
                  applyPromoCode(offer.code);
                }}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                SELECT BUNDLE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
