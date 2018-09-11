// @flow
import React from "react";
import ReactDOM from "react-dom";
import App from "./app"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

let rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.render(
    <div><App /></div>,
    rootElement
  );
}
