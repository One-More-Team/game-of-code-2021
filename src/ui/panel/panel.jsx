import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./panel.module.scss";

const Panel = ({ children, label, className }) => (
  <div className={`${styles.Wrapper} ${className}`}>
    {label && (
      <FormattedMessage id={label}>
        {(txt) => <div className={styles.Label}>{txt}</div>}
      </FormattedMessage>
    )}
    {children}
  </div>
);

export default Panel;
