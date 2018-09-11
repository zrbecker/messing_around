import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import LazyLoader from "./stocks/lazy-loader";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <LazyLoader
                  loader={async () => {
                    const StockList = (await import("./stocks/stock-list")).default;
                    return <StockList />;
                  }}
                />
              )}
            />
            <Route
              exact
              path="/stock/:symbol"
              component={({ match }) => (
                <LazyLoader
                  loader={async () => {
                    const StockInfo = (await import("./stocks/stock-info")).default;
                    return <StockInfo symbol={match.params.symbol} />;
                  }}
                />
              )}
            />
            <Route
              exact
              path="/d3learn"
              component={({ match }) => (
                <LazyLoader
                  loader={async () => {
                    const D3Learn = (await import("./d3learn/d3learn")).default;
                    return <D3Learn symbol={match.params.symbol} />;
                  }}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}
