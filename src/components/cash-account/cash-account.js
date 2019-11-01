import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faRubleSign, faEuroSign, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import "./cash-account.scss";

const CashAccount = ({profile}) => {
  const {rubCardCash, eurCardCash, usdCardCash} = profile;

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

export default CashAccount;


/*
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faRubleSign, faEuroSign, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import "./cash-account.scss";
import withLastcoinService from '../hoc/withLastcoinService';
import LastcoinService from "../../services/lastcoin-service";
import {fetchProfile} from '../../actions'

class CashAccount extends Component {

  componentDidMount() {
    this.props.fetchProfile(1);
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

const mapDispatchToProps = (dispatch, {lastcoinService}) => {
  return {
    fetchProfile: fetchProfile(lastcoinService, dispatch)
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(CashAccount));
*/
