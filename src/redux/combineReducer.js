import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import tableReducer from '../containers/tableContainer/Reducer';
import loginReducer from '../containers/login/Reducer';
import serviceReducer from '../containers/services/Reducer';
import shopReducer from '../containers/shops/Reducer';
import userReducer from '../containers/users/Reducer';
import voucherReducer from '../containers/voucher/Reducer'
import appointmentReducer from '../containers/appointment/Reducer'


const rootReducer = combineReducers({
	form: forms,
    tableReducer,
    loginReducer,
    serviceReducer,
    shopReducer,
    userReducer,
    voucherReducer,
    appointmentReducer
})

export default rootReducer;