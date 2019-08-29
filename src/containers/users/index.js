import './users.css';
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
import { BrowserRouter as Router, Route, Link ,Redirect,Switch} from "react-router-dom";


import { deleteUserById,getUsers } from './Actions';

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



class Users extends Component {
  constructor() {
    super();
    this.state = ({
     isAdd:false,
     totalTime:new Date(),
     open:false,
     serviceId : null,
     viewShop:true,
     currentShops:null
    });
  }

  componentWillMount(){
    this.props.getUsers();
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
    this.props.deleteUserById(user._id);
    Alert.closeAll();
  };

  handleEditClick = (e,data)=>{
    this.props.getServiceById(data._id);
    this.setState({open:true,serviceId:data._id});
  }

  handleViewClick = (e,data)=>{
    this.setState({viewShop:false,currentShops:data})
  }

  back =()=>{
   this.setState({viewShop:true,currentShops:null}) 
  }


  renderTableList = () => {
    if (this.props.usersList && this.props.usersList.length > 0) {

      return (
        this.props.usersList.map((data, index) => {
          return (
            <tr key={index}>
            <td>{index+1}#</td>
              <td>{data.UserName ? data.UserName : ''}</td>
              <td>{data.FirstName ? data.FirstName : ''}</td>
              <td>{data.LastName ? data.LastName : ''}</td>
              <td>{data.MobileNo ? data.MobileNo : ''}</td>
              <td>{data.shops ? data.shops && data.shops.length : '0'}&nbsp;&nbsp;
              </td>
              <td>{data.mobileVerificationStatus ? 'Approved' : 'Pending'}</td>
              <td>
              {/*<button type="button" onClick={(e) => this.handleEditClick(e,data)} title="Edit" className="tbactionbtn blue-hover"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>*/}

               <button type="button" title="View Report" onClick={(e) => this.handleViewClick(e, data)}
                                    className="tbactionbtn blue-hover"><i className="fa fa-eye"
                                                                                          aria-hidden="true" ></i>
                            </button>

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
 
 shopsListed =()=>{
   if(this.state.currentShops && this.state.currentShops.shops){
     return(
           
                this.state.currentShops.shops.map((item, index) => {
                  return (
                  <div>
                  Shop {index+1}
                    <div className="col-sm-6">
                      Sallon Name : <td>{item.SalonName}</td>
                      ContactNo : <td>{item.ContactNo}</td>
                      CityName : <td>{item.CityName}</td>
                      Address : <td>{item.Address}</td>
                    </div>
                    <div className="col-sm-6">
                      ContactNo : <td>{item.ContactNo}</td>
                    </div>
                  </div>  
                  )
                })
       
        )
   }
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

                    {!this.state.viewShop?
                      <div className="row btnallignment">
                          <button className="btn btn-primary" onClick={this.back}>Back</button>
                       </div>
                       :null
                    }


                    <div className="panel-body">
                    {this.state.viewShop ?
                      <div className="table-responsive col-sm-12">
                        <table className={tableClass}>
                          <thead>
                            <tr>
                               <th width="5%">S.No#</th>
                              <th width="20%">User Name</th>
                              <th width="20%">First Name</th>
                              <th width="15%">Last Name</th>
                              <th width="25%">Mobile No</th>
                              <th width="10%">Total Shops</th>
                              <th width="10%">Status</th>
                              <th width="10%">Action</th>

                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTableList()}
                          </tbody>
                        </table>
                        </div>
                        :
                        <div className="row">
                           <p>{this.state.currentShops.UserName} Shops : {this.state.currentShops.shops.length}</p>

                           {this.shopsListed()}
                        </div>
                    }

                      
                    </div>
            </div>
       </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    usersList : state.userReducer.users,
  };
}

Users = reduxForm({
    form: 'userForm',
    validate, 
  })(Users)

export default connect(mapStateToProps, {deleteUserById,getUsers})(Users);
