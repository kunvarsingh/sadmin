import './services.css';
import {connect} from 'react-redux'
import React,{Component} from 'react';
// import Alert from 'react-s-alert';
import {Field, reduxForm, reset, change} from 'redux-form';
import {renderTextField,renderSelectField,renderTimePicker,CommonButton} from '../../utils/components';
import DraggableModal from '../../utils/DraggableModal'
// import {validate} from './validate';
import classNames from 'classnames';
import moment from 'moment';
import Alert from 'react-s-alert';
import {bindActionCreators} from 'redux';


import { addService,getServices,deleteService,getServiceById } from './Actions';

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



class Services extends Component {
  constructor() {
    super();
    this.state = ({
     isAdd:false,
     totalTime:new Date(),
     open:false,
     serviceId : null
    });
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    this.props.getServices();
  }

  onSubmit(formData){
      this.props.addService(formData);
      this.setState({isAdd:false,open:false,serviceId:null},()=>{
        this.props.dispatch(reset('serviceForm'))
      })
      // this.props.getServices();
      
  }

  handleDeleteClick = (e,data,index)=>{
     Alert.warning('Are you sure you want to delete service?', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 10000,
      customFields: {
        displayComponent: true,
        handleButtonClick: this.handleActiveAlertClick,
        // value: e.target.value,
        id: data,
        // isActive: user.isBlock,
      },
    });
    
  }

  handleActiveAlertClick = (event, user, isActive) => {
    this.props.deleteService(user._id);
    Alert.closeAll();
    // this.props.getServices();
  };

  handleEditClick = (e,data)=>{
    this.props.getServiceById(data._id);
    this.setState({open:true,serviceId:data._id});
  }


  renderTableList = () => {
    if (this.props.serviceList && this.props.serviceList.length > 0) {

      return (
        this.props.serviceList.map((data, index) => {
          return (
            <tr key={index}>
            <td>{index+1}#</td>
              <td>{data.ServiceName}</td>
              <td>{data.amount}</td>
              <td>{data.totalTime}</td>
              <td>
              <button type="button" onClick={(e) => this.handleEditClick(e,data)} title="Edit" className="tbactionbtn blue-hover"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button type="button" onClick={(e) => this.handleDeleteClick(e,data,index)} title="Delete" className="tbactionbtn red-hover"><i className="fa fa-trash" aria-hidden="true"></i></button>
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

  addService = () =>{
     
    this.setState({isAdd:true,open:true,serviceId:null},()=>{
     this.props.dispatch(reset('serviceForm')) 
    })
  }
  // openModal = ()=>{
  //   this.setState({open:true})
  // }
  handleClose =()=>{
    this.props.dispatch(reset('serviceForm')) 
    this.setState({open:false})
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

    const actions = [
      <CommonButton className="mr-15 grey_btn" label="Cancel" onClick={this.handleClose} />,
      <CommonButton type="submit" primary={true} label="Save" onClick={handleSubmit(this.onSubmit.bind(this))} />,
    ];

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
                          <button className="btn btn-primary" onClick={this.addService}>Add</button>
                          {/*<button className="btn btn-primary" onClick={this.openModal}>Open Modal</button>*/}
                       </div>
                   
                   



                    <div className="panel-body">
                       

                      <div className="table-responsive col-sm-12">
                        <table className={tableClass}>
                          <thead>
                            <tr>
                               <th width="5%">S.No#</th>
                              <th width="25%">Service Type</th>
                              <th width="25%">Amount</th>
                              <th width="20%">Time</th>
                              <th width="25%">Action</th>


                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTableList()}
                          </tbody>
                        </table>
                        </div>

                        {this.state.open ?
                          <DraggableModal
                            isOpen={this.state.open}
                            minHeight={document.getElementById('AuthorizationModal') ? document.getElementById('AuthorizationModal').offsetHeight + 150 : 400}
                            headerValue={this.state.serviceId ? 'Edit Service' : 'Add Service'}
                            handleClose={this.handleClose}
                            actions={actions}
                            data={
                              <div className="row" id="AuthorizationModal">
                                <div className="col-sm-12">
                                  <form className="readmin-form custom_form" noValidate>
                                    <div className="col-12">
                                       <form className="readmin-form custom_form">
                            <div className="row">
                              
                                <div className="col-sm-4">
                                    <Field
                                        name="ServiceName"
                                        label="Service Name"
                                        component={renderTextField}/>
                               </div>
                                <div className="col-sm-4">
                                    <Field
                                        name="amount"
                                        label="Amount"
                                        component={renderTextField}/>
                               </div>
                               
                                <div className="col-sm-4">
                                 <Field
                                        name="totalTime"
                                        label="Service Time"
                                        component={renderTextField}/>
                               </div>
                           </div>

                        </form>
                                  </div>
                                  </form>
                                  </div>
                                  </div>
                                      }
                                       /> : null}
                    </div>
            </div>
       </div>
    );
  }
}
function mapStateToProps(state,dispatch) {
  let initialValueData = {};

  if(state.serviceReducer && state.serviceReducer.serviceDataByID){
    console.log('state.serviceReducer.serviceDataByID',state.serviceReducer.serviceDataByID);
    initialValueData = {
      'ServiceName' : state.serviceReducer.serviceDataByID.ServiceName ? state.serviceReducer.serviceDataByID.ServiceName : '',
      'amount' : state.serviceReducer.serviceDataByID.amount ? state.serviceReducer.serviceDataByID.amount : 0,
      'totalTime' : state.serviceReducer.serviceDataByID.totalTime ? state.serviceReducer.serviceDataByID.totalTime :'00:00'
  }
}

  return {
    serviceList : state.serviceReducer.serviceData,
    serviceDataByList : state.serviceReducer.serviceDataByID,
    initialValues: initialValueData,
  };
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({
    addService : addService,
    getServices : getServices,
    deleteService : deleteService,
    getServiceById : getServiceById,
  },dispatch)

{/*
  return {
    getServices : ()=>{
      dispatch(getServices())
    },
     getServiceById : (id)=>{
      dispatch(getServiceById(id))
    },
    dispatch
  }
       */}
}

Services = reduxForm({
    form: 'serviceForm',
    validate,
    enableReinitialize: true, 
  })(Services)


export default connect(mapStateToProps, mapDispatchToProps)(Services);
