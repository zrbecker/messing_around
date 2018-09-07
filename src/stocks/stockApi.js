const BASE_URL = "https://api.iextrading.com/1.0";

function encodeParams(params) {
  if (params) {
    return Object.entries(params)
      .map(kv => kv.map(encodeURIComponent).join("="))
      .join("&");
  } else {
    null;
  }
}

function formatUrl(endpoint, params) {
  const paramsStr = encodeParams(params);
  if (paramsStr) {
    return `${BASE_URL}/${endpoint}?${encodeParams(params)}`;
  } else {
    return `${BASE_URL}/${endpoint}`;
  }
}

export default class StockAPI {
  constructor() {
    if (StockAPI.instance) {
      return StockAPI.instance;
    }
    StockAPI.instance = this;
    this.cache = {};
    return this;
  }

  async getData(endpoint, params) {
    const url = formatUrl(endpoint, params);
    const response = await fetch(url);
    return await response.json();
  }

  async getSupportedSymbols() {
    return await this.getData("/ref-data/symbols");
  }

  async getCompany(symbol) {
    return await this.getData(`/stock/${symbol.toLowerCase()}/company`);
  }
}
