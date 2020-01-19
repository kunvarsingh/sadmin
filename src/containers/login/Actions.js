import {
    LOGIN,
    LOGIN_SECCESS,
    LOGIN_ERROR,
} from './Constants';
import {API_URL} from '../../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import history from '../../utils/history';

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


export function login(data,props) {
    console.log('inside action',data);
    return dispatch => {
        dispatch(getLogin());
        fetch(API_URL+'adminLogin',{
            method:'POST',
            body: JSON.stringify(data),
            // headers: jsonApiHeader('','application/json'),
            headers: {'Content-Type':'application/json'},
        })
            .then(res => res.json())
            .then(res => {
                if(res.status===400){
                    toast.error(res.message);
                    return false;
                }else{
                     props.history.push('/dashboard/users');
                    toast.success(res.message);
                    dispatch(getLoginSuccess(res));
                    localStorage.setItem('authToken',res.token)
                    return res;
                }
            })
            .catch(error => {
                dispatch(getLoginError(error));
            })
    }
}

