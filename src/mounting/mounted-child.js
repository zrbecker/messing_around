import React, { Component } from "react";

export default class MountedChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.clicked = this.clicked.bind(this);
    this.clear = this.clear.bind(this);
  }

  clicked() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  clear() {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.clicked}>Click</button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}
