import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetUser } from "../../../store/selectors/auth-selectors";
import { moods } from "../../mood-setting/mood-setting";
import { openDialog } from "../../../store/actions/dialog-action";
import { DialogId } from "../../dialog/dialog";

import styles from "./room-user.module.scss";
import { LineChart, Line, YAxis, CartesianGrid } from "recharts";

const RoomUser = ({ user }) => {
  const dispatch = useDispatch();
  const timeout = useRef();
  const videoRef = useRef();
  const { displayName, uid, mood, stream } = user;
  const [isMoodHighlighted, setIsMoodHighlighted] = useState(false);
  const { uid: ownUid } = useSelector(GetUser);
  const [chartData, setChartData] = useState(
    Array(5)
      .fill()
      .map((v, i) => {
        return { uv: 0 };
      })
  );

  const emotionConfig = {
    surprised: 100,
    happy: 75,
    neutral: 50,
    sad: 0,
    angry: 0,
  };

  useEffect(() => {
    if (ownUid === uid) {
      setInterval(async () => {
        if (videoRef.current) {
          const detections = await window.faceapi
            .detectAllFaces(
              videoRef.current,
              new window.faceapi.TinyFaceDetectorOptions()
            )
            .withFaceExpressions();

          if (!detections.length) {
            return;
          }

          const [detection] = detections;

          const sortedExpressions = Object.entries(detection.expressions).sort(
            ([, value1], [, value2]) => value2 - value1
          );

          const [[expression]] = sortedExpressions;

          console.log(expression);
          setChartData((prev) => [
            ...prev,
            {
              uv: emotionConfig[expression],
            },
          ]);
        }
      }, 2500);
    }
  }, [stream]);

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

  const startStreamRequest = () => dispatch(openDialog(DialogId.START_STREAM));

  return (
    <div className={styles.Wrapper} key={uid}>
      <div className={styles.User}>
        {stream && <video className={styles.Video} ref={videoRef} autoPlay />}
        {!stream && ownUid === uid && (
          <div className={styles.Play} onClick={startStreamRequest}>
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
      {ownUid === uid && (
        <div className={styles.Chart}>
          <LineChart
            width={300}
            height={150}
            data={chartData.slice(Math.max(chartData.length - 5, 0))}
          >
            <YAxis domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              isAnimationActive={false}
              strokeWidth={5}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default RoomUser;
