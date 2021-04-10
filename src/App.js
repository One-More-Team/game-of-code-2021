import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import {
  GetSiteLanguageId,
  GetSiteLanguageMessages,
} from "./store/selectors/app-selector";
import SignIn from "./auth/sign-in/sign-in";
import SignUp from "./auth/sign-up/sign-up";
import { GetUser } from "./store/selectors/auth-selectors";
import AppPreloader from "./components/app-preloader/app-preloader";
import DeviceChooser from "./components/device-chooser/device-chooser";
import Home from "./components/home/home";

import "./App.css";
import Dialog from "./components/dialog/dialog";

const App = () => {
  const user = useSelector(GetUser);
  const siteLanguageId = useSelector(GetSiteLanguageId);
  const siteLanguageMessages = useSelector(GetSiteLanguageMessages);

  const redirectToHome = () => (
    <Redirect
      to={{
        pathname: "/home",
      }}
    />
  );

  const redirectToLogin = () => (
    <Redirect
      to={{
        pathname: "/sign-in",
      }}
    />
  );

  return (
    <IntlProvider
      locale={siteLanguageId}
      messages={siteLanguageMessages}
      onError={() => {}}
    >
      <BrowserRouter basename="/">
        <div className="App">
          <div className="base-background" />
          <AppPreloader />
          <Dialog />
          {user ? (
            <>
              <Switch>
                <Route exact path="/" component={redirectToHome} />
                <Route path="/home" component={Home} />
                <Route path="/sign-in" render={redirectToHome} />
                <Route path="/sign-up" render={redirectToHome} />
                <Route path="/device-chooser" render={DeviceChooser} />
              </Switch>
            </>
          ) : (
            <>
              <Switch>
                <Route exact path="/" component={redirectToLogin} />
                <Route path="/home" component={redirectToLogin} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </>
          )}
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
