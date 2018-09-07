import React, { Component } from "react";

export default class LazyParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lazyComponent: null
    };
  }

  async toggleLazyComponent() {
    const Lazy = (await import("./lazy")).default;
    this.setState(state => {
      if (state.lazyComponent) {
        return { lazyComponent: null };
      } else {
        return { lazyComponent: <Lazy /> };
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleLazyComponent()}>Show Lazy</button>
        {this.state.lazyComponent}
      </div>
    );
  }
}
