import React, { useEffect, useRef, useState } from "react";
import { moods } from "../../mood-setting/mood-setting";

import styles from "./room-user.module.scss";

const RoomUser = ({ user }) => {
  const timeout = useRef();
  const videoref = useRef();
  const { displayName, uid, mood, stream } = user;
  const [isMoodHighlighted, setIsMoodHighlighted] = useState(false);

  useEffect(() => {
    clearTimeout(timeout.current);
    setIsMoodHighlighted(true);
    timeout.current = setTimeout(() => {
      setIsMoodHighlighted(false);
    }, 500);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [mood, setIsMoodHighlighted]);

  useEffect(() => {
    if (stream) {
      videoref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={styles.Wrapper} key={uid}>
      <div className={styles.User}>
        {stream && <video className={styles.Video} ref={videoref} autoPlay />}
        <div
          className={`${styles.Mood} ${isMoodHighlighted && styles.Highlight}`}
        >
          {moods[mood]}
        </div>
        <div className={styles.Info}>{displayName}</div>
        <div className={styles.Ratio} />
      </div>
    </div>
  );
};

export default RoomUser;
