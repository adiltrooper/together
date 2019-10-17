import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import "gestalt/dist/gestalt.css";

import App from "./components/App";
import reducers from "./reducers";
import "./style.css";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
