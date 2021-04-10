import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetProfile } from "../../../../store/selectors/auth-selectors";
import Button, { ButtonStyle } from "../../../../ui/button/button";
import SimpleDialog from "../simple-dialog/simple-dialog";
import { signOutRequest } from "../../../../store/actions/auth-action";

import styles from "./profile.module.scss";

const Profile = ({ close }) => {
  const dispatch = useDispatch();
  const profile = useSelector(GetProfile);

  const logout = () => {
    close();
    dispatch(signOutRequest());
  };

  const content = profile && (
    <div>
      <div className={styles.UserName}>{profile.displayName}</div>
    </div>
  );

  const actions = (
    <>
      <Button
        messageId="sign-out"
        style={ButtonStyle.Primary}
        onClick={logout}
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

export default Profile;
