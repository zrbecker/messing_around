// @flow

import React, { Component } from "react";

type StockType = {
  symbol: string,
  name: string
};

type PropsType = {
  stock: StockType,
  onClick: string => void
};

export default class StockRef extends Component<PropsType> {
  render(): global.JSX.Element {
    return (
      <div>
        <h3>
          <button
            onClick={(): void => this.props.onClick(this.props.stock)}
            className="btn btn-link"
          >
            {this.props.stock.symbol}
          </button>
          <p>
            <small>{this.props.stock.name}</small>
          </p>
        </h3>
      </div>
    );
  }
}
