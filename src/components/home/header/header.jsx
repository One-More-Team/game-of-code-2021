import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../../store/actions/dialog-action";

import { GetUser } from "../../../store/selectors/auth-selectors";
import Info from "../../../ui/info/info";
import { DialogId } from "../../dialog/dialog";

import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(GetUser);
  const openProfileDialog = () => dispatch(openDialog(DialogId.PROFILE));

  return (
    <Info className={styles.Wrapper} onClick={openProfileDialog}>
      {displayName}
    </Info>
  );
};

export default Header;
