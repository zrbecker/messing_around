// @flow

import React, { Component } from "react";
import { Link } from "react-router-dom";
import stockAPI from "./stockApi";

type StockType = {
  symbol: string,
  name: string
};

type PropsType = {
  stock: StockType
};

type StateType = {
  price: number | null
};

export default class StockRef extends Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      price: null
    };
  }

  async componentDidMount() {
    try {
      const quote = await stockAPI.getQuote(this.props.stock.symbol);
      this.setState({ price: quote.latestPrice });
    } catch (error) {
      /* Do nothing */
    }
  }

  async componentWillUnmount() {
    this.setState = () => {}
  }

  render() {
    const priceStr = this.state.price
      ? ` - $${this.state.price.toFixed(2)}`
      : null;
    const { symbol } = this.props.stock;
    return (
      <div>
        <h3>
          <Link to={`/stock/${symbol}`}>{symbol}</Link>
          <p>
            <small>
              {this.props.stock.name}
              {priceStr}
            </small>
          </p>
        </h3>
      </div>
    );
  }
}
