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
          return (
            <tr key={index}>
            <td>{index+1}#</td>
              <td>{''}</td>
              <td>{''}</td>
              <td>{data.CityName ? data.CityName : '-'}</td>
              <td>{data.StateName ? data.StateName : '-'}</td>
              <td>{data.Zipcode ? data.Zipcode : '-'}</td>
              <td>{data.Address ? data.Address : '-'}</td>
                <td>{data.salonStatus ? 'Approved' : 'Pending'}</td>
                <td>
                     <Field className="no_margin w-45p"
                      name="active_status"
                      toggled={data.salonStatus ? data.salonStatus : false}
                      component={renderToggleButton}
                      onChange={(e) => this.onActiveToggle(e, index, data)}
                      style={styles.toggle}
                      thumbStyle={styles.thumbOff}
                      trackStyle={styles.trackOff}
                      thumbSwitchedStyle={styles.thumbSwitched}
                      trackSwitchedStyle={styles.trackSwitched}
                    />
                </td>
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
                              <th width="10%">ContactNo</th>
                              <th width="10%">CityName</th>
                              <th width="10%">State</th>
                              <th width="10%">Zip-code</th>
                              <th width="20%">Address</th>
                              <th width="10%">Status</th>
                              <th width="10%"></th>
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
