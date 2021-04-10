import React from "react";

import styles from "./info.module.scss";

const Info = ({ children, onClick }) => (
  <div className={styles.Wrapper} onClick={onClick}>
    {children}
  </div>
);

export default Info;
