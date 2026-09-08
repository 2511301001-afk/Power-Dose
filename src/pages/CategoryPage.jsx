import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import DoseBar from '../components/DoseBar';

export default function CategoryPage() {
  const { addToCart, searchQuery, setSearchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = selectedCategory === 'ALL' || prod.category === selectedCategory;
    const matchesPrice = prod.price <= maxPrice;
    const matchesBrand = selectedBrand === 'ALL' || prod.brand === selectedBrand;
    const matchesSearch = searchQuery === '' ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesBrand && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* Header Banner */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
        <div className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
          POWERDOSE FORMULARY
        </div>
        <h1 className="font-display" style={{ fontSize: '3rem', color: '#fff' }}>
          SUPPLEMENT CATALOG
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          High-potency clinical nutrition. Filter by goal, dose intensity, and formula type.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem' }}>
        {/* Sidebar Filters */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Search Box */}
          <div className="card-surface" style={{ padding: '1.25rem' }}>
            <div className="font-display" style={{ fontSize: '1rem', color: 'var(--primary-yellow)', marginBottom: '0.75rem' }}>
              SEARCH PRODUCTS
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Category Filter */}
          <div className="card-surface" style={{ padding: '1.25rem' }}>
            <div className="font-display" style={{ fontSize: '1rem', color: 'var(--primary-yellow)', marginBottom: '0.75rem' }}>
              CATEGORY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['ALL', ...CATEGORIES.map(c => c.name)].map(cat => (
                <label
                  key={cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    color: selectedCategory === cat ? 'var(--primary-yellow)' : 'var(--text-main)',
                    fontWeight: selectedCategory === cat ? 800 : 400
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    style={{ accentColor: 'var(--primary-yellow)' }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="card-surface" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="font-display" style={{ fontSize: '1rem', color: 'var(--primary-yellow)' }}>MAX PRICE</span>
              <span style={{ fontWeight: 800, color: '#fff' }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-yellow)', cursor: 'pointer' }}
            />
          </div>

          {/* Brand Filter */}
          <div className="card-surface" style={{ padding: '1.25rem' }}>
            <div className="font-display" style={{ fontSize: '1rem', color: 'var(--primary-yellow)', marginBottom: '0.75rem' }}>
              LAB / BRAND
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['ALL', 'PowerDose Labs', 'Titan Series', 'Vital Shield', 'PowerDose Gear'].map(b => (
                <label
                  key={b}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    color: selectedBrand === b ? 'var(--primary-yellow)' : 'var(--text-main)'
                  }}
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === b}
                    onChange={() => setSelectedBrand(b)}
                    style={{ accentColor: 'var(--primary-yellow)' }}
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setMaxPrice(100);
              setSelectedBrand('ALL');
              setSearchQuery('');
            }}
            className="btn-outline"
            style={{ width: '100%' }}
          >
            RESET FILTERS
          </button>
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Control Bar */}
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg-container)',
              padding: '0.85rem 1.25rem',
              border: '1px solid var(--border-dark)',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              SHOWING <strong style={{ color: 'var(--primary-yellow)' }}>{filteredProducts.length}</strong> FORMULAS
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? 'var(--primary-yellow)' : 'transparent',
                  color: viewMode === 'grid' ? '#0c0f0f' : 'var(--text-muted)',
                  border: '1px solid #2a2a2a',
                  padding: '0.4rem 0.6rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  grid_view
                </span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  background: viewMode === 'list' ? 'var(--primary-yellow)' : 'transparent',
                  color: viewMode === 'list' ? '#0c0f0f' : 'var(--text-muted)',
                  border: '1px solid #2a2a2a',
                  padding: '0.4rem 0.6rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  view_list
                </span>
              </button>
            </div>
          </div>

          {/* Product Grid / List */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--bg-container)', border: '1px solid #2a2a2a' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#333' }}>
                search_off
              </span>
              <div className="font-display" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                NO FORMULAS MATCH YOUR CRITERIA
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredProducts.map(prod => (
                <div key={prod.id} className="card-surface" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', backgroundColor: '#0c0f0f', marginBottom: '1rem', overflow: 'hidden' }}>
                    <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge-yellow" style={{ position: 'absolute', top: '8px', left: '8px' }}>
                      {prod.badge}
                    </span>
                  </div>

                  <div className="font-display" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.2rem' }}>
                    {prod.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    {prod.subtitle}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <DoseBar level={prod.doseIntensity} label="INTENSITY SCORE" />
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #2a2a2a' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--primary-yellow)' }}>
                      ${prod.price}
                    </div>
                    <button onClick={() => addToCart(prod)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      + ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredProducts.map(prod => (
                <div key={prod.id} className="card-surface" style={{ padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '120px', height: '120px', objectFit: 'cover', border: '1px solid #2a2a2a' }} />
                  <div style={{ flex: 1 }}>
                    <span className="badge-yellow" style={{ marginBottom: '0.4rem' }}>{prod.badge}</span>
                    <div className="font-display" style={{ fontSize: '1.4rem', color: '#fff' }}>{prod.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{prod.description}</div>
                    <div style={{ maxWidth: '240px' }}><DoseBar level={prod.doseIntensity} /></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary-yellow)' }}>${prod.price}</div>
                    <button onClick={() => addToCart(prod)} className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>+ ADD TO CART</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
