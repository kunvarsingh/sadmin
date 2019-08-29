import {
    SINGUP,
    SINGUP_SECCESS,
    SINGUP_ERROR,
} from './Constants';

import {API_URL} from '../../utils/constant';

export function getsignup(data) {
    return {
        type: SINGUP,
        data,
    };
}

export function getsignupSuccess(data) {
    return {
        type: SINGUP_SECCESS,
        data,
    };
}
export function getsignupError(error) {
    return {
        type: SINGUP_ERROR,
        error,
    };
}



export function signup(data) {
    return dispatch => {
        dispatch(getsignup());
        fetch(API_URL+'registration',
             {
                body: JSON.stringify(data),
                method: 'post',
                  // headers: jsonApiHeader(getState().login.access_token, 'application/json'),
                })
            .then(res => res.json())
            .then(res => {
                debugger
                if (res.error) {
                    throw (res.error);
                }
                dispatch(getsignupSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getsignupError(error));
            })
    }
}



