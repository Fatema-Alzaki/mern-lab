import { useRef, useState } from 'react';
import styles from './SignUpForm.module.scss';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  const nameOk = formData.name.trim().length >= 2;
  const emailOk = /\S+@\S+\.\S+/.test(formData.email.trim());
  const passOk = formData.password.length >= 6;
  const canSubmit = nameOk && emailOk && passOk && !isLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nameOk) { setError('Please enter your name.'); nameRef.current?.focus(); return; }
    if (!emailOk) { setError('Please enter a valid email.'); emailRef.current?.focus(); return; }
    if (!passOk) { setError('Password must be at least 6 characters.'); passRef.current?.focus(); return; }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      const user = await signUp(payload);
      setUser(user);
    } catch {
      setError('Failed to sign up. Try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        ref={nameRef}
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        autoComplete="name"
      />

      <input
        ref={emailRef}
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete="email"
        aria-invalid={Boolean(error) && !emailOk}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          ref={passRef}
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          aria-invalid={Boolean(error) && !passOk}
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
        {isLoading ? 'Creating account…' : 'Sign Up'}
      </button>
    </form>
  );
}
