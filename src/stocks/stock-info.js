// @flow

import React, { Component } from "react";
import stockAPI from "./stockApi";
import { Link } from "react-router-dom";

type PropsType = {
  symbol: string
};

type StateType = {
  isLoading: boolean,
  error: boolean,
  companyData: {
    CEO: string,
    companyName: string,
    description: string,
    exchange: string,
    industry: string,
    issueType: string,
    sector: string,
    symbol: string,
    tags: Array<string>,
    website: string
  },
  quoteData: {}
};

export default class StockInfo extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      companyData: null,
      quoteData: null
    };
  }

  componentDidMount() {
    this.loadCompanyData();
  }

  loadCompanyData() {
    this.setState({ isLoading: true, error: false }, async () => {
      try {
        const companyData = await stockAPI.getCompany(this.props.symbol);
        const quoteData = await stockAPI.getQuote(this.props.symbol);
        this.setState({
          isLoading: false,
          companyData: companyData,
          quoteData: quoteData
        });
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        this.setState({ isLoading: false, error: true });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error</div>;
    }

    return (
      <div>
        <h1>Stock Info</h1>
        <Link to={"/"}>Back to Stock List</Link>
        <hr />
        <h2>Company Data</h2>
        <pre>{JSON.stringify(this.state.companyData, null, 2)}</pre>
        <hr />
        <h2>Quote Data</h2>
        <pre>{JSON.stringify(this.state.quoteData, null, 2)}</pre>
      </div>
    );
  }
}
