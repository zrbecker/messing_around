// @flow

import React, { Component } from "react";
import { Link } from "react-router-dom";

type StockType = {
  symbol: string,
  name: string
};

type PropsType = {
  stock: StockType
};

export default class StockRef extends Component<PropsType> {
  render() {
    const { symbol } = this.props.stock;
    return (
      <div>
        <h3>
          <Link to={`/stock/${symbol}`}>{symbol}</Link>
          <p>
            <small>{this.props.stock.name}</small>
          </p>
        </h3>
      </div>
    );
  }
}
