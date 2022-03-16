import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();