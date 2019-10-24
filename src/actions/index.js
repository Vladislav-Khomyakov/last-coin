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

export {
    cashAccountLoaded,
    exchangeRatesLoaded
};
