import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Spinner from "../spinner/spinner";
import withLastcoinService from '../hoc/withLastcoinService';
import Header from "../header/header";
import {AccountPage} from "../pages";

const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' exact component={Spinner} />
                <Route path='/account/' component={AccountPage} />
            </Switch>
        </div>
    );
};

export default withLastcoinService()(App);
