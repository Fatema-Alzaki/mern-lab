// src/router/index.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import routes from './routes';
import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service';
import AuthPage from '../pages/AuthPage/AuthPage';

export default function AppRouter() {
  const [user, setUser] = useState(() => getUser());

  // keep auth state in sync across tabs
  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <Router>
      <main className={styles.App}>
        {user ? (
          <>
            <Routes>
              {/* ensure root goes to feed */}
              <Route path="/" element={<Navigate to="/hoots" replace />} />

              {routes.map(({ Component, key, path }) => (
                <Route
                  key={key}
                  path={path}
                  element={
                    <Component
                      page={key}
                      user={user}
                      setUser={setUser}
                    />
                  }
                />
              ))}

              {/* catch-all */}
              <Route path="/*" element={<Navigate to="/hoots" replace />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </Router>
  );
}
