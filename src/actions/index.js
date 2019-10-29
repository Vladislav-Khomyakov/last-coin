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

const historyEventsLoaded = (historyEvents) => {
  return {
    type: 'FETCH_HISTORY_EVENTS_SUCCESS',
    payload: historyEvents
  }
};

const eventsLoaded = (categories) => {
  return {
    type: 'FETCH_EVENTS_SUCCESS',
    payload: categories
  }
};

const categoriesLoaded = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    payload: categories
  }
};

const transactionAdded = (data) => {
  return {
    type: 'TRANSACTION_ADDED',
    payload: data
  }
};

const transactionRemoved = (id) => {
  return {
    type: 'TRANSACTION_REMOVED',
    payload: id
  }
};

export {
  cashAccountLoaded,
  exchangeRatesLoaded,
  historyEventsLoaded,
  eventsLoaded,
  categoriesLoaded,
  transactionRemoved,
  transactionAdded
};
