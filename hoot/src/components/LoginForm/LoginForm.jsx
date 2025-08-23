import { useState, useRef } from 'react';
import styles from './LoginForm.module.scss';
import { login } from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError('');
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(credentials.email.trim());
  const isValidPassword = credentials.password.length >= 6;
  const canSubmit = isValidEmail && isValidPassword && !isLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail) {
      setError('Please enter a valid email.');
      emailRef.current?.focus();
      return;
    }
    if (!isValidPassword) {
      setError('Password must be at least 6 characters.');
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      };
      const user = await login(payload);
      setUser(user);
    } catch {
      setError('Email or password is incorrect.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        ref={emailRef}
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        autoComplete="email"
        required
        aria-invalid={Boolean(error) && !isValidEmail}
      />

      {/* password + tiny show/hide toggle (no extra classes needed) */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          ref={passwordRef}
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
          aria-invalid={Boolean(error) && !isValidPassword}
        />
        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          aria-pressed={showPassword}
          title={showPassword ? 'Hide password' : 'Show password'}
          style={{ padding: '0.5rem 0.75rem' }}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {error && (
        <div className={styles.error} role="alert" aria-live="polite">
          {error}
        </div>
      )}

      <button type="submit" className={styles.button} disabled={!canSubmit}>
        {isLoading ? 'Logging in…' : 'Log In'}
      </button>
    </form>
  );
}
