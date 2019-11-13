import {_ApiBase, _proxyCors, _globalApiCbrRF} from './constants';

export default class LastCoinServices {
  getResources = async (url) => {
    return await new Promise((resolve) => {
      fetch(`${_ApiBase}${url}`)
        .then((response) => response.json())
        .then((body) => resolve(body))
        .catch((e) => console.log("getResources error:", e));
    });
  };

//Profile
  getProfile = async (id) => {
    const res = await this.getResources(`/profile/${id}`);
    return await res;
  };

  putUpdateProfile = async (id, newProfile) => {
    await fetch(`${_ApiBase}/profile/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProfile)
    })
      .then(res => res.json())
      .catch((e) => console.log("putUpdateProfile error:", e));
  };

//Get events and categories transaction-input
  getEventsAndCategories = async () => {
    const events = await this.getPersonEvents();
    const categories = await this.getCategories();
    return {
      events: events,
      categories: categories
    }
  };

  getPersonEvents = async () => {
    const res = await this.getResources(`/events`);
    return await res;
  };

  getCategories = async () => {
    const res = await this.getResources(`/categories`);
    return await res;
  };

//Del transaction
  delTransaction = async (id) => {
    await fetch(`${_ApiBase}/events/${id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .catch((e) => console.log("delTransaction error:", e));
  };

//Post transaction
  postTransaction = async (newEvent) => {
    await fetch(`${_ApiBase}/events`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
      .then(res => res.json())
      .catch((e) => console.log("postTransaction error:", e));
  };

//Post category
  postCategory = async (newCategory) => {
    await fetch(`${_ApiBase}/categories`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
      .then(res => res.json())
      .catch((e) => console.log("postTransaction error:", e));
  };

//Get exchange rates
  /*getCurrencyUSD = async () => {
    return await new Promise((resolve) => {
      fetch(_globalApiApilayerCurrencyUSD)
        .then((response) => response.json())
        .then((body) => resolve(body.quotes.USDRUB))
        .catch((e) => console.log("getResources error:", e));
    });
  };*/

  getExchangeRates = async () => {
    const xml = await fetch(_proxyCors + _globalApiCbrRF)
      .then((response) => response.text())
      .then((body) => new DOMParser().parseFromString(body, "text/xml"))
      .catch((e) => console.log("getExchangeRates error:", e));
    let cEUR;
    let cUSD;
    for (let i = 0; i < 30; i++) {
      const rate = xml.getElementsByTagName('CharCode')[i].textContent;
      if (rate === 'EUR') {
        cEUR = xml.getElementsByTagName('Value')[i].textContent;
      } else if (rate === 'USD') {
        cUSD = xml.getElementsByTagName('Value')[i].textContent;
      }
    }
    return {
      cEUR: cEUR,
      cUSD: cUSD
    };
  };
}
