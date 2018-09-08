// @flow
import React from "react";
import ReactDOM from "react-dom";
import Stock from "./stocks/stock"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

let rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.render(
    <div><Stock /></div>,
    rootElement
  );
}
