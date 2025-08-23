import { useState } from 'react';
import { createHoot } from '../../utilities/hoots-api';
import styles from './NewHootForm.module.scss';

export default function NewHootForm({ addHoot }) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const MAX = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || isLoading) return;
    try {
      setIsLoading(true);
      // FIX: utilities/hoots-api has createHoot(text) → not an object
      const newHoot = await createHoot(value);
      addHoot(newHoot); // add to feed instantly
      setText('');
    } catch (err) {
      console.error('Failed to create hoot:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX))}
        placeholder="What's happening cutee :>?"
        rows={3}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <small>{text.length}/{MAX}</small>
        <button type="submit" className={styles.button} disabled={!text.trim() || isLoading}>
          {isLoading ? 'Posting…' : 'Hoot'}
        </button>
      </div>
    </form>
  );
}
