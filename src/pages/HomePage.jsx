import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import DoseBar from '../components/DoseBar';

export default function HomePage() {
  const { setActiveTab, addToCart, showToast } = useApp();

  return (
    <div style={{ minHeight: '100vh' }} className="animate-fade-in">
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0c0f0f',
          borderBottom: '2px solid var(--border-dark)',
          overflow: 'hidden',
          padding: '4rem 1.5rem'
        }}
      >
        {/* Background Image with Dark Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(90deg, #0c0f0f 20%, rgba(12, 15, 15, 0.7) 60%, rgba(12, 15, 15, 0.3) 100%), url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.85
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
            zIndex: 2
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <div className="badge-yellow" style={{ marginBottom: '1.5rem' }}>
              ⚡ NEW GENERATION FORMULAS RELEASED
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                lineHeight: 0.95,
                color: '#ffffff',
                marginBottom: '1.5rem',
                textShadow: '0 0 20px rgba(0,0,0,0.8)'
              }}
            >
              FUEL YOUR <span style={{ color: 'var(--primary-yellow)' }}>STRENGTH.</span>
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-main)',
                marginBottom: '2.5rem',
                maxWidth: '600px',
                lineHeight: 1.6
              }}
            >
              Pharmaceutical-grade sports nutrition designed for athletes who demand maximum output, rapid hypertrophy, and unyielding recovery.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('shop')}
                className="btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}
              >
                SHOP NOW →
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className="btn-secondary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}
              >
                VIEW MEGA OFFERS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section style={{ maxWidth: '1280px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <div className="font-display" style={{ fontSize: '2.2rem', color: '#fff' }}>
              SHOP BY CATEGORY
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Engineered formulas for targeted physiological results
            </div>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="btn-outline"
            style={{ fontSize: '0.9rem' }}
          >
            VIEW ALL CATEGORIES →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.name}
              onClick={() => setActiveTab('shop')}
              className="card-surface"
              style={{
                position: 'relative',
                height: '240px',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `linear-gradient(0deg, #0c0f0f 20%, transparent 80%), url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={e => (e.target.style.transform = 'scale(1.08)')}
                onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="font-display" style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1 }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-yellow)', fontWeight: 700, marginTop: '0.25rem' }}>
                  {cat.count} PRODUCTS
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel / Grid */}
      <section style={{ maxWidth: '1280px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <div className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
              POPULAR FORMULAS
            </div>
            <div className="font-display" style={{ fontSize: '2.5rem', color: '#fff' }}>
              BEST SELLERS & STACKS
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {PRODUCTS.slice(0, 3).map(prod => (
            <div key={prod.id} className="card-surface" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '220px', backgroundColor: '#0c0f0f', marginBottom: '1.25rem', overflow: 'hidden' }}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge-yellow" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {prod.badge}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#0c0f0f',
                    color: 'var(--primary-yellow)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    border: '1px solid #2a2a2a'
                  }}
                >
                  ★ {prod.rating}
                </span>
              </div>

              <div className="font-display" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.25rem' }}>
                {prod.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {prod.subtitle}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <DoseBar level={prod.doseIntensity} label="INTENSITY LEVEL" />
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #2a2a2a' }}>
                <div>
                  <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--primary-yellow)' }}>
                    ${prod.price}
                  </span>
                  {prod.originalPrice && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                      ${prod.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}
                >
                  + ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Science & Performance Banner */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '6rem auto 0',
          padding: '3rem 2rem',
          backgroundColor: 'var(--bg-container)',
          border: '2px solid var(--primary-yellow)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}
      >
        <div>
          <div className="badge-yellow" style={{ marginBottom: '1rem' }}>
            NEUROLOGICAL & ANABOLIC INTEGRATION
          </div>
          <h2 className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1rem' }}>
            POWERED BY CLINICAL DOSES & ZERO FILLERS
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Every batch of PowerDose is subjected to rigorous HPLC testing to guarantee 100% label accuracy. No proprietary blends, no hidden under-dosed ingredients.
          </p>
          <button
            onClick={() => setActiveTab('explore')}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.75rem' }}
          >
            READ THE SCIENCE HUB →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { val: '30G', label: 'PURE PROTEIN PER SCOOP' },
            { val: '400MG', label: 'NEURO FOCUS CAFFEINE' },
            { val: '0G', label: 'ADDED SUGAR / ZERO FILLER' },
            { val: '100%', label: 'LABEL TRANSPARENCY' }
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#0c0f0f', padding: '1.5rem', border: '1px solid #2a2a2a' }}>
              <div className="font-display" style={{ fontSize: '2.2rem', color: 'var(--primary-yellow)' }}>
                {stat.val}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
