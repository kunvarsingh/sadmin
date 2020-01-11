import {
    UPDATEAPPOINTMENT,
    UPDATEAPPOINTMENT_SECCESS,
    UPDATEAPPOINTMENT_ERROR,
    APPOINTMENT,
    APPOINTMENT_SECCESS,
    APPOINTMENT_ERROR,
    DELETEAPPOINTMENT,
    DELETEAPPOINTMENT_ERROR,
    DELETEAPPOINTMENT_SECCESS
} from './Constants';
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../../utils/constant';

export function updateAppointment(data) {
    return {
        type: UPDATEAPPOINTMENT,
        data,
    };
}

export function updateAppointmentSuccess(data) {
    return {
        type: UPDATEAPPOINTMENT_SECCESS,
        data,
    };
}
export function updateAppointmentError(error) {
    return {
        type: UPDATEAPPOINTMENT_ERROR,
        error,
    };
}

export function getallshop(data) {
    return {
        type: APPOINTMENT,
        data,
    };
}
export function getAllshopSuccess(data) {
    return {
        type: APPOINTMENT_SECCESS,
        data,
    };
}
export function getAllshopError(error) {
    return {
        type: APPOINTMENT_ERROR,
        error,
    };
}


export function deleteshop(data) {
    return {
        type: DELETEAPPOINTMENT,
        data,
    };
}
export function deleteshopSuccess(data) {
    return {
        type: DELETEAPPOINTMENT_SECCESS,
        data,
    };
}
export function deleteshopError(error) {
    return {
        type: DELETEAPPOINTMENT_ERROR,
        error,
    };
}



export function getAppointmentList(data) {
    return dispatch => {
        dispatch(getallshop());
        fetch(API_URL+'getAllBooking',
             {
                body: JSON.stringify(data),
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode && res.statusCode==500){
                    toast.warning(res.message);
                }
                toast.success(res.message);
                dispatch(getAllshopSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getAllshopError(error));
            })
    }
}


export function updateAppointmentData(id,data) {
    return dispatch => {
        dispatch(updateAppointment());
        fetch(API_URL+'updateAppointmentById/'+id,
             {
                body: JSON.stringify(data),
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},  
                })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode && res.statusCode==500){
                    toast.warning(res.message);
                }
                toast.success(res.message);
                // dispatch(getAppointmentList());
                dispatch(updateAppointmentSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(updateAppointmentError(error));
            })
    }
}


export function deleteAppointment(data) {
    return dispatch => {
        dispatch(deleteshop());
        fetch(API_URL+'deleteAppointmentById/'+data,
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
                dispatch(deleteshop());
                dispatch(deleteshopSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(deleteshopError(error));
            })
    }
}




