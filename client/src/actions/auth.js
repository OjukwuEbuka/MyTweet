import {lookup} from '../lookup';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR
} from "./types";

export const login = loginData => dispatch => {

    lookup('POST', '/api/accounts/login', (res) => {
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
    }, loginData)
}
