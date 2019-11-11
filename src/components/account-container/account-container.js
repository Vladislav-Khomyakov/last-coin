import React, {Component} from 'react';
import withLastCoinServices from "../hoc/withLastCoinServices";
import {connect} from "react-redux";
import './account-container.scss';
import {fetchProfile, fetchExchangeRates} from "../../actions";
import Spinner from "../spinner";
import CashAccount from "./cash-account";
import UserProfile from "./user-profile";
import ExchangeRates from "./exchange-rates";

class AccountContainer extends Component {
  componentDidMount() {
    this.props.fetchProfile(1);
    this.props.fetchExchangeRates();
  };

  render() {
    const {profile, exchangeRates, loading} = this.props;
    const cardCash = {
      rubCardCash: profile.rubCardCash,
      eurCardCash: profile.rubCardCash / exchangeRates.eurER,
      usdCardCash: profile.rubCardCash / exchangeRates.usdER
    };

    if (loading) {
      return <Spinner/>
    }

    return (
      <>
        <UserProfile
          profile={profile}/>
        <div className="account-container">
          <CashAccount
            cardCash={cardCash}/>
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

const mapDispatchToProps = (dispatch, {lastCoinServiceRequest}) => {
  return {
    fetchProfile: fetchProfile(lastCoinServiceRequest, dispatch),
    fetchExchangeRates: fetchExchangeRates(lastCoinServiceRequest, dispatch)
  };
};

export default withLastCoinServices()(connect(mapStateToProps, mapDispatchToProps)(AccountContainer));
