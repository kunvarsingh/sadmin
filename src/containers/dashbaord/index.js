import './dashboard.css';
import Sidebar from '../../containers/sidebar/index';
import Header from '../../containers/header/index';
import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Link ,Redirect,Switch} from "react-router-dom";
// for toater message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '../../containers/signup/index';

import routes from "../../routes.js";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = ({
     
    });
  }

  componentWillMount(){
    let masterData = {masterData: 'masterLocation'};
    // this.props.getMasterData(masterData);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="wrapper">
       <Header/>
                         <Sidebar
                          {...this.props}
                          routes={routes}
                          bgColor={'black'}
                          activeColor={'red'}
                        />

                        <div className="main-panel">
                           
                            <Switch>
                              {routes.map((prop, key) => {
                                return (
                                  <Route
                                    path={prop.layout + prop.path}
                                    component={prop.component}
                                    key={key}
                                  />
                                );
                              })}
                            </Switch>

                        </div>
                       
      </div>
    );
  }
}

export default Dashboard;
