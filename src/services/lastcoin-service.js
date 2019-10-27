export default class LastcoinService {
  _localApiBase = 'http://localhost:3033';
  _globalApiApilayerCurrencyUSD = 'http://www.apilayer.net/api/live?access_key=01e517c9716813a5c07436a8f8ab382d&format=1';
  _globalApiCbrEUR = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
  _proxyCors = 'https://cors-anywhere.herokuapp.com/';

  getProfileResources = async (url) => {
    return await new Promise((resolve) => {
      fetch(`${this._localApiBase}${url}`)
        .then((response) => response.json())
        .then((body) => resolve(body))
        .catch(() => console.log("getProfileResources error"));
    });
  };

  getPersonCashAccount = async (id) => {
    const res = await this.getProfileResources(`/profile/${id}`);
    return await res;
  };

//Get overview transaction-input
  getOverviewTransactions = async () => {
    const events = await this.getPersonEvents();
    const categories = await this.getCategories();
    return {
      events: events,
      categories: categories
    }
  };

  getPersonEvents = async () => {
    const res = await this.getProfileResources(`/events`);
    return await res;
  };

  getCategories = async () => {
    const res = await this.getProfileResources(`/categories`);
    return await res;
  };

//Del transaction
  delTransaction = async (id) => {
    await fetch(`${this._localApiBase}/events/${id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .catch(() => console.log("delTransaction error"));
  };

//Post transaction
  postTransaction = async (newEvent) => {
    await fetch(`${this._localApiBase}/events`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
      .then(res => res.json())
      .catch(() => console.log("postTransaction error"));
    console.log("post", newEvent);
  };

//Get exchange rates
  getExchangeRates = async () => {
    const currencyEUR = await this.getCurrencyEUR();
    const currencyUSD = await this.getCurrencyUSD();
    return {
      eurER: currencyEUR,
      usdER: currencyUSD
    }
  };

  getCurrencyUSD = async () => {
    return await new Promise((resolve) => {
      fetch(this._globalApiApilayerCurrencyUSD)
        .then((response) => response.json())
        .then((body) => resolve(body.quotes.USDRUB))
        .catch(() => console.log("getProfileResources error"));
    });
  };

  getCurrencyEUR = async () => {
    const xml = await fetch(this._proxyCors + this._globalApiCbrEUR)
      .then((response) => response.text())
      .then((body) => new DOMParser().parseFromString(body, "text/xml"))
      .catch(() => console.log("getExchangeRates error"));
    let rate;
    let i = 0;
    while (rate !== 'RUB') {
      i++;
      rate = xml.getElementsByTagName('Cube')[i].attributes[0].value;
    }
    return xml.getElementsByTagName('Cube')[i].attributes[1].value;
  };
};
