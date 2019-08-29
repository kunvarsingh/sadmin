import {
    SHOP,
    SHOP_ERROR,
    SHOP_SECCESS,
} from './Constants';

const initialState = {
    loading: false,
    success: false,
    error: ''
};

function shopReducer(state = initialState, action) {
    switch (action.type) {
            case SHOP:
            return Object.assign({}, state, {
                'loading': true,
                'success': false,
                'error': ''
            });
        case SHOP_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case SHOP_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'shopData': action.data
            });

       
        default:
            return state;
    }
}

export default shopReducer;
