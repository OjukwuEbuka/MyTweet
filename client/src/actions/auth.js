import {lookup} from '../lookup';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    // AUTH_ERROR
} from "./types";

export const login = loginData => dispatch => {

    console.log('login function')
    lookup('POST', '/auth/login', (res) => {
        if(res.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: res.data
            })
        }
    }, loginData, {
        "Content-Type": "application/json"
    })
}
