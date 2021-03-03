import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';

const middlewares = [thunk];
const createWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createWithMiddleware(RootReducer);