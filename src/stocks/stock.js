import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import LazyLoader from "./lazy-loader";

export default class Stock extends Component {
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
                    const StockList = (await import("./stock-list")).default;
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
                    const StockInfo = (await import("./stock-info")).default;
                    return <StockInfo symbol={match.params.symbol} />;
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
