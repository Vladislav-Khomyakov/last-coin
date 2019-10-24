import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Spinner from "../spinner/spinner";
import withLastcoinService from '../hoc/withLastcoinService';
import CashAccount from "../cash-account/cash-account";
import Header from "../header/header";

const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' exact component={Spinner} />
                <Route path='/account/' component={CashAccount} />
            </Switch>
        </div>
    );
};

export default withLastcoinService()(App);
