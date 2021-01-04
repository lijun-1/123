import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import  notice from './reducers/notice';
import  product from './reducers/product';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    notice,
    product
})

export default createStore(rootReducer,compose(applyMiddleware(...[thunk])));