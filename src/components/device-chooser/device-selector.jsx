import React from "react";

import CameraChooser from "./camera-chooser/camera-chooser";
import MicrophoneChooser from "./microphone-chooser/microphone-chooser";

const DeviceChooser = ({
  selectedCamera,
  setSelectedCamera,
  selectedMicrophone,
  setSelectedMicrophone,
  className,
}) => {
  return (
    <>
      <CameraChooser
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        className={className}
      />
      <MicrophoneChooser
        selectedMicrophone={selectedMicrophone}
        setSelectedMicrophone={setSelectedMicrophone}
        className={className}
      />
    </>
  );
};

export default DeviceChooser;
