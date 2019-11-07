import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.scss';
import withLastcoinService from '../hoc/withLastcoinService';
import Header from "../header";
import {AccountPage, HistoryPage, TransactionsPage} from "../pages";
import Navigation from "../navigation";
import {activationMenu} from "../../actions";

class App extends Component {
  render() {
    const {menuActivity} = this.props;

    let contentWrapperClassName = 'app__content-wrapper';
    if (menuActivity) {
      contentWrapperClassName += ' app__content-wrapper_active';
    }
    return (
      <div>
        <div className='app__navigation'>
          <Navigation/>
        </div>
        <div className={contentWrapperClassName}>
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
}

const mapStateToProps = ({menuActivity}) => ({menuActivity});

const mapDispatchToProps = {activationMenu: activationMenu};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(App));
