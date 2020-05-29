import * as Actions from '../actions';
import {useSelector} from "react-redux";

const initialState = {
    data: null
};


const productReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SALLE:
        {

            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_PRODUCT:
        {
            console.log('ACTION PAYLOAD: ', action.payload);
            console.log('STATE: ', state);
            return {
                state
            };
        }
        case Actions.SAVE_EVENT:
        {
            return {
               ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default productReducer;
