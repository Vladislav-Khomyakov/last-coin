import LastcoinService from "../services/lastcoin-service";

const lastcoinService = new LastcoinService();

const initialState = {
  profile: [],
  exchangeRates: {
    dataER: null,
    eurER: null,
    usdER: null
  },
  events: [],
  categories: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_REQUEST':
      return {
        ...state,
        profile: [],
        loading: true
      };

    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case 'FETCH_EXCHANGE_RATES_SUCCESS':
      return extractExchangeRate(state, action.payload);

    case 'FETCH_EVENTS_AND_CATEGORIES_REQUEST':
      return {
        ...state,
        events: [],
        categories: [],
        loading: true
      }

    case 'FETCH_EVENTS_AND_CATEGORIES_SUCCESS':
      return extractEventsAndCategories(state, action.payload);

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

    case 'TRANSACTION_ADDED':
      return addedTransaction(state, action.payload);

    case 'TRANSACTION_REMOVED':
      return deleteTransaction(state, action.payload);

    default:
      return state;
  }
};

const extractExchangeRate = (state, data) => {
  return {
    ...state,
    exchangeRates: {
      dataER: 'test',
      eurER: data.eurER,
      usdER: data.usdER
    }
  };
};

const extractEventsAndCategories = (state, data) => {
  console.log(data);
  return {
    ...state,
    events: data.events,
    categories: data.categories,
    loading: false
  };
};

const deleteTransaction = (state, id) => {
  lastcoinService.delTransaction(id);

  return {
    ...state,
    events: [
      ...state.events.slice(0, id),
      ...state.events.slice(id + 1)
    ]
  };
};

const addedTransaction = (state, data) => {
  const maxId = Math.max(...state.events.map(event => event.id));

  const newEvent = {
    id: maxId + 1,
    userId: 1,
    type: data.selectedTransactionType,
    category: data.selectedCategory,
    amount: data.selectedAmount,
    walletType: "card",
    date: "28.10.2019",
    description: data.selectedDescription
  };

  let newProfile;
  if (data.selectedTransactionType === 'income') {
    newProfile = {
      ...state.profile,
      rubCardCash: state.profile.rubCardCash + data.selectedAmount
    };
  } else {
    newProfile = {
      ...state.profile,
      rubCardCash: state.profile.rubCardCash - data.selectedAmount
    };
  }

  lastcoinService.postTransaction(newEvent);
  lastcoinService.putUpdateProfile(state.profile.id, newProfile);

  return {
    ...state,
    profile: newProfile,
    events: [
      state.events.slice(0, maxId - 1),
      newEvent
    ]
  }
};

export default reducer;
