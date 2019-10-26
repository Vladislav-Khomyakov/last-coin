const cashAccountLoaded = (profile) => {
  return {
    type: 'FETCH_CASH_ACCOUNT_SUCCESS',
    payload: profile
  };
};

const exchangeRatesLoaded = (exchangeRates) => {
  return {
    type: 'FETCH_EXCHANGE_RATES_SUCCESS',
    payload: exchangeRates
  };
};

const eventsLoaded = (events) => {
  return {
    type: 'FETCH_EVENTS_SUCCESS',
    payload: events
  }
};

const categoriesLoaded = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    payload: categories
  }
};

export {
  cashAccountLoaded,
  exchangeRatesLoaded,
  eventsLoaded,
  categoriesLoaded
};
