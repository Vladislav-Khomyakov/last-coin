import React, {Component} from 'react';
import withLastcoinService from "../hoc/withLastcoinService";
import {connect} from "react-redux";
import './account-container.scss';
import {fetchProfile, fetchExchangeRates} from "../../actions";
import Spinner from "../spinner";
import CashAccount from "../cash-account";
import UserProfile from "../user-profile";
import ExchangeRates from "../exchange-rates";

class AccountContainer extends Component {
  componentDidMount() {
    this.props.fetchProfile(1);
    this.props.fetchExchangeRates();
  };

  render() {
    const {profile, exchangeRates, loading} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <>
        <UserProfile
          profile={profile}/>
        <div className="account-container">
          <CashAccount
            profile={profile}/>
          <ExchangeRates
            exchangeRates={exchangeRates}/>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({profile, loading, exchangeRates}) => {
  return {profile, loading, exchangeRates};
};

const mapDispatchToProps = (dispatch, {lastcoinService}) => {
  return {
    fetchProfile: fetchProfile(lastcoinService, dispatch),
    fetchExchangeRates: fetchExchangeRates(lastcoinService, dispatch)
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(AccountContainer));
