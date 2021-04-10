import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { GetStream } from "../../store/selectors/app-selector";
import styles from "./my-stream.module.scss";

const MyStream = () => {
  const stream = useSelector(GetStream);
  const outerVideo = useRef(null);

  useEffect(() => {
    outerVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div>
      <video
        ref={outerVideo}
        className={styles.OuterStream}
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default MyStream;
