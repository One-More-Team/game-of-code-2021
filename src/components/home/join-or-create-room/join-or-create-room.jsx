import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button, { ButtonStyle } from "../../../ui/button/button";
import Panel from "../../../ui/panel/panel";
import TextInput from "../../../ui/text-input/text-input";

import styles from "./join-or-create-room.module.scss";

const JoinOrCreateRoom = ({ className }) => {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const [roomIdValidationResult, setRoomIdValidationResult] = useState({
    isValid: false,
  });

  const joinRoomRequest = () => dispatch("");
  const creatRoomRequest = () => dispatch("");

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
          onClick={joinRoomRequest}
          style={ButtonStyle.Primary}
        />
        <Button
          messageId="create"
          icon="fa-plus-circle"
          onClick={creatRoomRequest}
          style={ButtonStyle.Secondary}
        />
      </div>
    </Panel>
  );
};

export default JoinOrCreateRoom;
