import './header.css';
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
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";


const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Please input User Name';
  }
  return errors;
};



class Header extends Component {
  constructor() {
    super();
    this.state = ({
      isOpen: false,
      dropdownOpen: false,
      color: "transparent"
    });
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    let masterData = {masterData: 'masterLocation'};
    // this.props.getMasterData(masterData);
  }

   dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onSubmit(formData){
      // toast.success('You have successfully login!.'+JSON.stringify(formData));
      this.props.login(formData)
      // alert(JSON.stringify(formData));
  }
  render() {
    const { handleSubmit } = this.props;
    return (
     // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color="dark"
        expand="lg"
        className="navbar-absolute fixed-top"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{"Testing"}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/*<NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            */}


              <NavItem>
                <Link to="/login" className="nav-link btn-rotate">
                  <i className="nc-icon nc-button-power" />
                  <p>
                    <span className="d-lg-none d-md-block">Logout</span>
                  </p>
                </Link>
              </NavItem>


            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
function mapStateToProps(state) {
  return null;
}

Header = reduxForm({
    form: 'editForm',
    validate, 
  })(Header)

export default connect(mapStateToProps, {login})(Header);
