import {
    ADDAllVOUCHER,
    ADDAllVOUCHER_ERROR,
    ADDAllVOUCHER_SECCESS,
    GETBYIDVOUCHER,
    GETBYIDVOUCHER_SECCESS,
    GETBYIDVOUCHER_ERROR
} from './Constants';

const initialState = {
    loading: false,
    success: false,
    error: ''
};

function VOUCHERReducer(state = initialState, action) {
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

        case ADDAllVOUCHER:
            return Object.assign({}, state, {
                'loading': true,
                'success': false,
                'error': ''
            });
        case ADDAllVOUCHER_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case ADDAllVOUCHER_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'VOUCHERData': action.data
        });



        case GETBYIDVOUCHER:
        return Object.assign({}, state, {
            'loading': true,
            'success': false,
            'error': '',
            'VOUCHERDataByID':null
        });
        case GETBYIDVOUCHER_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case GETBYIDVOUCHER_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'VOUCHERDataByID': action.data
        });

       
        default:
            return state;
    }
}

export default VOUCHERReducer;
