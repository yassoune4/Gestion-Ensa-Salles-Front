import * as Actions from '../actions';
import {useSelector} from "react-redux";

const initialState = {
    data: null
};


const evenementsUserDepartmentReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORY:
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
                ...state,
                data: action.payload
            };
        }
        case Actions.SELECT_DEPARTMENT:
        {
            console.log('ACTION: ', action);
            console.log('ACTION PAYLOAD: ', action.payload);
            console.log('STATE: ', state);
            return {
               ...state,
                data: action.payload,

            };
        }
        default:
        {
            return state;
        }
    }
};

export default evenementsUserDepartmentReducer;
