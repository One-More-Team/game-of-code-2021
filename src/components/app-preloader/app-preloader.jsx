import React from "react";
import { useSelector } from "react-redux";

import { GetIsSiteinited } from "../../store/selectors/app-selector";
import { GetUser } from "../../store/selectors/auth-selectors";
import LoaderAnimation from "../../ui/loader-animation/loader-animation";
import WelcomeMessage from "../welcome-message/welcome-message";

import styles from "./app-preloader.module.scss";

export const AppPreloader = () => {
  const isSiteinited = useSelector(GetIsSiteinited);
  const user = useSelector(GetUser);

  return (
    <div
      className={`${styles.Wrapper} ${
        isSiteinited && (user ? styles.LoadedAndLogged : styles.Loaded)
      }`}
    >
      <div className={styles.Content}>
        <div className={styles.LoaderWrapper}>
          <LoaderAnimation />
        </div>
        {isSiteinited && user && (
          <WelcomeMessage displayName={user.displayName} />
        )}
      </div>
    </div>
  );
};

export default AppPreloader;
