import {combineReducers} from 'redux';
import products from './departments.reducer';
import product from './department.reducer';

const reducer = combineReducers({
    products,
    product

});

export default reducer;
