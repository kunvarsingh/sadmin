import {
    LOGIN,
    LOGIN_SECCESS,
    LOGIN_ERROR,
} from './Constants';
import {API_URL} from '../../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';

export function getLogin(data) {
    return {
        type: LOGIN,
        data,
    };
}

export function getLoginSuccess(data) {
    return {
        type: LOGIN_SECCESS,
        data,
    };
}
export function getLoginError(error) {
    return {
        type: LOGIN_ERROR,
        error,
    };
}


export function login(data) {
    return dispatch => {
        dispatch(getLogin());
        fetch(API_URL+'adminLogin',{
            method:'POST',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    toast.warning(res.message);
                    throw (res.error);
                }
                toast.success(res.message);
                dispatch(getLoginSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getLoginError(error));
            })
    }
}

