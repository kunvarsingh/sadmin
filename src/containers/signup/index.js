import './signup.css';
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React,{Component} from 'react';
// import Alert from 'react-s-alert';
import {Field, reduxForm, reset, change} from 'redux-form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { signup } from './Actions';
import {renderTextField,renderSelectField} from '../../utils/components'
// import {validate} from './validate';
import MenuItem from 'material-ui/MenuItem'


const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Please input User Name';
  }
  return errors;
};



class Signup extends Component {
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
      this.props.signup(formData);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
            <div className="readmin-panel">
                    <div className="page_header col-12">
                        <div className="row">
                            <div className="col-sm-12 text-right useful_btns">
                                <h2 className="page_title">Signup</h2>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <form className="readmin-form custom_form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="row">
                               <div className="col-sm-4">
                                    <Field
                                        name="MobileNo"
                                        label="Mobile No"
                                        component={renderTextField}/>
                               </div>
                                <div className="col-sm-4">
                                    <Field
                                        name="UserName"
                                        label="User Name"
                                        component={renderTextField}/>
                               </div>
                                <div className="col-sm-4">
                                    <Field
                                        name="Password"
                                        label="Password"
                                        type="password"
                                        component={renderTextField}/>
                               </div>
                                <div className="col-sm-4">
                                    <Field
                                        name="E"mail
                                        label="Email"
                                        component={renderTextField}/>
                               </div>
                           </div>
                           <button type="submit"className="btn btn-primary">submit</button>
                           <Link to="/login">Login</Link>

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

Signup = reduxForm({
    form: 'editForm',
    validate, 
  })(Signup)

export default connect(mapStateToProps, {signup})(Signup);
