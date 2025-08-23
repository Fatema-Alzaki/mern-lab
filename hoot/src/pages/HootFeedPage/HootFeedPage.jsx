import { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NewHootForm from "../../components/NewHootForm/NewHootForm";
import HootList from "../../components/HootList/HootList";
import { getAll } from "../../utilities/hoots-api";
import styles from "./HootFeedPage.module.scss";

export default function HootFeedPage({ user, setUser }) {
  const [hoots, setHoots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getAll();
        if (!ignore) setHoots(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setError("Could not load your feed.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  const addHoot = useCallback((hoot) => {
    setHoots((prev) => [hoot, ...prev]);
  }, []);

  return (
    <main className={styles.HootFeedPage}>
      <aside>
        <NavBar user={user} setUser={setUser} />
      </aside>

      <section className={styles.feed}>
        <NewHootForm addHoot={addHoot} />
        {loading && <p className="muted">Loading…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <HootList hoots={hoots} />}
      </section>
    </main>
  );
}
