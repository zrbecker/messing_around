import React, { Component } from "react";
import StockRef from "./stock-ref";

const BASE_URL = "https://api.iextrading.com/1.0";

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchTerm: "",
      selectedStock: null
    };
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onStockClicked = this.onStockClicked.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onSearchTermChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  async fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/ref-data/symbols`);
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      /* Do Nothing */
    }
  }

  async onStockClicked(stock) {
    try {
      const response = await fetch(`${BASE_URL}/stock/${stock.symbol}/company`);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      /* Do Nothing */
    }
  }

  getMatches() {
    const matches = [];
    if (this.state.data) {
      for (const stock of this.state.data) {
        if (
          stock.symbol
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        ) {
          matches.push(stock);
        }
        if (matches.length > 20) {
          break;
        }
      }
    }
    return matches;
  }

  render() {
    const matches = this.getMatches();
    return (
      <div>
        <div className="container">
          <h1>Stocks</h1>

          <h2>Search Stock Symbols</h2>
          <input
            type="text"
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.onSearchTermChange}
          />

          <hr />

          {matches.map(stock => (
            <StockRef
              key={stock.symbol}
              stock={stock}
              onClick={this.onStockClicked}
            />
          ))}
        </div>
      </div>
    );
  }
}
