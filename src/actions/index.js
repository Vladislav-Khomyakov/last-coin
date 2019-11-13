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
  };
};

const eventsAndCategoriesLoaded = (eventsAndCategories) => {
  return {
    type: 'FETCH_EVENTS_AND_CATEGORIES_SUCCESS',
    payload: eventsAndCategories
  };
};

const exchangeRatesLoaded = (exchangeRates) => {
  return {
    type: 'FETCH_EXCHANGE_RATES_SUCCESS',
    payload: exchangeRates
  };
};

const transactionAdded = (data) => {
  return {
    type: 'TRANSACTION_ADDED',
    payload: data
  };
};

const transactionRemoved = (id) => {
  return {
    type: 'TRANSACTION_REMOVED',
    payload: id
  };
};

const categoryAdded = (data) => {
  return {
    type: 'CATEGORY_ADDED',
    payload: data
  };
};

const activationMenu = () => {
  return {
    type: 'ACTIVATION_MENU'
  };
};

const fetchProfile = (lastCoinServiceRequest, dispatch) => (id) => {
  dispatch(ProfileRequest());
  lastCoinServiceRequest.getProfile(id)
    .then((data) => dispatch(ProfileLoaded(data)))
    .catch((err) => console.log('fetchCashAccount', err))
};

const fetchEventsAndCategories = (lastCoinServiceRequest, dispatch) => () => {
  dispatch(eventsAndCategoriesRequest());
  lastCoinServiceRequest.getEventsAndCategories()
    .then((data) => dispatch(eventsAndCategoriesLoaded(data)))
    .catch((err) => console.log('fetchEventsAndCategories', err))
};

const fetchEventsAndCategoriesUpdate = (lastCoinServiceRequest, dispatch) => () => {
  lastCoinServiceRequest.getEventsAndCategories()
    .then((data) => dispatch(eventsAndCategoriesLoaded(data)))
    .catch((err) => console.log('fetchEventsAndCategories', err))
};

const fetchExchangeRates = (lastCoinServiceRequest, dispatch) => () => {
  lastCoinServiceRequest.getExchangeRates()
    .then((data) => dispatch(exchangeRatesLoaded(data)))
    .catch((err) => console.log('fetchExchangeRates', err))
};

export {
  transactionRemoved,
  transactionAdded,
  fetchEventsAndCategories,
  fetchEventsAndCategoriesUpdate,
  fetchProfile,
  fetchExchangeRates,
  categoryAdded,
  activationMenu
};
