import {
    USER_LOADING,
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS,
    USER_LOADED,
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
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            console.log(action)
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                token: null
            }
    
        default:
            return state
    }
}

export default authReducer;