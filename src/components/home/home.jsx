import React from "react";
import Header from "./header/header";
import MoodSetting from "../mood-setting/mood-setting";
import JoinOrCreateRoom from "./join-or-create-room/join-or-create-room";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Layout}>
        <Header />
        <JoinOrCreateRoom className={styles.JoinOrCreateRoom} />
        <MoodSetting className={styles.MoodSetting} />
      </div>
    </div>
  );
};

export default Home;
