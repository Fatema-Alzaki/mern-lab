import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const toggle = () => setShowLogin((v) => !v);

  return (
    <main className={styles.AuthPage}>
      <h3
        className={styles.toggleTitle}
        role="button"
        tabIndex={0}
        aria-pressed={showLogin}
        title={showLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
        onClick={toggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
      >
        {showLogin ? 'SIGN UP' : 'LOG IN'}
      </h3>

      <div className={styles.formContainer}>
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
    </main>
  );
}
