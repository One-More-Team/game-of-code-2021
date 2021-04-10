import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../../store/actions/dialog-action";

import { GetProfile } from "../../../store/selectors/auth-selectors";
import { GetUserMood } from "../../../store/selectors/user-data-selector";
import Info from "../../../ui/info/info";
import { DialogId } from "../../dialog/dialog";
import { moods } from "../../mood-setting/mood-setting";

import styles from "./header.module.scss";
import ThemeSelector from "../../theme-selector/theme-selector";

const Header = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(GetProfile);
  const currentMood = useSelector(GetUserMood);
  const openProfileDialog = () => dispatch(openDialog(DialogId.PROFILE));

  return (
    <div className={styles.Wrapper}>
      <Info className={styles.Profile} onClick={openProfileDialog}>
        <span className={styles.Mood}>{moods[currentMood]}</span> {displayName}
      </Info>
      <ThemeSelector />
    </div>
  );
};

export default Header;
