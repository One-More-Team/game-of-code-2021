import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  requestCameraPermission,
  setCamera,
} from "../../../store/actions/devices";
import {
  GetCameraError,
  GetCameraList,
} from "../../../store/selectors/devices.js";
import { warn } from "../../../utils/logger";
import Button, { ButtonStyle } from "../../../ui/button/button";
import Dropdown from "../../../ui/dropdown/dropdown";

import styles from "../device-chooser.module.scss";

const CameraChooser = ({
  selectedCamera,
  setSelectedCamera,
  cameraCover,
  className,
}) => {
  const dispatch = useDispatch();
  const previewVideo = useRef();
  const cameraList = useSelector(GetCameraList);
  const cameraError = useSelector(GetCameraError);
  const localStream = useRef();

  const cameraObjects = [
    { key: "nocam", data: null, component: "Choose a Camera" },
    ...cameraList.map((c) => ({
      key: c.deviceId,
      data: c,
      component: c.label || "Unknown Device",
    })),
  ];

  const requestPermission = () => dispatch(requestCameraPermission());

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia && selectedCamera?.data?.deviceId) {
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              width: { exact: 640 },
              height: { exact: 360 },
              deviceId: { exact: selectedCamera?.data?.deviceId },
            },
          })
          .then((stream) => {
            localStream.current = stream;
            previewVideo.current.srcObject = localStream.current;
          })
          .catch((e) => {
            warn(`There was a problem with camera's getUserMedia: ${e}`);
          });
      } catch (e) {
        warn(`There was a problem during camera preview: ${e}`);
      }
    } else {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
        previewVideo.current.pause();
      }

      previewVideo.current.srcObject = null;
      localStream.current = null;
    }
  }, [selectedCamera]);

  useEffect(() => {
    if (
      selectedCamera === null ||
      selectedCamera === undefined ||
      (selectedCamera &&
        selectedCamera?.data?.deviceId === "" &&
        cameraObjects[0]?.data?.deviceId !== selectedCamera?.data?.deviceId)
    )
      setSelectedCamera(cameraObjects[0]);
  }, [cameraList, cameraObjects, selectedCamera, setSelectedCamera]);

  useEffect(() => {
    if (selectedCamera && selectedCamera.data)
      dispatch(setCamera(selectedCamera.data));
  }, [selectedCamera, dispatch]);

  return (
    <div className={className}>
      <div className={styles.CameraWrapper}>
        <video ref={previewVideo} autoPlay playsInline />
        {selectedCamera?.key === "nocam" && (
          <div className={styles.CameraInfo}>
            {cameraError ? (
              <div>
                <i className="fas fa-exclamation-triangle"></i> Access problems
              </div>
            ) : (
              <div>
                <i className="fas fa-info-circle"></i> There is no selected
                camera
              </div>
            )}
          </div>
        )}
        {cameraCover}
      </div>
      <h2>
        <i className="fas fa-video"></i> Your Cameras
      </h2>
      {cameraList && cameraList.length > 0 && cameraList[0]?.deviceId !== "" ? (
        <Dropdown
          list={cameraObjects}
          value={selectedCamera}
          setValue={setSelectedCamera}
        />
      ) : cameraError ? (
        <div className={styles.AccessError}>
          We couldn't reach your camera, it looks you already blocked it. To
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
        <div className={styles.NoDeviceInfo}>
          It looks you don't have any camera connected to your device or our
          site has no access to reach them.
          <Button
            messageId="give-permission"
            icon="fa-eye"
            style={ButtonStyle.Tertiary}
            onClick={requestPermission}
            className={styles.Button}
          />
        </div>
      )}
    </div>
  );
};

export default CameraChooser;
