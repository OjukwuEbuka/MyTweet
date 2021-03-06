import {lookup} from '../lookup';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS
} from "./types";

export const login = loginData => dispatch => {

    lookup('POST', '/auth/login', (stat, data) => {
        if(stat === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: data
            })
        }
    }, loginData, {
        "Content-Type": "application/json"
    })
}

export const loadUser = () => (dispatch, getState) => {
    const token = getState().authReducer.token
    lookup('POST', '/auth/user', (stat, data) => {
        if(stat === 200){
            dispatch({
                type: USER_LOADED,
                payload: data
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: data
            })
        }
    }, {}, {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
    } )
}

export const logout = () => (dispatch, getState) => {
    const token = getState().authReducer.token
    lookup('POST', '/auth/logout', (stat, data) => {
        if(stat === 204){
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: data
            })
        }
    }, {}, {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
    } )
}