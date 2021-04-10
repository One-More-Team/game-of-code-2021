import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./welcome-message.module.scss";

const WelcomeMessage = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.AnimWrapper}>
        <div className={styles.Content}>
          <FormattedMessage id="welcome-message" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
