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


import { addVOUCHER,getVOUCHERs,deleteVOUCHER,getVOUCHERById } from './Actions';

const validate = (values) => {
  const errors = {};
  if (!values.VoucherName) {
    errors.VoucherName = 'Please enter Voucher name';
  }
   if (!values.amount) {
    errors.amount = 'Please enter amount';
  }
   if (!values.totalTime) {
    errors.totalTime = 'Please enter time';
  }
  return errors;
};



class Vouchers extends Component {
  constructor() {
    super();
    this.state = ({
     isAdd:false,
     totalTime:new Date(),
     open:false,
     VoucherId : null
    });
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    this.props.getVouchers();
  }

  onSubmit(formData){
      this.props.addVoucher(formData);
      this.setState({isAdd:false,open:false,VoucherId:null},()=>{
        this.props.dispatch(reset('VoucherForm'))
      })
      // this.props.getVouchers();
      
  }

  handleDeleteClick = (e,data,index)=>{
     Alert.warning('Are you sure you want to delete Voucher?', {
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
    this.props.deleteVoucher(user._id);
    Alert.closeAll();
    // this.props.getVouchers();
  };

  handleEditClick = (e,data)=>{
    this.props.getVoucherById(data._id);
    this.setState({open:true,VoucherId:data._id});
  }


  renderTableList = () => {
    if (this.props.VoucherList && this.props.VoucherList.length > 0) {

      return (
        this.props.VoucherList.map((data, index) => {
          return (
            <tr key={index}>
            <td>{index+1}#</td>
              <td>{data.Name}</td>
              <td>{data.Type}</td>
              <td>{data.value}</td>
               <td>{data.attempts}</td>
               <td>{data.created_at}</td>
               <td>{data.expiry_at}</td>
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

  addVoucher = () =>{
     
    this.setState({isAdd:true,open:true,VoucherId:null},()=>{
     this.props.dispatch(reset('VoucherForm')) 
    })
  }
  // openModal = ()=>{
  //   this.setState({open:true})
  // }
  handleClose =()=>{
    this.props.dispatch(reset('VoucherForm')) 
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
                                <h2 className="page_title">Add Voucher</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row btnallignment">
                          <button className="btn btn-primary" onClick={this.addVoucher}>Add</button>
                          {/*<button className="btn btn-primary" onClick={this.openModal}>Open Modal</button>*/}
                       </div>
                   
                   



                    <div className="panel-body">
                       

                      <div className="table-responsive col-sm-12">
                        <table className={tableClass}>
                          <thead>
                            <tr>
                               <th width="5%">S.No#</th>
                              <th width="25%">Voucher Name</th>
                              <th width="25%">Type</th>
                              <th width="20%">Amount</th>
                              <th width="25%">Attempts</th>
                               <th width="25%">Create At</th>
                                <th width="25%">Expiry At</th>
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
                            headerValue={this.state.VoucherId ? 'Edit Voucher' : 'Add Voucher'}
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
                                        name="Name"
                                        label="Voucher Name"
                                        component={renderTextField}/>
                               </div>
                                <div className="col-sm-4">
                                    <Field
                                        name="value"
                                        label="Amount"
                                        component={renderTextField}/>
                               </div>
                               
                                <div className="col-sm-4">
                                 <Field
                                        name="Type"
                                        label="Type"
                                        component={renderTextField}/>
                               </div>
                               <div className="col-sm-4">
                                    <Field
                                        name="description"
                                        label="Description"
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

  if(state.voucherReducer && state.voucherReducer.VOUCHERDataByID){
    console.log('state.voucherReducer.VOUCHERDataByID',state.voucherReducer.VOUCHERDataByID);
    initialValueData = {
      'Name' : state.voucherReducer.VOUCHERDataByID.Name ? state.voucherReducer.VOUCHERDataByID.Name : '',
      'value' : state.voucherReducer.VOUCHERDataByID.value ? state.voucherReducer.VOUCHERDataByID.value : 0,
      'Type' : state.voucherReducer.VOUCHERDataByID.Type ? state.voucherReducer.VOUCHERDataByID.Type :'',
      'description' : state.voucherReducer.VOUCHERDataByID.description ? state.voucherReducer.VOUCHERDataByID.description :''
  }
}

  return {
    VoucherList : state.voucherReducer && state.voucherReducer.VOUCHERData,
    VoucherDataByList : state.voucherReducer && state.voucherReducer.VOUCHERDataByID,
    initialValues: initialValueData,
  };
}

function mapDispatchToProps(dispatch){
  
  return bindActionCreators({
    addVoucher : addVOUCHER,
    getVouchers : getVOUCHERs,
    deleteVoucher : deleteVOUCHER,
    getVoucherById : getVOUCHERById,
  },dispatch)

{/*
  return {
    getVouchers : ()=>{
      dispatch(getVouchers())
    },
     getVoucherById : (id)=>{
      dispatch(getVoucherById(id))
    },
    dispatch
  }
       */}
}

Vouchers = reduxForm({
    form: 'VoucherForm',
    validate,
    enableReinitialize: true, 
  })(Vouchers)


export default connect(mapStateToProps, mapDispatchToProps)(Vouchers);
