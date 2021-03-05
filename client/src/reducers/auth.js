import {
    USER_LOADING,
    LOGIN_SUCCESS, 
    // USER_LOADED,
    // LOGIN_FAIL,
    // AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    isAuthenticated: false,
    user: null
}

function authReducer (state=initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
    
        default:
            return state
    }
}

export default authReducer;