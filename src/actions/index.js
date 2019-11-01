const ProfileRequest = () => {
  return {
    type: 'FETCH_PROFILE_REQUEST'
  };
};

const ProfileLoaded = (profile) => {
  return {
    type: 'FETCH_PROFILE_SUCCESS',
    payload: profile
  };
};

const eventsAndCategoriesRequest = () => {
  return {
    type: 'FETCH_EVENTS_AND_CATEGORIES_REQUEST'
  }
};

const eventsAndCategoriesLoaded = (eventsAndCategories) => {
  return {
    type: 'FETCH_EVENTS_AND_CATEGORIES_SUCCESS',
    payload: eventsAndCategories
  }
};

const exchangeRatesLoaded = (exchangeRates) => {
  return {
    type: 'FETCH_EXCHANGE_RATES_SUCCESS',
    payload: exchangeRates
  };
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

const fetchProfile = (lastcoinService, dispatch) => (id) => {
  dispatch(ProfileRequest());
  lastcoinService.getProfile(id)
    .then((data) => dispatch(ProfileLoaded(data)))
    .catch((err) => console.log('fetchCashAccount', err))
};

const fetchEventsAndCategories = (lastcoinService, dispatch) => () => {
  dispatch(eventsAndCategoriesRequest());
  lastcoinService.getEventsAndCategories()
    .then((data) => dispatch(eventsAndCategoriesLoaded(data)))
    .catch((err) => console.log('fetchEventsAndCategories', err))
};

const fetchExchangeRates = (lastcoinService, dispatch) => () => {
  lastcoinService.getExchangeRates()
    .then((data) => dispatch(exchangeRatesLoaded(data)))
    .catch((err) => console.log('fetchExchangeRates', err))
};

export {
  exchangeRatesLoaded,
  eventsAndCategoriesLoaded,
  eventsLoaded,
  categoriesLoaded,
  transactionRemoved,
  transactionAdded,
  fetchEventsAndCategories,
  fetchProfile,
  fetchExchangeRates
};
