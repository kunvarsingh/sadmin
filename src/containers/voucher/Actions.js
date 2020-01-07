import {
    ADDVOUCHER,
    ADDVOUCHER_SECCESS,
    ADDVOUCHER_ERROR,
    ADDAllVOUCHER,
    ADDAllVOUCHER_SECCESS,
    ADDAllVOUCHER_ERROR,
    DELETEVOUCHER,
    DELETEVOUCHER_ERROR,
    DELETEVOUCHER_SECCESS,
    GETBYIDVOUCHER,
    GETBYIDVOUCHER_SECCESS,
    GETBYIDVOUCHER_ERROR
} from './Constants';
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../../utils/constant';
import {Field, reduxForm, reset, change} from 'redux-form';

export function getVOUCHER(data) {
    return {
        type: ADDVOUCHER,
        data,
    };
}

export function getVOUCHERSuccess(data) {
    return {
        type: ADDVOUCHER_SECCESS,
        data,
    };
}
export function getVOUCHERError(error) {
    return {
        type: ADDVOUCHER_ERROR,
        error,
    };
}

export function getallVOUCHER(data) {
    return {
        type: ADDAllVOUCHER,
        data,
    };
}
export function getAllVOUCHERSuccess(data) {
    return {
        type: ADDAllVOUCHER_SECCESS,
        data,
    };
}
export function getAllVOUCHERError(error) {
    return {
        type: ADDAllVOUCHER_ERROR,
        error,
    };
}


export function deletevoucher(data) {
    return {
        type: DELETEVOUCHER,
        data,
    };
}
export function deleteVOUCHERSuccess(data) {
    return {
        type: DELETEVOUCHER_SECCESS,
        data,
    };
}
export function deleteVOUCHERError(error) {
    return {
        type: DELETEVOUCHER_ERROR,
        error,
    };
}


export function getByIdVOUCHER(data) {
    return {
        type: GETBYIDVOUCHER,
        data,
    };
}
export function getByIdVOUCHERSuccess(data) {
    return {
        type: GETBYIDVOUCHER_SECCESS,
        data,
    };
}
export function getByIdVOUCHERError(error) {
    return {
        type: GETBYIDVOUCHER_ERROR,
        error,
    };
}



export function addVOUCHER(data) {
    return dispatch => {
        dispatch(getVOUCHER());
        fetch(API_URL+'addVOUCHER',
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
                dispatch(getVOUCHERSuccess(res));
                dispatch(getVOUCHERs());
                dispatch(reset('VOUCHERForm'));
                return res;
            })
            .catch(error => {
                dispatch(getVOUCHERError(error));
            })
    }
}


export function getVOUCHERs(data) {
    return dispatch => {
        dispatch(getallVOUCHER());
        fetch(API_URL+'getAllVouchers',
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
                dispatch(getAllVOUCHERSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getAllVOUCHERError(error));
            })
    }
}


export function getVOUCHERById(data) {
    return dispatch => {
        dispatch(getByIdVOUCHER());
        fetch(API_URL+'getVoucherById/'+data,
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
                dispatch(getByIdVOUCHERSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getByIdVOUCHERError(error));
            })
    }
}


export function deleteVOUCHER(data) {
    return dispatch => {
        dispatch(deletevoucher());
        fetch(API_URL+'deleteVOUCHERById/'+data,
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
                dispatch(deleteVOUCHERSuccess(res));
                dispatch(getVOUCHERs());
                return res;
            })
            .catch(error => {
                dispatch(getVOUCHERError(error));
            })
    }
}




