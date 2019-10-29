import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faRubleSign, faEuroSign, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import "./cash-account.scss";
import withLastcoinService from '../hoc/withLastcoinService';

class CashAccount extends Component {

  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getPersonCashAccount(1)
      .then((data) => {
        this.props.cashAccountLoaded(data);
      });
  };

  render() {
    const {rubCardCash, eurCardCash, usdCardCash} = this.props.profile;

    return (
      <div className='cash-account'>
        <div className='cash-account__item'>
          <div className='cash-account__icon cash-account__icon_card'>
            <FontAwesomeIcon icon={faCreditCard} size="2x"/>
          </div>
          <div>
            <h3 className='cash-account__title'>Card</h3>
            <ul className='cash-account__list'>
              <li>
                <span>
                  <FontAwesomeIcon icon={faRubleSign}/>
                  {rubCardCash}
                </span>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEuroSign}/>
                  {eurCardCash}
                </span>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faDollarSign}/>
                  {usdCardCash}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cashAccountLoaded: (newProfile) => {
      dispatch({
        type: 'FETCH_CASH_ACCOUNT_SUCCESS',
        payload: newProfile
      })
    }
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(CashAccount));
