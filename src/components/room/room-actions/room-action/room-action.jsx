import React from "react";

import styles from "./room-action.module.scss";

const RoomAction = ({ action }) => {
  const { action: message, type, owner, isFinished, timestamp } = action;

  return (
    <div
      className={`${styles.Wrapper} ${type === "positive" && styles.Positive} ${
        isFinished && styles.Finished
      }`}
      key={timestamp}
    >
      {owner && <div className={styles.Owner}>{owner}</div>}
      {message}
    </div>
  );
};

export default RoomAction;
