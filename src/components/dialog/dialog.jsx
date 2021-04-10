import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetSelectedDialogId } from "../../store/selectors/dialog-selector";
import { closeDialog } from "../../store/actions/dialog-action";
import { getDialog } from "./dialog-configs";
import Panel from "../../ui/panel/panel";

import styles from "./dialog.module.scss";

export const DialogId = {
  PROFILE: "PROFILE",
  LEAVE_ROOM: "LEAVE_ROOM",
  START_STREAM: "START_STREAM",
};

const Dialog = () => {
  const dispatch = useDispatch();
  const lastContent = useRef();
  const dialogId = useSelector(GetSelectedDialogId);
  const [forceUpdate, setForceUpdate] = useState(0);

  const close = () => dispatch(closeDialog());
  const activeDialog = getDialog({ dialogId, close });
  lastContent.current = activeDialog.component || lastContent.current;

  useEffect(() => {
    let timeout;
    if (!dialogId && lastContent.current)
      timeout = setTimeout(() => {
        lastContent.current = null;
        setForceUpdate(Date.now());
      }, 250);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [dialogId]);

  return (
    <div
      className={`${styles.Wrapper} ${dialogId && styles.ActiveWrapper}`}
      key={forceUpdate}
    >
      <div
        className={`${styles.Cover} ${
          !activeDialog.isCloseable && styles.InactiveCover
        }`}
        onClick={activeDialog.isCloseable ? close : null}
      />
      <div className={`${styles.Content} ${dialogId && styles.ActiveContent}`}>
        <Panel label={activeDialog.label}>{lastContent.current}</Panel>
      </div>
    </div>
  );
};

export default Dialog;
