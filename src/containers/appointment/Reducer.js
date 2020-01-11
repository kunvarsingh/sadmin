import {
    APPOINTMENT,
    APPOINTMENT_ERROR,
    APPOINTMENT_SECCESS,
} from './Constants';

const initialState = {
    loading: false,
    success: false,
    error: ''
};

function appointmentReducer(state = initialState, action) {
    switch (action.type) {
            case APPOINTMENT:
            return Object.assign({}, state, {
                'loading': true,
                'success': false,
                'error': ''
            });
        case APPOINTMENT_ERROR:
            return Object.assign({}, state, {
                'loading': false,
                'success': false,
                'error': action
            });
        case APPOINTMENT_SECCESS:
            return Object.assign({}, state, {
                'loading': false,
                'success': true,
                'error': '',
                'AppointmentData': action.data
            });

       
        default:
            return state;
    }
}

export default appointmentReducer;
