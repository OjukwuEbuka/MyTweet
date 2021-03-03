import { combineReducers } from 'redux';

import authReducer from './auth';

const RootReducer = combineReducers({
    reduce: () => 'Reducer',
    authReducer
})

export default RootReducer;