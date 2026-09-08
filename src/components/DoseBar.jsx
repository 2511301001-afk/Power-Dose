import React from 'react';

export default function DoseBar({ level = 8, max = 10, label = 'DOSE INTENSITY' }) {
  const blocks = Array.from({ length: max }, (_, i) => i < level);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <span>{label}</span>
          <span style={{ color: 'var(--primary-yellow)' }}>{level}/{max} MAX</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: '3px', width: '100%' }}>
        {blocks.map((active, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: active ? 'var(--primary-yellow)' : '#2a2a2a',
              transition: 'background-color 0.2s ease',
              boxShadow: active ? '0 0 5px rgba(255, 212, 0, 0.4)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
}
