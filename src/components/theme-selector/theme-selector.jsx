import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Themes } from "../../enum/themes";
import { setTheme } from "../../store/actions/app-action";
import { GetActiveTheme } from "../../store/selectors/app-selector";
import Button, { ButtonStyle } from "../../ui/button/button";

import styles from "./theme-selector.module.scss";

const ThemeSelector = ({ className }) => {
  const dispatch = useDispatch();
  const activeTheme = useSelector(GetActiveTheme);

  const setThemeToDark = () => dispatch(setTheme(Themes.DARK));
  const setThemeToLight = () => dispatch(setTheme(Themes.LIGHT));

  return (
    <div className={`${styles.Wrapper} ${className}`}>
      <Button
        icon="fa-sun"
        onClick={setThemeToLight}
        style={ButtonStyle.Quaternary}
        selected={activeTheme === Themes.LIGHT}
      />
      <Button
        icon="fa-moon"
        onClick={setThemeToDark}
        style={ButtonStyle.Quaternary}
        selected={activeTheme === Themes.DARK}
      />
    </div>
  );
};

export default ThemeSelector;
