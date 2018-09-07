import React, { Component } from "react";

import MountedChild from "./mounted-child";

export default class MountingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: 0
    };
    this.switchVersion = this.switchVersion.bind(this);
  }

  switchVersion() {
    this.setState(({ version }) => ({ version: 1 - version }));
  }

  render() {
    if (this.state.version === 0) {
      return (
        <div>
          <h3>Version 0</h3>
          <MountedChild />
          <button className="btn btn-primary" onClick={this.switchVersion}>
            Switch
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Version 1</h3>
          <div>
            <MountedChild />
          </div>
          <button className="btn btn-primary" onClick={this.switchVersion}>
            Switch
          </button>
        </div>
      );
    }
  }
}
