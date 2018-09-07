import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import StockList from "./stock-list";
import StockInfo from "./stock-info";

export default class Stock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route exact path="/" component={StockList} />
            <Route
              exact
              path="/stock/:symbol"
              component={({ match }) => {
                return <StockInfo symbol={match.params.symbol} />;
              }}
            />
          </div>
        </Router>
      </div>
    );
  }
}
