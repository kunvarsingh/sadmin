import {
    ADDAllUSER,
    ADDAllUSER_ERROR,
    ADDAllUSER_SECCESS
} from './Constants';

const initialState = {
    loading: false,
    success: false,
    error: ''
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADDAllUSER:
            return Object.assign({}, state, {
                'loading': true,
                'success': false,
                'error': ''
            });
        case ADDAllUSER_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case ADDAllUSER_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'users': action.data
            });

            
        default:
            return state;
    }
}

export default userReducer;
