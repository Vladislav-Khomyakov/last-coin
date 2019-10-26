const initialState = {
  profile: [],
  exchangeRates: {
    dataER: null,
    eurER: null,
    usdER: null
  },
  events: [],
  categories: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CASH_ACCOUNT_SUCCESS':
      return {
        ...state,
        profile: action.payload
      };

    case 'FETCH_EXCHANGE_RATES_SUCCESS':
      return extractExchangeRate(state, action.payload);

    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        events: action.payload
      };

    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload
      };

    default:
      return state;
  }
};

const extractExchangeRate = (state, data) => {
  //console.log('State', state);
  //console.log('Data', data.quotes.USDRUB);
  return {
    ...state,
    exchangeRates: {
      dataER: 'test',
      eurER: data.eurER,
      usdER: data.usdER
    }
  };
};

export default reducer;
