import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import rootReducer from "./store/index";
import './index.css';
import App from './App';
import { mainRoutes } from "./routes";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={rootReducer}>
  <Router>
    <Switch>
      <Route path="/admin" render={routeProps=><App {...routeProps}/>}/>
      {mainRoutes.map(route=>{
        return<Route key={route.path} {...route}/>;
      })}
      <Redirect to="/admin" from="/"/>;
      <Redirect to="/404"/>
    </Switch>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
