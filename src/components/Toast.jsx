import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#0c0f0f',
        border: '2px solid var(--primary-yellow)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 0 20px rgba(255, 212, 0, 0.3)',
        animation: 'fadeIn 0.2s ease forwards'
      }}
    >
      <span className="material-symbols-outlined" style={{ color: 'var(--primary-yellow)', fontSize: '28px' }}>
        flash_on
      </span>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-yellow)', fontSize: '1rem' }}>
          {toast.title || 'SYSTEM ALERT'}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{toast.message}</div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          marginLeft: '0.5rem'
        }}
      >
        ✕
      </button>
    </div>
  );
}
