import {
    ADDAllSERVICE,
    ADDAllSERVICE_ERROR,
    ADDAllSERVICE_SECCESS,
    GETBYIDSERVICE,
    GETBYIDSERVICE_SECCESS,
    GETBYIDSERVICE_ERROR
} from './Constants';

const initialState = {
    loading: false,
    success: false,
    error: ''
};

function serviceReducer(state = initialState, action) {
    switch (action.type) {
        // case LOGIN:
        //     return Object.assign({}, state, {
        //         'loading': true,
        //         'success': false,
        //         'error': ''
        //     });
        // case LOGIN_ERROR:
        //     return Object.assign({}, state, {
        //         'loading': false,
        //         'success': false,
        //         'error': action
        //     });
        // case LOGIN_SECCESS:
        //     return Object.assign({}, state, {
        //         'loading': false,
        //         'success': true,
        //         'error': '',
        //         'tableData': action.data
        //     });

        case ADDAllSERVICE:
            return Object.assign({}, state, {
                'loading': true,
                'success': false,
                'error': ''
            });
        case ADDAllSERVICE_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case ADDAllSERVICE_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'serviceData': action.data
        });



        case GETBYIDSERVICE:
        return Object.assign({}, state, {
            'loading': true,
            'success': false,
            'error': '',
            'serviceDataByID':null
        });
        case GETBYIDSERVICE_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case GETBYIDSERVICE_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'serviceDataByID': action.data
        });

       
        default:
            return state;
    }
}

export default serviceReducer;
