import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faDollarSign, faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons';
import withLastcoinService from '../hoc/withLastcoinService';

class ExchangeRates extends Component {

  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getExchangeRates().then((data) => {
      this.props.exchangeRatesLoaded(data);
    });
  };

  render() {
    const {eurER, usdER} = this.props.exchangeRates;

    return (
      <div className='cash-account'>
        <div className='cash-account__item'>
          <div className='cash-account__icon cash-account__icon_card'>
            <FontAwesomeIcon icon={faMoneyBillWaveAlt} size="2x"/>
          </div>
          <div>
            <h3 className='cash-account__title'>Exchange rates</h3>
            <ul className='cash-account__list'>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEuroSign}/>
                  {Math.round(eurER * 100) / 100}
                </span>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faDollarSign}/>
                  {Math.round(usdER * 100) / 100}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    exchangeRates: state.exchangeRates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    exchangeRatesLoaded: (newExchangeRates) => {
      dispatch({
        type: 'FETCH_EXCHANGE_RATES_SUCCESS',
        payload: newExchangeRates
      })
    }
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(ExchangeRates));
