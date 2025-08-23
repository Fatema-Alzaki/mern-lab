import styles from './HootListItem.module.scss';

export default function HootListItem({ hoot }) {
  // tiny safety fallback only
  const createdAt = new Date(hoot.createdAt || Date.now());

  // slightly different formatting options
  const formattedDate = createdAt.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={styles.hootItem}>
      <div className={styles.header}>
        <div className={styles.author}>Hoot by {hoot.user.name}</div>
        <div className={styles.timestamp}>{formattedDate}</div>
      </div>
      <div className={styles.text}>{hoot.text}</div>
    </div>
  );
}

