import './login.css';
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React,{Component} from 'react';
// import Alert from 'react-s-alert';
import {Field, reduxForm, reset, change} from 'redux-form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { login } from './Actions';
import {renderTextField,renderAutoCompleteMultipleSelection} from '../../utils/components'
// import {validate} from './validate';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header/index';
import Sidebar from '../sidebar/index';
import routes from "../../routes.js";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Please input User Name';
  }
  return errors;
};



class Login extends Component {
  constructor() {
    super();
    this.state = ({
     
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    let masterData = {masterData: 'masterLocation'};
    // this.props.getMasterData(masterData);
  }

  onSubmit(formData){
      console.log('inside component',formData)
      this.props.login(formData)
          this.props.history.push('/dashboard');
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
            <div className="readmin-panel">
                    <div className="page_header col-12">
                        <div className="row">
                            <div className="col-sm-12 text-right useful_btns">
                            <h2 className="text-center">Admin Login</h2>
                            </div>
                        </div>
                    </div>

                    

                    <div className="panel-body">
                        <form className="readmin-form custom_form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="row">
                                
                               <div className="col-sm-4"></div>
                                 <div className="col-sm-4">
                                      <Field
                                          name="userName"
                                          label="User Name"
                                          component={renderTextField}/>
                                 </div>
                               <div className="col-sm-4 mt-5"></div>
                               </div>

                               <div className="row">
                               <div className="col-sm-4 mt-5"></div>
                                <div className="col-sm-4 mt-5">
                                    <Field
                                        type="password"
                                        name="password"
                                        label="Password"
                                        component={renderTextField}/>
                                 </div>
                                 <div className="col-sm-4 mt-5"></div>
                                 </div>

                                 <div className="row">
                                 <div className="col-sm-4 mt-5"></div>
                                  <div className="col-sm-4">
                                      <button type="submit"className="btn btn-primary mt-5">submit</button>
                                      {/*<Link to="/signup">Signup</Link>*/}
                                   </div>
                                   <div className="col-sm-4 mt-5"></div>
                                 </div>




                           

                        </form>
                    </div>
            </div>
       </div>
    );
  }
}
function mapStateToProps(state) {
  return null;
}

Login = reduxForm({
    form: 'editForm',
    validate, 
  })(Login)

export default connect(mapStateToProps, {login})(Login);
