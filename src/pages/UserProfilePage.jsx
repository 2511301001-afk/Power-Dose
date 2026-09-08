import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DoseBar from '../components/DoseBar';

export default function UserProfilePage() {
  const { user, isConnected, setIsConnected, showToast, setActiveTab } = useApp();
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  const handleSaveProfile = e => {
    e.preventDefault();
    setEditing(false);
    showToast('PROFILE UPDATED', 'Your athlete profile details were saved.');
  };

  if (!isConnected) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '3rem 2rem', textAlign: 'center' }} className="card-surface animate-fade-in">
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--primary-yellow)' }}>
          lock
        </span>
        <h2 className="font-display" style={{ fontSize: '2rem', marginTop: '1rem', color: '#fff' }}>
          GUEST SESSION ACTIVE
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Connect as Jack Hammer to view your active stack missions, workout intensity meters, and recurring subscriptions.
        </p>
        <button
          onClick={() => setIsConnected(true)}
          className="btn-primary"
          style={{ padding: '0.8rem 2rem' }}
        >
          CONNECT AS JACK HAMMER
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }} className="animate-fade-in">
      {/* User Header Hero */}
      <div
        className="card-surface"
        style={{
          padding: '2.5rem',
          marginBottom: '2.5rem',
          backgroundColor: '#0c0f0f',
          border: '2px solid var(--border-dark)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '2px solid var(--primary-yellow)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 className="font-display" style={{ fontSize: '2.5rem', color: '#fff' }}>
                {userInfo.name}
              </h1>
              <span className="badge-yellow">{userInfo.rank}</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              MEMBER SINCE {userInfo.memberSince} • ATHLETE ID: PD-7719-ELITE
            </div>
          </div>
        </div>

        {/* Intensity Meter Box */}
        <div
          style={{
            backgroundColor: 'var(--bg-container)',
            padding: '1.25rem 2rem',
            border: '1px solid var(--primary-yellow)',
            minWidth: '280px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            <span>MONTHLY INTENSITY</span>
            <span style={{ color: 'var(--primary-yellow)' }}>{userInfo.monthlyIntensity}% TARGET</span>
          </div>
          <DoseBar level={9} max={10} label="" />
        </div>
      </div>

      {/* Grid: Active Mission & Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Active Mission Card */}
        <div className="card-surface" style={{ padding: '1.75rem', border: '2px solid var(--primary-yellow)' }}>
          <div className="badge-yellow" style={{ marginBottom: '0.75rem' }}>
            ACTIVE MISSION LOG
          </div>
          <div className="font-display" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
            MISSION: {userInfo.activeMission.orderId}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--primary-yellow)', fontWeight: 800, marginBottom: '1rem' }}>
            {userInfo.activeMission.status}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            <div>• ESTIMATED DELIVERY: {userInfo.activeMission.estDelivery}</div>
            <div>• ITEMS INCLUDED: {userInfo.activeMission.itemsCount} FORMULAS</div>
            <div>• TOTAL PAID: ${userInfo.activeMission.totalAmount}</div>
          </div>

          <button onClick={() => setActiveTab('checkout')} className="btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
            TRACK SPEED EXPRESS SHIPMENT →
          </button>
        </div>

        {/* Stats Summary */}
        <div className="card-surface" style={{ padding: '1.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'TOTAL ORDERS', val: userInfo.stats.totalOrders },
            { label: 'STACK POINTS', val: userInfo.stats.stackPoints },
            { label: 'WORKOUTS LOGGED', val: userInfo.stats.workoutsCompleted },
            { label: 'INTENSITY SCORE', val: userInfo.stats.intensityScore }
          ].map((st, idx) => (
            <div key={idx} style={{ backgroundColor: '#0c0f0f', padding: '1.25rem', border: '1px solid #2a2a2a' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>{st.label}</div>
              <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--primary-yellow)', marginTop: '0.2rem' }}>
                {st.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions & Past Orders Tabs */}
      <div className="card-surface" style={{ padding: '2rem' }}>
        <div className="font-display" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>
          ACTIVE STACK SUBSCRIPTIONS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {userInfo.subscriptions.map((sub, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#0c0f0f',
                padding: '1.25rem 1.5rem',
                border: '1px solid #2a2a2a',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div className="font-display" style={{ fontSize: '1.2rem', color: '#fff' }}>{sub.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto-replenish: {sub.frequency}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="badge-yellow">{sub.status}</span>
                <span className="font-display" style={{ fontSize: '1.3rem', color: 'var(--primary-yellow)' }}>
                  ${sub.price}
                </span>
                <button
                  onClick={() => showToast('SUBSCRIPTION UPDATED', 'Next delivery paused for 15 days.')}
                  className="btn-outline"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  PAUSE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
