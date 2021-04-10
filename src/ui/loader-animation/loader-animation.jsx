import React from "react";

import styles from "./loader-animation.module.scss";

const LoaderAnimation = () => (
  <div className={styles["lds-ring"]}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default LoaderAnimation;
