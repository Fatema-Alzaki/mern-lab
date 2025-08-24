// src/pages/AuthPage/AuthPage.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';   // ← add this
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ setUser }) {
  const { pathname } = useLocation();             // ← add this
  // default to Sign Up if URL includes "/signup"
  const [showLogin, setShowLogin] = useState(() => !/signup/i.test(pathname));

  return (
    <main className={styles.AuthPage}>
      <h3
        className={styles.toggleTitle}
        role="button"
        tabIndex={0}
        onClick={() => setShowLogin(v => !v)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowLogin(v => !v)}
      >
        {showLogin ? 'SIGN UP' : 'LOG IN'}
      </h3>

      <div className={styles.formContainer}>
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </div>
    </main>
  );
}
