import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { loginUser } from '../services/api';

export default function LoginPage() {
  const { setActiveTab, setUser, setIsConnected, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await loginUser(email, password);
      if (res && res.user) {
        setUser(res.user);
        setIsConnected(true);
        showToast('WELCOME BACK ATHLETE', `Logged in as ${res.user.name}`);
        setActiveTab('profile');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    setEmail('jack.hammer@powerdose.fit');
    setPassword('PowerStack2026!');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '2rem 1rem'
      }}
      className="animate-fade-in"
    >
      <div
        className="card-surface"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem 2rem',
          backgroundColor: '#0c0f0f',
          border: '2px solid var(--border-dark)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          position: 'relative'
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-yellow) 0%, #ff5500 100%)'
          }}
        />

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justify: 'center',
              backgroundColor: 'var(--primary-yellow)',
              color: '#0c0f0f',
              width: '50px',
              height: '50px',
              marginBottom: '1rem'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px', fontWeight: 'bold' }}>
              lock
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: '2.2rem', color: '#fff', letterSpacing: '0.05em' }}>
            ATHLETE <span style={{ color: 'var(--primary-yellow)' }}>LOGIN</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Access your high-performance nutrition profile, active missions & stack subscriptions.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'rgba(255, 68, 68, 0.15)',
              border: '1px solid #ff4444',
              color: '#ff6666',
              padding: '0.75rem 1rem',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              warning
            </span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              ATHLETE EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="athlete@powerdose.fit"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
              />
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '20px'
                }}
              >
                mail
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                ACCESS PASSWORD
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '20px'
                }}
              >
                key
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>ENTER POWER ZONE</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill & Register Link */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-dark)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={fillDemoUser}
            className="btn-outline"
            style={{ width: '100%', marginBottom: '1.25rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            ⚡ QUICK DEMO AUTO-FILL (JACK HAMMER)
          </button>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            NEW TO POWERDOSE?{' '}
            <span
              onClick={() => setActiveTab('signup')}
              style={{
                color: 'var(--primary-yellow)',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '0.3rem'
              }}
            >
              CREATE AN ATHLETE ACCOUNT →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
