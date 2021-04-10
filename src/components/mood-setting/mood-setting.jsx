import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { setMood } from "../../store/actions/mood-action";
import { GetUserMood } from "../../store/selectors/user-data-selector";
import Info from "../../ui/info/info";

import styles from "./mood-setting.module.scss";

export const moods = "👎,😡,😱,😟,😕,🙁,☹️,😒,😐,🙂,🙃,😀,😃,😄,😎,🤣,👍".split(
  ","
);

const MoodSetting = ({ className }) => {
  const dispatch = useDispatch();
  const currentMood = useSelector(GetUserMood);

  const setMoodRequest = (index) => dispatch(setMood(index));

  return (
    <Info className={className}>
      <div className={styles.Wrapper}>
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
      </div>
    </Info>
  );
};

export default MoodSetting;
