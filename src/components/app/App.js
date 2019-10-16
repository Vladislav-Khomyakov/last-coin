import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Spinner from "../spinner/spinner";
import withLastcoinService from '../hoc/withLastcoinService';
import CashAccount from "../cash-account/cash-account";

const App = () => {
    return (
        <Switch>
            <Route path='/' exact component={<Spinner />} />
            <Route path='/cash-account/' component={<CashAccount />}/>
        </Switch>
    );
};

export default withLastcoinService()(App);

/*
<Switch>
    <Route path='/' exect component={<Spinner />} />
    <Route path='/cash-account/' component={<CashAccount />}/>
</Switch>*/
