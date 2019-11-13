import LastCoinServices from "../services/last-coin-services";

const lastCoinServiceRequest = new LastCoinServices();

const initialState = {
  profile: [],
  exchangeRates: {
    dataER: null,
    eurER: null,
    usdER: null
  },
  events: [],
  categories: [],
  loading: true,
  menuActivity: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_REQUEST':
      return {
        ...state,
        profile: [],
        loading: true,
        menuActivity: false
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
        loading: true,
        menuActivity: false
      };

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

    case 'CATEGORY_ADDED':
      return addedCategory(state, action.payload);

    case 'ACTIVATION_MENU':
      return {
        ...state,
        menuActivity: !state.menuActivity
      };

    default:
      return state;
  }
};

const extractExchangeRate = (state, data) => {
  return {
    ...state,
    exchangeRates: {
      dataER: 'test',
      eurER: parseFloat(data.cEUR.replace(',','.').replace(' ','')),
      usdER: parseFloat(data.cUSD.replace(',','.').replace(' ',''))
    }
  };
};

const extractEventsAndCategories = (state, data) => {
  return {
    ...state,
    events: data.events,
    categories: data.categories,
    loading: false
  };
};

const deleteTransaction = (state, id) => {
  const deletedEvent = state.events.find(events => events.id === id);
  const idx = state.events.indexOf(deletedEvent);

  let newProfile;
  if (deletedEvent.type === 'income') {
    newProfile = {
      ...state.profile,
      rubCardCash: state.profile.rubCardCash - deletedEvent.amount
    };
  } else {
    newProfile = {
      ...state.profile,
      rubCardCash: state.profile.rubCardCash + deletedEvent.amount
    };
  }

  lastCoinServiceRequest.delTransaction(id);
  lastCoinServiceRequest.putUpdateProfile(state.profile.id, newProfile);

  return {
    ...state,
    profile: newProfile,
    events: [
      ...state.events.slice(0, idx),
      ...state.events.slice(idx + 1)
    ]
  };
};

const addedTransaction = (state, data) => {
  const maxId = Math.max(...state.events.map(event => event.id));
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentDate = String(`${day}.${month + 1}.${year}`);

  const newEvent = {
    id: maxId + 1,
    userId: 1,
    type: data.selectedTransactionType,
    category: data.selectedCategory,
    amount: data.selectedAmount,
    walletType: "card",
    date: currentDate,
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

  lastCoinServiceRequest.postTransaction(newEvent);
  lastCoinServiceRequest.putUpdateProfile(state.profile.id, newProfile);

  return {
    ...state,
    profile: newProfile,
    events: [
      ...state.events.slice(0, maxId - 1),
      newEvent
    ]
  }
};

const addedCategory = (state, data) => {
  const maxId = Math.max(...state.categories.map(event => event.id));

  const newCategory = {
    id: maxId + 1,
    name: data.selectedCategoryName
  };

  lastCoinServiceRequest.postCategory(newCategory);
  return {
    ...state,
    categories: [
      ...state.categories.slice(0, maxId - 1),
      newCategory
    ]
  }
};

export default reducer;
