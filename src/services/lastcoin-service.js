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
        .catch((() => console.log("getProfileResources error")));
    });
  };

  getPersonCashAccount = async (id) => {
    const res = await this.getProfileResources(`/profile/${id}`);
    return await res;
  };

  getPersonEvents = async () => {
    const res = await this.getProfileResources(`/events`);
    return await res;
  };

  getCategories = async () => {
    const res = await this.getProfileResources(`/categories`);
    console.log('Categories', res);
    return await res;
  };

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
        .catch((() => console.log("getProfileResources error")));
    });
  };

  getCurrencyEUR = async () => {
    const xml = await fetch(this._proxyCors + this._globalApiCbrEUR)
      .then((response) => response.text())
      .then((body) => new DOMParser().parseFromString(body, "text/xml"))
      .catch((() => console.log("getExchangeRates error")));
    let rate;
    let i = 0;
    while (rate !== 'RUB') {
      i++;
      rate = xml.getElementsByTagName('Cube')[i].attributes[0].value;
    }
    return xml.getElementsByTagName('Cube')[i].attributes[1].value;
  };
};

// getRequiredExchangeRates = async () => {
//     const xmlString = await this.getExchangeRates();
//     console.log('ER res', xmlString);
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlString, "text/xml");
//     console.log("XML", xmlDoc);
// };

// _transformPersonCashAccount = (cashAccount) => {
//     return {
//         id: cashAccount.id,
//         firstName: cashAccount.firstName,
//         lastName: cashAccount.lastName,
//         email: cashAccount.email,
//         cardCash: cashAccount.cardCash,
//         walletCash: cashAccount.walletCash
//     };
// };
