import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminPanelPage() {
  const { adminStats, adminOrders, addAdminOrder, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleCreateOrder = e => {
    e.preventDefault();
    if (!newCustomer || !newItemName || !newAmount) return;

    const orderObj = {
      id: 'PD-' + Math.floor(9922 + Math.random() * 100),
      customer: newCustomer,
      items: newItemName,
      amount: '$' + Number(newAmount).toFixed(2),
      status: 'Processing',
      date: 'Just Now'
    };

    addAdminOrder(orderObj);
    setIsModalOpen(false);
    setNewCustomer('');
    setNewItemName('');
    setNewAmount('');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-dark)',
          paddingBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
            EXECUTIVE CONTROL CENTER
          </div>
          <h1 className="font-display" style={{ fontSize: '3rem', color: '#fff' }}>
            ADMIN PANEL
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => showToast('CSV EXPORT', 'Admin metrics & orders exported to CSV.')}
            className="btn-outline"
          >
            EXPORT CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + CREATE ORDER
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'TOTAL REVENUE', val: adminStats.totalRevenue, sub: adminStats.revenueGrowth + ' vs last month', color: 'var(--primary-yellow)' },
          { label: 'ACTIVE ORDERS', val: adminStats.activeOrders, sub: 'Processing in fulfillment', color: '#fff' },
          { label: 'NEW CUSTOMERS', val: adminStats.newCustomers, sub: 'Registered this month', color: '#fff' },
          { label: 'LOW STOCK ALERTS', val: adminStats.lowStockAlerts, sub: 'Action required', color: '#ff4d4d' }
        ].map((card, i) => (
          <div key={i} className="card-surface" style={{ padding: '1.5rem', border: card.label.includes('STOCK') ? '1px solid #ff4d4d' : '1px solid #2a2a2a' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>{card.label}</div>
            <div className="font-display" style={{ fontSize: '2.2rem', color: card.color, margin: '0.25rem 0' }}>
              {card.val}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Top Movers Table */}
      <div className="card-surface" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <div className="font-display" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>
          TOP MOVERS (PRODUCT PERFORMANCE)
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-dark)', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                <th style={{ padding: '0.75rem' }}>PRODUCT NAME</th>
                <th style={{ padding: '0.75rem' }}>CATEGORY</th>
                <th style={{ padding: '0.75rem' }}>UNITS SOLD</th>
                <th style={{ padding: '0.75rem' }}>REVENUE</th>
                <th style={{ padding: '0.75rem' }}>STOCK</th>
                <th style={{ padding: '0.75rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {adminStats.topMovers.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e2020' }}>
                  <td style={{ padding: '1rem 0.75rem', fontWeight: 700, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)' }}>{row.category}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>{row.sold}</td>
                  <td style={{ padding: '1rem 0.75rem', color: 'var(--primary-yellow)', fontWeight: 800 }}>{row.revenue}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>{row.stock} UNITS</td>
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span className={row.status === 'LOW STOCK' ? 'badge-yellow' : 'badge-yellow'} style={{ borderColor: row.status === 'LOW STOCK' ? '#ff4d4d' : 'var(--primary-yellow)', color: row.status === 'LOW STOCK' ? '#ff4d4d' : 'var(--primary-yellow)' }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card-surface" style={{ padding: '2rem' }}>
        <div className="font-display" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>
          RECENT ORDERS & DISPATCH LOG
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-dark)', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                <th style={{ padding: '0.75rem' }}>ORDER ID</th>
                <th style={{ padding: '0.75rem' }}>CUSTOMER</th>
                <th style={{ padding: '0.75rem' }}>ITEMS</th>
                <th style={{ padding: '0.75rem' }}>AMOUNT</th>
                <th style={{ padding: '0.75rem' }}>STATUS</th>
                <th style={{ padding: '0.75rem' }}>TIME</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.map((ord, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e2020' }}>
                  <td style={{ padding: '1rem 0.75rem', fontWeight: 800, color: 'var(--primary-yellow)' }}>{ord.id}</td>
                  <td style={{ padding: '1rem 0.75rem', color: '#fff' }}>{ord.customer}</td>
                  <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)' }}>{ord.items}</td>
                  <td style={{ padding: '1rem 0.75rem', fontWeight: 700 }}>{ord.amount}</td>
                  <td style={{ padding: '1rem 0.75rem' }}>
                    <span className="badge-yellow">{ord.status}</span>
                  </td>
                  <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)' }}>{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card-surface" style={{ width: '100%', maxWidth: '480px', padding: '2rem', border: '2px solid var(--primary-yellow)' }}>
            <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--primary-yellow)', marginBottom: '1rem' }}>
              CREATE MANUAL ORDER
            </div>
            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CUSTOMER NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Jack Hammer"
                  value={newCustomer}
                  onChange={e => setNewCustomer(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ITEMS ORDERED</label>
                <input
                  type="text"
                  placeholder="e.g. 1x Titanium Whey Isolate"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL AMOUNT ($)</label>
                <input
                  type="number"
                  placeholder="74.99"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline" style={{ flex: 1 }}>
                  CANCEL
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
