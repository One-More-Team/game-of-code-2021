import React from "react";
import { useDispatch } from "react-redux";

import { initTestConnection } from "../../store/actions/action-test";
import Button, { ButtonStyle } from "../../ui/button/button";
import Header from "./header/header";
import MyStream from "../my-stream/my-stream";
import MoodSetting from "./mood-setting/mood-setting";
import JoinOrCreateRoom from "./join-or-create-room/join-or-create-room";

import styles from "./home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const testConnection = () => {
    console.log("Test Start");
    dispatch(initTestConnection());
  };
  return (
    <div className={styles.Wrapper}>
      <Header />
      <Button
        className={styles.Button}
        style={ButtonStyle.Primary}
        messageId={"test"}
        onClick={testConnection}
      />
      <MyStream className={styles.MyStream} />
      <JoinOrCreateRoom className={styles.JoinOrCreateRoom} />
      <MoodSetting className={styles.MoodSetting} />
    </div>
  );
};

export default Home;
