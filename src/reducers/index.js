const initialState = {
    profile: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CASH_ACCOUNT_SUCCESS':
            return {
                profile: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
