const cashAccountLoaded = (profile) => {
    return {
        type: 'FETCH_CASH_ACCOUNT_SUCCESS',
        payload: profile
    };
};

export {
    cashAccountLoaded
};
