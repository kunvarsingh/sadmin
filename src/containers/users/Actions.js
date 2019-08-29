import {
    ADDAllUSER,
    ADDAllUSER_SECCESS,
    ADDAllUSER_ERROR,
    DELETEUSER,
    DELETEUSER_SECCESS,
    DELETEUSER_ERROR
} from './Constants';
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../../utils/constant';
import {Field, reduxForm, reset, change} from 'redux-form';



export function getalluser(data) {
    return {
        type: ADDAllUSER,
        data,
    };
}
export function getAlluserSuccess(data) {
    return {
        type: ADDAllUSER_SECCESS,
        data,
    };
}
export function getAlluserError(error) {
    return {
        type: ADDAllUSER_ERROR,
        error,
    };
}


export function deleteUser(data) {
    return {
        type: DELETEUSER,
        data,
    };
}
export function deleteUserSuccess(data) {
    return {
        type: DELETEUSER_SECCESS,
        data,
    };
}
export function deleteUserError(error) {
    return {
        type: DELETEUSER_ERROR,
        error,
    };
}




export function getUsers(data) {
    return dispatch => {
        dispatch(getalluser());
        fetch(API_URL+'getAllUsers',
             {
                // body: JSON.stringify(data),
                method: 'GET',
                headers: {'Content-Type':'application/json'},  
                })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode && res.statusCode==500){
                    toast.warning(res.message);
                }
                toast.success(res.message);
                dispatch(getAlluserSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getAlluserError(error));
            })
    }
}


export function deleteUserById(data) {
    return dispatch => {
        dispatch(deleteUser());
        fetch(API_URL+'deleteUserById/'+data,
             {
                // body: JSON.stringify(data),
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},  
                })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode && res.statusCode==500){
                     toast.warning(res.message);   
                }
                toast.success(res.message);
                dispatch(deleteUserSuccess(res));
                dispatch(getUsers());
                return res;
            })
            .catch(error => {
                dispatch(deleteUserError(error));
            })
    }
}




