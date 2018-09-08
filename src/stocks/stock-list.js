import React, { Component } from "react";
import stockAPI from "./stockApi";
import StockRef from "./stock-ref";

import localCache from "./local-cache";

const LIMIT = 20;

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: null,
      searchTerm: "",
      sector: "",
      isLoading: true,
      error: false,
      offset: 0
    };
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onSectorChange = this.onSectorChange.bind(this);
    this.onClickPrevious = this.onClickPrevious.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  componentDidMount() {
    this.loadStocks();
  }

  onSearchTermChange(e) {
    this.setState({ searchTerm: e.target.value, offset: 0 });
  }

  onSectorChange(e) {
    this.setState({ sector: e.target.value, offset: 0 });
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
      }
    }
    return matches;
  }

  loadStocks() {
    this.setState({ isLoading: true, error: false }, async () => {
      try {
        const LOCAL_STOCKS_KEY = "StockList.state.stocks";
        const localStocks = localCache.get(LOCAL_STOCKS_KEY);
        if (localStocks) {
          this.setState({ isLoading: false, stocks: localStocks });
        } else {
          const stocks = await stockAPI.getSupportedSymbols();
          localCache.set(LOCAL_STOCKS_KEY, stocks, 3600 * 1000);
          this.setState({ isLoading: false, stocks: stocks });
        }
      } catch (error) {
        this.setState({ isLoading: false, error: true });
      }
    });
  }

  onClickNext() {
    this.setState(({ offset }) => ({ offset: offset + LIMIT }));
  }

  onClickPrevious() {
    this.setState(({ offset }) => ({ offset: Math.max(0, offset - LIMIT) }));
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error Loading Data...</div>;
    }

    const matches = this.getMatches();
    const hasPrevious = this.state.offset > 0;
    const hasNext = this.state.offset + LIMIT < matches.length;
    const page = Math.floor(this.state.offset / LIMIT) + 1;
    const numPages = Math.ceil(matches.length / LIMIT);

    const start = this.state.offset;
    const end = this.state.offset + LIMIT;
    return (
      <div>
        <h1>Stock List</h1>
        <h2>Search Stock Symbols</h2>
        <form>
          <div className="form-group">
            <label>Symbol/Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.searchTerm}
              onChange={this.onSearchTermChange}
            />
          </div>
        </form>
        <hr />
        Page {page} of {numPages}.
        <button
          className="btn btn-link"
          onClick={this.onClickPrevious}
          disabled={!hasPrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-link"
          onClick={this.onClickNext}
          disabled={!hasNext}
        >
          Next
        </button>
        {matches.slice(start, end).map(stock => (
          <StockRef key={stock.symbol} stock={stock} />
        ))}
      </div>
    );
  }
}
