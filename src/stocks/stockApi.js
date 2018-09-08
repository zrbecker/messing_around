import _ from "lodash";

const BASE_URL = "https://api.iextrading.com/1.0";
const THROTTLE_MS = 10;

/* URL Utilities */
function encodeParams(params) {
  if (params) {
    return Object.entries(params)
      .map(kv => kv.map(encodeURIComponent).join("="))
      .join("&");
  } else {
    null;
  }
}

function formatUrl(baseUrl, endpoint, params) {
  const paramsStr = encodeParams(params);
  if (paramsStr) {
    return `${baseUrl}/${endpoint}?${encodeParams(params)}`;
  } else {
    return `${baseUrl}/${endpoint}`;
  }
}
/* End URL Utilities */

class StockAPI {
  constructor(baseURL) {
    this._baseURL = baseURL;
    this._symbols = new Set();
    this._types = new Set();
    this._callbacks = new Array();
    this._throttledBatch = _.throttle(() => this._batch(), THROTTLE_MS, {
      leading: false,
      trailing: true
    });
  }

  /* public methods */
  async getSupportedSymbols() {
    return await this._getData("/ref-data/symbols");
  }

  async getQuote(symbol) {
    return await this._getTypeForSymbol("quote", symbol);
  }

  async getCompany(symbol) {
    return await this._getTypeForSymbol("company", symbol);
  }
  /* end public methods */

  /* private methods */
  async _getData(endpoint, params) {
    const url = formatUrl(this._baseURL, endpoint, params);
    const response = await fetch(url);
    return await response.json();
  }

  async _batch() {
    // prepare batch parameters
    const batchParams = {
      symbols: [...this._symbols].join(","),
      types: [...this._types].join(",")
    };
    const callbacks = [...this._callbacks];

    // reset batch parameters
    this._symbols.clear();
    this._types.clear();
    this._callbacks = [];

    // make batch call
    const response = await this._getData("/stock/market/batch", batchParams);
    callbacks.forEach(callback => callback(response));
  }

  _getTypeForSymbol(type: string, symbol: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // sanitize parameters
        symbol = symbol.toUpperCase();
        type = type.toLowerCase();

        // add to batch parameters
        this._symbols.add(symbol);
        this._types.add(type);
        this._callbacks.push(response => resolve(response[symbol][type]));

        // indicate batch needs to be called
        await this._throttledBatch();
      } catch (error) {
        reject(error);
      }
    });
  }
  /* end private methods */
}

// global instance for all requests to go through.
export default new StockAPI(BASE_URL);
