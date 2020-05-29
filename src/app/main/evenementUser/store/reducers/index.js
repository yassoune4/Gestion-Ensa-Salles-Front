import {combineReducers} from 'redux';
import products from './evenementsUser.reducer';
import product from './evenementsUserDepartment.reducer';
import product2 from './evenementsUserFields.reducer';

const reducer = combineReducers({
    products,
    product,
    product2

});

export default reducer;
