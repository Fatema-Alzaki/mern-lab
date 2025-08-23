import React from "react";
import HootListItem from "../HootListItem/HootListItem";
import styles from "./HootList.module.scss";

export default function HootList({ hoots = [] }) {
  if (!Array.isArray(hoots) || hoots.length === 0) {
    return (
      <div className={styles.HootList}>
        <p className="muted">Be the first to hoot!</p>
      </div>
    );
  }

  return (
    <div className={styles.HootList}>
      {hoots.map((h) => (
        <HootListItem key={h._id ?? h.id} hoot={h} />
      ))}
    </div>
  );
}
