import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';

const middlewares = [thunk];
// const createWithMiddleware = applyMiddleware(...middlewares)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(...middlewares)));



// export const store = createWithMiddleware(RootReducer);