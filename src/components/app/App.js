import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.scss';
import withLastcoinService from '../hoc/withLastcoinService';
import Header from "../header";
import {AccountPage, HistoryPage, TransactionsPage} from "../pages";
import Navigation from "../navigation";

const App = () => {
  return (
    <div>
      <div className='app__navigation'>
        <Navigation/>
      </div>
      <div className='app__content-wrapper'>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/account/'/>
          </Route>
          <Route path='/account/' component={AccountPage}/>
          <Route path='/transactions/' component={TransactionsPage}/>
          <Route path='/history/' component={HistoryPage}/>

          <Route render={() => <h2>Page not found</h2>}/>
        </Switch>
      </div>
    </div>
  );
};

export default withLastcoinService()(App);
