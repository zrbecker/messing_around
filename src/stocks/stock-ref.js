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
  price: number | null,
  description: string | null
};

export default class StockRef extends Component<PropsType, StateType> {
  // TODO: This is considered an anti pattern. Consider cancelable promise.
  _isMounted: boolean;
  
  constructor(props: PropsType) {
    super(props);
    this.state = {
      description: null,
      price: null
    };
    this._isMounted = true;
  }

  async getData() {
    try {
      const quote = await stockAPI.getQuote(this.props.stock.symbol);
      await new Promise(res => setTimeout(() => res(), 1000));
      const company = await stockAPI.getCompany(this.props.stock.symbol);
      if (this._isMounted) {
        this.setState({
          price: quote.latestPrice,
          description: company.description
        });
      }
    } catch (error) {
      /* Do nothing */
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        <p>{this.state.description}</p>
      </div>
    );
  }
}
