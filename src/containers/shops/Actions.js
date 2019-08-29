import {
    UPDATESHOP,
    UPDATESHOP_SECCESS,
    UPDATESHOP_ERROR,
    SHOP,
    SHOP_SECCESS,
    SHOP_ERROR,
    DELETESHOP,
    DELETESHOP_ERROR,
    DELETESHOP_SECCESS
} from './Constants';
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../../utils/constant';

export function updateShop(data) {
    return {
        type: UPDATESHOP,
        data,
    };
}

export function updateShopSuccess(data) {
    return {
        type: UPDATESHOP_SECCESS,
        data,
    };
}
export function updateShopError(error) {
    return {
        type: UPDATESHOP_ERROR,
        error,
    };
}

export function getallshop(data) {
    return {
        type: SHOP,
        data,
    };
}
export function getAllshopSuccess(data) {
    return {
        type: SHOP_SECCESS,
        data,
    };
}
export function getAllshopError(error) {
    return {
        type: SHOP_ERROR,
        error,
    };
}


export function deleteshop(data) {
    return {
        type: DELETESHOP,
        data,
    };
}
export function deleteshopSuccess(data) {
    return {
        type: DELETESHOP_SECCESS,
        data,
    };
}
export function deleteshopError(error) {
    return {
        type: DELETESHOP_ERROR,
        error,
    };
}



export function getShopList(data) {
    return dispatch => {
        dispatch(getallshop());
        fetch(API_URL+'getAllShops',
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


export function updateShopData(id,data) {
    return dispatch => {
        dispatch(updateShop());
        fetch(API_URL+'updateShopById/'+id,
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
                // dispatch(getShopList());
                dispatch(updateShopSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(updateShopError(error));
            })
    }
}


export function deleteShop(data) {
    return dispatch => {
        dispatch(deleteshop());
        fetch(API_URL+'deleteShopById/'+data,
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




