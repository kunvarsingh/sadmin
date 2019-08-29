import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Switch } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css";
import "./assets/scss/paper-dashboard.scss";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from './app';


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

ReactDOM.render(
	 

    <Provider store={store}>
     <App/>
    </Provider>,
    document.getElementById('root')
);

module.hot.accept();
serviceWorker.unregister();
