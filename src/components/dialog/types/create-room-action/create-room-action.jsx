import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button, { ButtonStyle } from "../../../../ui/button/button";
import SimpleDialog from "../simple-dialog/simple-dialog";
import TextInput from "../../../../ui/text-input/text-input";
import { createRoomAction } from "../../../../store/actions/room-action";

import styles from "./create-room-action.module.scss";
import Dropdown from "../../../../ui/dropdown/dropdown";
import { GetProfile } from "../../../../store/selectors/auth-selectors";

const CreateRoomAction = ({ close }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("");
  const [actionValidationResult, setActionValidationResult] = useState({
    isValid: false,
  });
  const { displayName } = useSelector(GetProfile);

  const typeObjects = [
    { key: "positive", data: "positive", component: "Positive" },
    { key: "negative", data: "negative", component: "Negative" },
  ];

  const ownerObjects = [
    { key: "public", data: displayName, component: displayName },
    { key: "anonymous", data: null, component: "Anonymous" },
  ];

  const [selectedType, setSelectedType] = useState(typeObjects[0]);
  const [selectedOwner, setSelectedOwner] = useState(ownerObjects[0]);

  const createActionRequest = () => {
    close();
    dispatch(
      createRoomAction({
        action,
        type: selectedType.data,
        owner: selectedOwner.data,
        timestamp: Date.now(),
        isFinished: false,
      })
    );
  };

  const content = (
    <div className={styles.InputArea}>
      <TextInput
        value={action}
        setValue={setAction}
        validationResult={actionValidationResult}
        setValidationResult={setActionValidationResult}
        icon="lightbulb"
        placeholder="your-action"
        minLength={5}
        maxLength={100}
        className={styles.InputBlock}
      />
      <div className={styles.Options}>
        <Dropdown
          list={typeObjects}
          value={selectedType}
          setValue={setSelectedType}
        />
        <Dropdown
          list={ownerObjects}
          value={selectedOwner}
          setValue={setSelectedOwner}
        />
      </div>
    </div>
  );

  const actions = (
    <>
      <Button
        messageId="create action"
        style={ButtonStyle.Primary}
        onClick={createActionRequest}
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

export default CreateRoomAction;
