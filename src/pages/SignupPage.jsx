import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { signupUser } from '../services/api';

export default function SignupPage() {
  const { setActiveTab, setUser, setIsConnected, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rank, setRank] = useState('PRO ATHLETE');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must accept the PowerDose Athlete Code & Terms.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await signupUser(name, email, password, rank);
      if (res && res.user) {
        setUser(res.user);
        setIsConnected(true);
        showToast('ACCOUNT CREATED', `Welcome to PowerDose, ${res.user.name}!`);
        setActiveTab('profile');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '2.5rem 1rem'
      }}
      className="animate-fade-in"
    >
      <div
        className="card-surface"
        style={{
          width: '100%',
          maxWidth: '520px',
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
            background: 'linear-gradient(90deg, #ff5500 0%, var(--primary-yellow) 100%)'
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
              person_add
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: '2.2rem', color: '#fff', letterSpacing: '0.05em' }}>
            JOIN THE <span style={{ color: 'var(--primary-yellow)' }}>SQUAD</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Create your athlete profile and unlock 500 bonus Stack Points on your first order.
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

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              FULL ATHLETE NAME
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                badge
              </span>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              EMAIL ADDRESS
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

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              CREATE PASSWORD (MIN 6 CHARS)
            </label>
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

          {/* Athlete Rank Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              ATHLETE DISCIPLINE / RANK
            </label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="input-field"
              style={{ cursor: 'pointer', backgroundColor: 'var(--bg-container)' }}
            >
              <option value="PRO ATHLETE">PRO ATHLETE</option>
              <option value="ELITE ATHLETE">ELITE ATHLETE</option>
              <option value="BODYBUILDER">BODYBUILDER / POWERLIFTER</option>
              <option value="CROSSFIT & HYBRID">CROSSFIT & HYBRID ATHLETE</option>
              <option value="ENDURANCE RUNNER">ENDURANCE ATHLETE</option>
            </select>
          </div>

          {/* Terms Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem' }}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ accentColor: 'var(--primary-yellow)', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="terms" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              I agree to the PowerDose Code of Conduct & Privacy Terms
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? (
              <span>INITIALIZING PROFILE...</span>
            ) : (
              <>
                <span>REGISTER & CLAIM 500 PTS</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  bolt
                </span>
              </>
            )}
          </button>
        </form>

        {/* Link back to Login */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-dark)', paddingTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ALREADY A POWERDOSE MEMBER?{' '}
            <span
              onClick={() => setActiveTab('login')}
              style={{
                color: 'var(--primary-yellow)',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '0.3rem'
              }}
            >
              LOG IN HERE →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
