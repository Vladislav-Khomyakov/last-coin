const initialState = {
    profile: [],
    exchangeRates: {
        rubER: null,
        eurER: null,
        usrER: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CASH_ACCOUNT_SUCCESS':
            return {
                profile: action.payload,
                exchangeRates: state.exchangeRates
            };

        case 'FETCH_EXCHANGE_RATES_SUCCESS':
            return extractExchangeRate(state, action.payload);

        default:
            return state;
    }
};

const extractExchangeRate = (state, data) => {
    console.log('State', state);
    console.log('Data', data);
    return {
        profile: state.profile,
        exchangeRates: data
    };
};

export default reducer;
