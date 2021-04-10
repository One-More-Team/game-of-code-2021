import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../../store/actions/dialog-action";

import { GetUser } from "../../../store/selectors/auth-selectors";
import { GetUserMood } from "../../../store/selectors/user-data-selector";
import Info from "../../../ui/info/info";
import { DialogId } from "../../dialog/dialog";
import { moods } from "../../mood-setting/mood-setting";

import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(GetUser);
  const currentMood = useSelector(GetUserMood);
  const openProfileDialog = () => dispatch(openDialog(DialogId.PROFILE));

  return (
    <Info className={styles.Wrapper} onClick={openProfileDialog}>
      <span className={styles.Mood}>{moods[currentMood]}</span> {displayName}
    </Info>
  );
};

export default Header;
