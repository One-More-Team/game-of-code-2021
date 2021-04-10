import React, { useState } from "react";
import DeviceChooser from "./device-selector";

const DeviceSetup = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);

  return (
    <DeviceChooser
      selectedCamera={selectedCamera}
      setSelectedCamera={setSelectedCamera}
      selectedMicrophone={selectedMicrophone}
      setSelectedMicrophone={setSelectedMicrophone}
    />
  );
};

export default DeviceSetup;
