import React from "react";

import styles from "./info.module.scss";

const Info = ({ children, onClick, className }) => (
  <div className={`${styles.Wrapper} ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Info;
