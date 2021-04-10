import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { GetStream } from "../../store/selectors/app-selector";
import styles from "./my-stream.module.scss";

const MyStream = ({ className }) => {
  const stream = useSelector(GetStream);
  const outerVideo = useRef(null);

  useEffect(() => {
    outerVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={className}>
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
