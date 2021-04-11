import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { setMood } from "../../store/actions/mood-action";
import { GetUser } from "../../store/selectors/auth-selectors";
import { GetUserMood } from "../../store/selectors/user-data-selector";
import Info from "../../ui/info/info";

import styles from "./mood-setting.module.scss";

export const moods = "👎,😡,😱,😟,😒,☹️,😕,🙁,😐,🙂,🙃,😀,😃,😄,😎,🤣,👍".split(
  ","
);

const MoodSetting = ({ className }) => {
  const dispatch = useDispatch();
  const currentMood = useSelector(GetUserMood);
  const { uid } = useSelector(GetUser);

  const setMoodRequest = (index) => dispatch(setMood({ mood: index, uid }));

  return (
    <Info className={`${className} ${styles.Wrapper}`}>
      <FormattedMessage id="current-mood" />
      <div className={styles.List}>
        {moods.map((mood, index) => (
          <div
            className={`${styles.Mood} ${
              currentMood === index && styles.Selected
            }`}
            key={mood}
            onClick={() => setMoodRequest(index)}
          >
            {mood}
          </div>
        ))}
      </div>
    </Info>
  );
};

export default MoodSetting;
