import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";

import Button, { ButtonStyle } from "./ui/button/button";
import {
  GetSiteLanguageId,
  GetSiteLanguageMessages,
} from "./store/selectors/app-selector";

import "./App.css";

const App = () => {
  const siteLanguageId = useSelector(GetSiteLanguageId);
  const siteLanguageMessages = useSelector(GetSiteLanguageMessages);

  return (
    <IntlProvider
      locale={siteLanguageId}
      messages={siteLanguageMessages}
      onError={() => {}}
    >
      <div className="App">
        <Button style={ButtonStyle.Primary} messageId={"sign-in"} />
        <Button style={ButtonStyle.Primary} messageId={"sign-up"} />
      </div>
    </IntlProvider>
  );
};

export default App;
