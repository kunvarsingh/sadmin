import React, { Component } from "react";
import "./app.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter as Router, Route, Link ,Redirect,Switch} from "react-router-dom";
import Login from './containers/login/index';
import Signup from './containers/signup/index';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';
import AlertContentTemplate from './utils/alertComponent';

// for toater message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './containers/header/index';
import Sidebar from './containers/sidebar/index';
import Dashboard from './containers/dashbaord/index';

import routes from "./routes.js";
import history from './utils/history';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#01b9c1',
    accent1Color: '#01b9c1',
  },
  slider: {
    selectionColor: '#01b9c1',
    handleFillColor: '#01b9c1',
  },
});


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isloggedIn:false
    }
}

componentDidMount(){}

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
                <ToastContainer autoClose={2600}/>
            <div className="hg100">
                    <Router history={history}>
                      <div>
                          {
                            this.state.isloggedIn ?  
                              <div className="wrapper">
                               <Sidebar
                                {...this.props}
                                routes={routes}
                                bgColor={'black'}
                                activeColor={'red'}
                              />
                               <div className="main-panel">
                                  <Header/>
                               </div>
                              </div> : null}


                            <Route exact path="/" render={() => (
                                this.state.isloggedIn ? (
                                  <Redirect to="/dashboard"/>
                                ) : (
                                   <Redirect to="/login"/>
                                )
                              )}/>

                             <Switch>
                             <Route path="/dashboard" render={props => <Dashboard {...props} />} />
                              <Route path="/login" component={Login}/>
                              <Route path="/dashboard/signup" component={Signup}/>
                            </Switch>
                      </div>
                    </Router>

            </div>
          </MuiThemeProvider>
           <Alert contentTemplate={AlertContentTemplate} stack={{ limit: 3 }} />
           </div>
    );
  }
}

export default App;
