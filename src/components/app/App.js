import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Spinner from "../spinner/spinner";
import withLastcoinService from '../hoc/withLastcoinService';
import Header from "../header/header";
import { AccountPage, ProfilePage } from "../pages";

const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' exact component={Spinner} />
                <Route path='/account/' component={AccountPage} />
                <Route path='/profile/' component={ProfilePage}/>
            </Switch>
        </div>
    );
};

export default withLastcoinService()(App);
