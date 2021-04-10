import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  requestMicrophonePermission,
  setMicrophone,
} from "../../../store/actions/devices";
import {
  GetMicrophoneError,
  GetMicrophoneList,
} from "../../../store/selectors/devices.js";
import { warn } from "../../../utils/logger";
import Button, { ButtonStyle } from "../../../ui/button/button";
import Dropdown from "../../../ui/dropdown/dropdown";

import commonStyles from "../device-chooser.module.scss";
import styles from "./microphone-chooser.module.scss";

let analyser = null;
let audioContext = null;

const MicrophoneChooser = ({
  selectedMicrophone,
  setSelectedMicrophone,
  className,
}) => {
  const dispatch = useDispatch();
  const dataArrayAlt = useRef();
  const [forceUpdate, setForceUpdate] = useState(0);
  const microphoneList = useSelector(GetMicrophoneList);
  const microphoneError = useSelector(GetMicrophoneError);

  const microphoneObjects = [
    { key: "nomic", data: null, component: "Choose a Microphone" },
    ...microphoneList.map((microphone) => ({
      key: microphone.deviceId,
      data: microphone,
      component: microphone.label || "Unknown Device",
    })),
  ];

  const requestPermission = () => dispatch(requestMicrophonePermission());

  useEffect(() => {
    if (
      navigator.mediaDevices.getUserMedia &&
      selectedMicrophone?.data?.deviceId
    ) {
      try {
        navigator.mediaDevices
          .getUserMedia({
            audio: {
              deviceId: { exact: selectedMicrophone?.data?.deviceId },
            },
          })
          .then((stream) => {
            audioContext = new (window.AudioContext ||
              window.webkitAudioContext)();
            const distortion = audioContext.createWaveShaper();
            const gainNode = audioContext.createGain();
            const biquadFilter = audioContext.createBiquadFilter();

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(distortion);
            analyser = audioContext.createAnalyser();
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.fftSize = 256;
            distortion.connect(biquadFilter);
            biquadFilter.connect(gainNode);
            gainNode.connect(analyser);

            const bufferLengthAlt = analyser.frequencyBinCount;
            dataArrayAlt.current = new Uint8Array(bufferLengthAlt);
          })
          .catch((e) => {
            warn(`There was a problem with microphone's getUserMedia: ${e}`);
          });
      } catch (e) {
        warn(`There was a problem during microphone preview: ${e}`);
      }
    } else if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  }, [selectedMicrophone]);

  useEffect(() => {
    if (
      selectedMicrophone === null ||
      selectedMicrophone === undefined ||
      (selectedMicrophone &&
        selectedMicrophone?.data?.deviceId === "" &&
        microphoneObjects[0]?.data?.deviceId !==
          selectedMicrophone?.data?.deviceId)
    )
      setSelectedMicrophone(microphoneObjects[0]);
  }, [
    microphoneList,
    microphoneObjects,
    selectedMicrophone,
    setSelectedMicrophone,
  ]);

  useEffect(() => {
    if (selectedMicrophone && selectedMicrophone.data)
      dispatch(setMicrophone(selectedMicrophone.data));
  }, [selectedMicrophone, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => setForceUpdate(forceUpdate + 1), 100);
    if (analyser && dataArrayAlt.current) {
      analyser.getByteFrequencyData(dataArrayAlt.current);
    }

    return () => {
      clearInterval(interval);
    };
  }, [forceUpdate]);

  const bars = Array.from(
    {
      length: 10,
    },
    (_, index) => (
      <div
        key={`bar-${index}`}
        className={styles.Bar}
        style={{
          height: `${
            ((dataArrayAlt.current ? dataArrayAlt.current?.[index] || 0 : 0) /
              150) *
            100
          }%`,
        }}
      ></div>
    )
  );

  return (
    <div className={className}>
      <h2>
        <i className="fas fa-microphone"></i> Your Microphones
      </h2>
      {microphoneList &&
      microphoneList.length > 0 &&
      microphoneList[0]?.deviceId !== "" ? (
        <>
          <Dropdown
            list={microphoneObjects}
            value={selectedMicrophone}
            setValue={setSelectedMicrophone}
          />
          <div className={styles.BarsWrapper}>
            {bars}
            {selectedMicrophone?.data === null && (
              <div className={styles.Muted}>
                <i className="fas fa-info-circle"></i> Choose a microphone
              </div>
            )}
            {selectedMicrophone?.data &&
              dataArrayAlt.current &&
              dataArrayAlt.current[0] === 0 && (
                <div className={styles.Muted}>
                  <i className="fas fa-info-circle"></i> Make some noise to
                  check your microphone.
                </div>
              )}
          </div>
        </>
      ) : microphoneError ? (
        <div className={commonStyles.AccessError}>
          We couldn't reach your microphone, it looks you already blocked it. To
          enable it again you have to modify your settings in your browser.{" "}
          <a
            href="https://support.google.com/chrome/answer/2693767"
            rel="noopener noreferrer"
            target="_blank"
          >
            Click here for more informations
          </a>
        </div>
      ) : (
        <div className={commonStyles.NoDeviceInfo}>
          It looks you don't have any microphone connected to your device or our
          site has no access to reach them.
          <Button
            messageId="give-permission"
            icon="fa-eye"
            style={ButtonStyle.Tertiary}
            onClick={requestPermission}
            className={commonStyles.Button}
          />
        </div>
      )}
    </div>
  );
};

export default MicrophoneChooser;
