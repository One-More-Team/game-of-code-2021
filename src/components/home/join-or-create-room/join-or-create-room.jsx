import React, { useState } from "react";
import Button, { ButtonStyle } from "../../../ui/button/button";
import Panel from "../../../ui/panel/panel";
import TextInput from "../../../ui/text-input/text-input";

import styles from "./join-or-create-room.module.scss";

const JoinOrCreateRoom = ({ className }) => {
  const [roomId, setRoomId] = useState("");
  const [roomIdValidationResult, setRoomIdValidationResult] = useState({
    isValid: false,
  });

  return (
    <Panel className={`${styles.Wrapper} ${className}`}>
      <div className={styles.InputArea}>
        <TextInput
          value={roomId}
          setValue={setRoomId}
          validationResult={roomIdValidationResult}
          setValidationResult={setRoomIdValidationResult}
          icon="fingerprint"
          placeholder="room name"
          autoComplete="room-name"
          minLength={3}
          maxLength={50}
          className={styles.InputBlock}
        />
      </div>
      <div className={styles.Actions}>
        <Button
          messageId="join"
          icon="fa-door-open"
          navigationTarget={`/room/${roomId}`}
          style={ButtonStyle.Primary}
          isEnabled={roomIdValidationResult.isValid}
        />
        <Button
          messageId="create"
          icon="fa-plus-circle"
          navigationTarget={`/room/${roomId}`}
          style={ButtonStyle.Secondary}
          isEnabled={roomIdValidationResult.isValid}
        />
      </div>
    </Panel>
  );
};

export default JoinOrCreateRoom;
