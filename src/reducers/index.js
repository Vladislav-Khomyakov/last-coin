const initialState = {
    profile: [],
    exchangeRates: {
        dataER: null,
        eurER: null,
        usdER: null
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
    //console.log('State', state);
    //console.log('Data', data.eurRates);
    return {
        profile: state.profile,
        exchangeRates: {
            dataER: 'test',
            eurER: data.eurRates,
            usdER: data.usdRates
        }
    };
};

export default reducer;
