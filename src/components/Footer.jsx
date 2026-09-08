import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setActiveTab, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = e => {
    e.preventDefault();
    if (!email) return;
    showToast('WELCOME TO POWERDOSE', 'You have been subscribed to VIP athlete offers!');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#0c0f0f',
        borderTop: '2px solid var(--border-dark)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        marginTop: '5rem'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Trust Badges Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-dark)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary-yellow)' }}>
              verified
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>100% LAB TESTED</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HPLC verified purity & potency</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary-yellow)' }}>
              shield
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>ZERO BANNED SUBSTANCES</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>WADA & Informed Choice compliant</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary-yellow)' }}>
              rocket_launch
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>SPEED EXPRESS DISPATCH</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Same day shipping before 3 PM</div>
            </div>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div className="font-display" style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
              POWER<span style={{ color: 'var(--primary-yellow)' }}>DOSE</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
              Engineering raw power, neurological focus, and uncompromised athletic performance. Made for high performers.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['fitness_center', 'sports_score', 'military_tech'].map((ic, i) => (
                <div
                  key={i}
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--bg-container)',
                    border: '1px solid #2a2a2a',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary-yellow)' }}>
                    {ic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="font-display" style={{ fontSize: '1.1rem', color: 'var(--primary-yellow)', marginBottom: '1rem' }}>
              QUICK NAVIGATION
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              {['home', 'shop', 'explore', 'offers', 'profile', 'admin'].map(tab => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => (e.target.style.color = 'var(--primary-yellow)')}
                  onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
                >
                  › {tab.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <div className="font-display" style={{ fontSize: '1.1rem', color: 'var(--primary-yellow)', marginBottom: '1rem' }}>
              SUPPLEMENT FORMULAS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>• Whey Protein Isolates</li>
              <li>• Pre-Workout Igniters</li>
              <li>• Anabolic Mass Gainers</li>
              <li>• Pure Micronized Creatine</li>
              <li>• Athletic Micronutrients</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <div className="font-display" style={{ fontSize: '1.1rem', color: 'var(--primary-yellow)', marginBottom: '1rem' }}>
              POWERDOSE SQUAD
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Subscribe for high-intensity training protocols, flash drops, and exclusive stack discounts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.6rem' }}>
                JOIN THE SQUAD
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div
          style={{
            borderTop: '1px solid var(--border-dark)',
            paddingTop: '1.5rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>© 2026 POWERDOSE NUTRITION INC. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>LAB RESULTS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
