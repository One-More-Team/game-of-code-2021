import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button, { ButtonStyle } from "../../../../ui/button/button";
import SimpleDialog from "../simple-dialog/simple-dialog";
import DeviceChooser from "../../../device-chooser/device-selector";
import { initTestConnection } from "../../../../store/actions/action-test";

const StartStream = ({ close }) => {
  const dispatch = useDispatch();
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);

  const startStreamRequest = () => {
    close();
    dispatch(
      initTestConnection({ video: selectedCamera, audio: selectedMicrophone })
    );
  };

  const content = (
    <DeviceChooser
      selectedCamera={selectedCamera}
      setSelectedCamera={setSelectedCamera}
      selectedMicrophone={selectedMicrophone}
      setSelectedMicrophone={setSelectedMicrophone}
    />
  );

  const actions = (
    <>
      <Button
        messageId="start-stream"
        style={ButtonStyle.Primary}
        onClick={startStreamRequest}
      />
      <Button
        messageId="cancel"
        style={ButtonStyle.Secondary}
        onClick={close}
      />
    </>
  );

  return <SimpleDialog content={content} actions={actions} />;
};

export default StartStream;
