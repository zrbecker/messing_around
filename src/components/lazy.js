import React, { Component } from "react";

import style from "./lazy.useable.css";

export default class Lazy extends Component {
  componentWillMount() {
    style.use();
  }

  componentWillUnmount() {
    style.unuse();
  }

  render() {
    return (
      <div className={style.locals.mylazybox}>Lazy Box</div>
    );
  }
}
