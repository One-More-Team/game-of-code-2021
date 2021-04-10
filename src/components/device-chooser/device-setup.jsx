import React, { useState } from "react";
import DeviceChooser from "./device-selector";

import commonStyles from "./device-selector.module.scss";

const DeviceSetup = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);

  return (
    <div className={commonStyles.Container}>
      <DeviceChooser
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        selectedMicrophone={selectedMicrophone}
        setSelectedMicrophone={setSelectedMicrophone}
      />
    </div>
  );
};

export default DeviceSetup;
