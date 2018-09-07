// @flow

import React, { Component } from "react";
import StockAPI from "./stockApi";
import {Link} from "react-router-dom";

const stockAPI = new StockAPI();

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
  }
};

export default class StockInfo extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      companyData: null
    };
  }

  componentDidMount() {
    this.loadCompanyData();
  }

  loadCompanyData() {
    this.setState({ isLoading: true, error: false }, async () => {
      try {
        const companyData = await stockAPI.getCompany(this.props.symbol);
        this.setState({ isLoading: false, companyData: companyData });
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
        <Link to={"/"}>Back to Stock List</Link>
        <pre>{JSON.stringify(this.state.companyData, null, 2)}</pre>
      </div>
    );
  }
}
