import React, { Component } from "react";
import StockAPI from "./stockApi";
import StockRef from "./stock-ref";

const stockAPI = new StockAPI();

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: null,
      searchTerm: "",
      isLoading: true,
      error: false
    };
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
  }

  componentDidMount() {
    this.loadStocks();
  }

  onSearchTermChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  getMatches() {
    const matches = [];
    const searchTerm = this.state.searchTerm.toLowerCase();
    if (this.state.stocks) {
      for (const stock of this.state.stocks) {
        const symbol = stock.symbol.toLowerCase();
        const name = stock.name.toLowerCase();
        if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
          matches.push(stock);
        }
        if (matches.length > 20) {
          break;
        }
      }
    }
    return matches;
  }

  loadStocks() {
    this.setState({ isLoading: true, error: false }, async () => {
      try {
        const stocks = await stockAPI.getSupportedSymbols();
        this.setState({ isLoading: false, stocks: stocks });
      } catch (error) {
        this.setState({ isLoading: false, error: true });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error Loading Data...</div>;
    }

    const matches = this.getMatches();
    return (
      <div>
        <h1>Stock List</h1>

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
          />
        ))}
      </div>
    );
  }
}
