import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import IndexSaga from "./saga/index";
import authReducer from "./store/reducers/auth-reducer";
import appReducer from "./store/reducers/app-reducer";

import App from "./App";

import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // TODO add here actions when they ara flooding react debugger
    })
  : compose;

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  authReducer,
  appReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(IndexSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
