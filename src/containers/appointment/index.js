import './services.css';
import {connect} from 'react-redux'
import React,{Component} from 'react';
// import Alert from 'react-s-alert';
import {Field, reduxForm, reset, change} from 'redux-form';
import {renderTextField,renderSelectField,renderTimePicker,renderToggleButton} from '../../utils/components';
import DraggableModal from '../../utils/DraggableModal'
// import {validate} from './validate';
import classNames from 'classnames';
import moment from 'moment';
import Alert from 'react-s-alert';


import { getAppointmentList,deleteAppointment,updateAppointmentData} from './Actions';

const validate = (values) => {
  const errors = {};
  if (!values.ServiceName) {
    errors.ServiceName = 'Please enter service name';
  }
   if (!values.amount) {
    errors.amount = 'Please enter amount';
  }
   if (!values.totalTime) {
    errors.totalTime = 'Please enter time';
  }
  return errors;
};

const styles = {
  thumbOff: {
    width: '15px',
    height: '15px',
    top: '2px',
  },
  trackOff: {
    height: '12px',
  },
  thumbSwitched: {
    width: '15px',
    height: '15px',
    left: '61%',
    top: '2px',
  },
  trackSwitched: {
    height: '12px',
  },
};

class Appointment extends Component {
  constructor() {
    super();
    this.state = ({
     isAdd:false,
     totalTime:new Date(),
     open:false,
     salonStatus:false
    });
  }

  componentWillMount(){
    this.props.getAppointmentList();
  }

 

  handleDeleteClick = (e,data)=>{
    
     Alert.warning('Are you sure you want to delete service?', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 10000,
      customFields: {
        displayComponent: true,
        handleButtonClick: this.handleDeleteAlertClick,
        id: data,
      },
    });
  }

    handleDeleteAlertClick = (event, user, isActive) => {
    this.props.deleteAppointment(user._id);
    Alert.closeAll();
    this.props.getAppointmentList();
  };


  handleActiveAlertClick = (event, user, isActive) => {
    user.salonStatus =  !user.salonStatus;
    this.setState({salonStatus:!user.salonStatus});
    this.props.updateAppointmentData(user._id,user);
    Alert.closeAll();
    // this.props.getAppointmentList();
  };

  onActiveToggle = (e, index, user) => {
    Alert.warning('Are you sure you want to change user\'s active status?', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 10000,
      customFields: {
        displayComponent: true,
        handleButtonClick: this.handleActiveAlertClick,
        // value: e.target.value,
        id: user,
        // isActive: user.isBlock,
      },
    });

  }


  renderTableList = () => {
    if (this.props.AppointmentList && this.props.AppointmentList.length > 0) {
      return (
        this.props.AppointmentList.map((data, index) => {
          console.log('data.userId && data.userId.length >1 ? data.userId[0].FirstName',data.userId && data.userId.length >0 && data.userId[0].FirstName)
          return (
            <tr key={index}>
            <td>{index+1}#</td>
              <td>{data.userId && data.userId.length >0 ? data.userId[0].FirstName : ''}</td>
              <td>{data.timming ? data.timming :''}</td>
              <td>{data.amount ? data.amount : '-'}</td>
              <td>{data.status ? data.status : '-'}</td>
              <td>{data.shopId && data.shopId.length >0 ? data.shopId[0].SalonName : ''}</td>
              <td>{data.staffId && data.staffId.length >0 ? data.staffId[0].StaffName : ''}</td>
              <td>{data.serviceId && data.serviceId.length >0 ? data.serviceId[0].ServiceName : ''}</td>
                <td>{data.paymentStatus ? 'Approved' : 'Pending'}</td>
              <td>
              {/*<button type="button" onClick={(e) => this.handleEditClick(e,data)} title="Edit" className="tbactionbtn blue-hover"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>*/}
              <button type="button" onClick={(e) => this.handleDeleteClick(e,data)} title="Delete" className="tbactionbtn red-hover"><i className="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
          );

        })
      );
    } else {
      return (<tr>
        <td colSpan='7' className="text-center no-record">{this.props.loading ? 'Loading, Please wait...' : 'No record found.'}</td>
      </tr>);
    }
  }

   onDateChange = (input, value)=>{
    input.onChange(moment(value).format());
    this.setState({
      [input.name]: null,
    });
  }

 
  render() {
    const { handleSubmit } = this.props;
     const tableClass = classNames({
      'table': true,
      'table-striped': true,
      'table-bordered': true,
      'table-hover': true,
      'table-condensed': true,
      'customtable': true,
      'recivefax_tbl': true
    });

    return (
      <div>

            <div className="readmin-panel">
                    <div className="page_header col-12">
                        <div className="row">
                            <div className="col-sm-12 text-right useful_btns">
                                <h2 className="page_title">Add Service</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row btnallignment">
                         <div className="btnallignment">
                          {/*<button className="btn btn-primary" onClick={this.addService}>Add</button>*/}
                       </div>
                    </div>   
                   
                   



                    <div className="panel-body">
                       

                       {!this.state.isAdd ?
                      <div className="table-responsive col-sm-12">
                        <table className={tableClass}>
                          <thead>
                            <tr>
                               <th width="5%">S.No#</th>
                              <th width="10%">User Name</th>
                              <th width="10%">Time</th>
                              <th width="10%">Amount</th>
                              <th width="10%">Staus</th>
                              <th width="10%">Shop</th>
                              <th width="20%">Staff Name</th>
                              <th width="20%">Service</th>
                              <th width="10%">Payment Status</th>
                              <th width="10%">Action</th>


                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTableList()}
                          </tbody>
                        </table>
                        </div>
                   :null}


                       
                    </div>
            </div>
       </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    AppointmentList : state.appointmentReducer && state.appointmentReducer.AppointmentData ? state.appointmentReducer.AppointmentData : []
  };
}

Appointment = reduxForm({
    form: 'appointmentForm',
    validate, 
  })(Appointment)

export default connect(mapStateToProps, {getAppointmentList,deleteAppointment,updateAppointmentData})(Appointment);
