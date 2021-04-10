import React from "react";
import { useSelector } from "react-redux";

import { GetIsSiteinited } from "../../store/selectors/app-selector";
import LoaderAnimation from "../../ui/loader-animation/loader-animation";
import WelcomeMessage from "../welcome-message/welcome-message";

import styles from "./app-preloader.module.scss";

export const AppPreloader = () => {
  const isSiteinited = useSelector(GetIsSiteinited);

  return (
    <div className={`${styles.Wrapper} ${isSiteinited && styles.Loaded}`}>
      <div className={styles.Content}>
        <div className={styles.LoaderWrapper}>
          <LoaderAnimation />
        </div>
        {isSiteinited && <WelcomeMessage />}
      </div>
    </div>
  );
};

export default AppPreloader;
