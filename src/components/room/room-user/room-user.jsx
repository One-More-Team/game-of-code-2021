import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetUser } from "../../../store/selectors/auth-selectors";
import { moods } from "../../mood-setting/mood-setting";
import { initTestConnection } from "../../../store/actions/action-test";

import styles from "./room-user.module.scss";

const RoomUser = ({ user }) => {
  const dispatch = useDispatch();
  const timeout = useRef();
  const videoRef = useRef();
  const { displayName, uid, mood, stream } = user;
  const [isMoodHighlighted, setIsMoodHighlighted] = useState(false);
  const { uid: ownUid } = useSelector(GetUser);

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
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const testConnection = () => {
    console.log("Test Start");
    dispatch(initTestConnection());
  };

  return (
    <div className={styles.Wrapper} key={uid}>
      <div className={styles.User}>
        {stream && <video className={styles.Video} ref={videoRef} autoPlay />}
        {!stream && ownUid === uid && (
          <div className={styles.Play} onClick={testConnection}>
            <i className="far fa-play-circle" />
          </div>
        )}
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
