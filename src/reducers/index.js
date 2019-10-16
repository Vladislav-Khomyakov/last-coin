const initialState = {
    test: 'reducer say hello'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CASH_ACCOUNT_SUCCESS':
            return {
                test: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
