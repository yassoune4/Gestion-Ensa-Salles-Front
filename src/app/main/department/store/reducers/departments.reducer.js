import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const departmentsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DEPARTMENTS:
        {
            console.log('ACTION PAYLOAD: ', action.payload);
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_PRODUCTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default departmentsReducer;
