import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.scss';
import Spinner from "../spinner/spinner";
import withLastcoinService from '../hoc/withLastcoinService';
import Header from "../header/header";
import {AccountPage, OverviewPage, ProfilePage} from "../pages";

const App = () => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Spinner}/>
        <Route path='/account/' component={AccountPage}/>
        <Route path='/profile/' component={ProfilePage}/>
        <Route path='/overview/' component={OverviewPage}/>
      </Switch>
    </div>
  );
};

export default withLastcoinService()(App);
