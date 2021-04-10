import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Themes } from "../../enum/themes";
import { setTheme } from "../../store/actions/app-action";
import { GetActiveTheme } from "../../store/selectors/app-selector";

import styles from "./theme-selector.module.scss";

const ThemeSelector = ({ className }) => {
  const dispatch = useDispatch();
  const activeTheme = useSelector(GetActiveTheme);

  const setThemeToDark = () => dispatch(setTheme(Themes.DARK));
  const setThemeToLight = () => dispatch(setTheme(Themes.LIGHT));

  return (
    <div className={`${styles.Wrapper} ${className}`}>
      <i
        className={`fas fa-sun ${styles.Icon} ${
          activeTheme === Themes.LIGHT && styles.Selected
        }`}
        onClick={setThemeToLight}
      />
      <i
        className={`fas fa-moon ${styles.Icon} ${
          activeTheme === Themes.DARK && styles.Selected
        }`}
        onClick={setThemeToDark}
      />
    </div>
  );
};

export default ThemeSelector;
