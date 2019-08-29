import {
    ADDSERVICE,
    ADDSERVICE_SECCESS,
    ADDSERVICE_ERROR,
    ADDAllSERVICE,
    ADDAllSERVICE_SECCESS,
    ADDAllSERVICE_ERROR,
    DELETESERVICE,
    DELETESERVICE_ERROR,
    DELETESERVICE_SECCESS,
    GETBYIDSERVICE,
    GETBYIDSERVICE_SECCESS,
    GETBYIDSERVICE_ERROR
} from './Constants';
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../../utils/constant';
import {Field, reduxForm, reset, change} from 'redux-form';

export function getservice(data) {
    return {
        type: ADDSERVICE,
        data,
    };
}

export function getserviceSuccess(data) {
    return {
        type: ADDSERVICE_SECCESS,
        data,
    };
}
export function getserviceError(error) {
    return {
        type: ADDSERVICE_ERROR,
        error,
    };
}

export function getallservice(data) {
    return {
        type: ADDAllSERVICE,
        data,
    };
}
export function getAllserviceSuccess(data) {
    return {
        type: ADDAllSERVICE_SECCESS,
        data,
    };
}
export function getAllserviceError(error) {
    return {
        type: ADDAllSERVICE_ERROR,
        error,
    };
}


export function deleteservice(data) {
    return {
        type: DELETESERVICE,
        data,
    };
}
export function deleteserviceSuccess(data) {
    return {
        type: DELETESERVICE_SECCESS,
        data,
    };
}
export function deleteserviceError(error) {
    return {
        type: DELETESERVICE_ERROR,
        error,
    };
}


export function getByIdservice(data) {
    return {
        type: GETBYIDSERVICE,
        data,
    };
}
export function getByIdserviceSuccess(data) {
    return {
        type: GETBYIDSERVICE_SECCESS,
        data,
    };
}
export function getByIdserviceError(error) {
    return {
        type: GETBYIDSERVICE_ERROR,
        error,
    };
}



export function addService(data) {
    return dispatch => {
        dispatch(getservice());
        fetch(API_URL+'addService',
             {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode && res.statusCode==500){
                    toast.warning(res.message);
                }
                toast.success(res.message);
                dispatch(getserviceSuccess(res));
                dispatch(getServices());
                dispatch(reset('serviceForm'));
                return res;
            })
            .catch(error => {
                dispatch(getserviceError(error));
            })
    }
}


export function getServices(data) {
    return dispatch => {
        dispatch(getallservice());
        fetch(API_URL+'getAllServices',
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
                dispatch(getAllserviceSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getAllserviceError(error));
            })
    }
}


export function getServiceById(data) {
    return dispatch => {
        dispatch(getByIdservice());
        fetch(API_URL+'getServiceById/'+data,
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
                dispatch(getByIdserviceSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getByIdserviceError(error));
            })
    }
}


export function deleteService(data) {
    return dispatch => {
        dispatch(getallservice());
        fetch(API_URL+'deleteServiceById/'+data,
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
                dispatch(getAllserviceSuccess(res));
                dispatch(getServices());
                return res;
            })
            .catch(error => {
                dispatch(getAllserviceError(error));
            })
    }
}




