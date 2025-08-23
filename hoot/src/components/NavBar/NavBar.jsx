import styles from './NavBar.module.scss';
import { logOut } from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  const name = user?.name || '';
  const email = user?.email || '';

  return (
    <div className={styles.nav}>
      <div>{name}</div>
      <div className={styles.email}>{email}</div>
      <button
        type="button"
        className={styles.button}
        onClick={handleLogOut}
        aria-label="Log out"
        title="Log out"
      >
        Log out
      </button>
    </div>
  );
}
