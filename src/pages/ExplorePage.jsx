import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EXPLORE_ARTICLES, PRODUCTS } from '../data/mockData';

export default function ExplorePage() {
  const { addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Training Science', 'Recovery Protocols', 'Supplement Stacks', 'Dietary Tactics'];

  const filteredArticles = EXPLORE_ARTICLES.filter(
    art => activeCategory === 'ALL' || art.category === activeCategory
  );

  const featured = EXPLORE_ARTICLES.find(a => a.featured) || EXPLORE_ARTICLES[0];

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
        <div className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
          SCIENCE & TRAINING HUB
        </div>
        <h1 className="font-display" style={{ fontSize: '3rem', color: '#fff' }}>
          FUEL YOUR FIRE
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Biochemical protocols, CNS arousal tactics, and macro management strategies for hyper-performers.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              backgroundColor: activeCategory === cat ? 'var(--primary-yellow)' : 'var(--bg-container)',
              color: activeCategory === cat ? '#0c0f0f' : 'var(--text-main)',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--primary-yellow)' : 'var(--border-dark)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Featured Article Hero */}
      {featured && (
        <div
          className="card-surface"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            padding: '2rem',
            marginBottom: '4rem',
            border: '2px solid var(--primary-yellow)'
          }}
        >
          <div style={{ position: 'relative', minHeight: '300px', backgroundColor: '#0c0f0f' }}>
            <img
              src={featured.image}
              alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span className="badge-yellow" style={{ position: 'absolute', top: '12px', left: '12px' }}>
              FEATURED PROTOCOL
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-yellow)', fontWeight: 800, marginBottom: '0.5rem' }}>
              {featured.category} • {featured.readTime}
            </div>
            <h2 className="font-display" style={{ fontSize: '2.2rem', lineHeight: 1.1, marginBottom: '1rem', color: '#fff' }}>
              {featured.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {featured.summary}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>
                BY {featured.author}
              </div>
              <button
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', marginLeft: 'auto' }}
                onClick={() => alert(`Opening Protocol: ${featured.title}`)}
              >
                READ FULL PROTOCOL →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="font-display" style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>
        LATEST PERFORMANCE INSIGHTS
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {filteredArticles.map(art => (
          <div key={art.id} className="card-surface" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '180px', backgroundColor: '#0c0f0f', marginBottom: '1rem' }}>
              <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: '#0c0f0f', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', border: '1px solid #2a2a2a' }}>
                {art.readTime}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--primary-yellow)', fontWeight: 800, marginBottom: '0.3rem' }}>
              {art.category}
            </div>
            <div className="font-display" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
              {art.title}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {art.summary}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #2a2a2a' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{art.date}</span>
              <button
                className="btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => alert(`Opening article: ${art.title}`)}
              >
                READ ARTICLE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Stacks Section */}
      <div style={{ backgroundColor: 'var(--bg-container)', border: '1px solid var(--border-dark)', padding: '2rem' }}>
        <div className="font-display" style={{ fontSize: '1.75rem', color: 'var(--primary-yellow)', marginBottom: '1rem' }}>
          RECOMMENDED PROTOCOL STACKS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PRODUCTS.slice(0, 2).map(p => (
            <div key={p.id} style={{ backgroundColor: '#0c0f0f', padding: '1rem', border: '1px solid #2a2a2a', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <div>
                <div className="font-display" style={{ fontSize: '1.1rem' }}>{p.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-yellow)' }}>${p.price}</div>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="btn-primary"
                style={{ marginLeft: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                QUICK ADD
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
