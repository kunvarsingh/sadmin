import './sidebar.css';
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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Please input User Name';
  }
  return errors;
};

// const logo = '../../assets/img/barbar.jpeg';
const logo = "https://image.shutterstock.com/image-vector/beauty-saloon-logo-vector-illustration-260nw-420000811.jpg";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = ({
     
    });
    this.activeRoute.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    let masterData = {masterData: 'masterLocation'};
    // this.props.getMasterData(masterData);
  }
   activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  onSubmit(formData){
      // toast.success('You have successfully login!.'+JSON.stringify(formData));
      this.props.login(formData)
      // alert(JSON.stringify(formData));
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-normal"
          >
            Salon System
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return null;
}

Sidebar = reduxForm({
    form: 'editForm',
    validate, 
  })(Sidebar)

export default connect(mapStateToProps, {login})(Sidebar);
