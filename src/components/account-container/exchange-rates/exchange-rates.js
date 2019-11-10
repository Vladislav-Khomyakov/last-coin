import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faDollarSign, faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons';

const ExchangeRates = ({exchangeRates}) => {
  const {eurER, usdER} = exchangeRates;
  const moneyFormat = (value) => {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
  };

  return (
    <div className='cash-account'>
      <div className='cash-account__title'>
        <div className='cash-account__icon cash-account__icon_card'>
          <FontAwesomeIcon icon={faMoneyBillWaveAlt} size="2x"/>
        </div>
        <p className='cash-account__label'>
          Exchange rates
        </p>
      </div>
      <div>
        <ul className='cash-account__list'>
          <li className='cash-account__item'>
              <span>
                <FontAwesomeIcon icon={faEuroSign} className='cash-account__currency-icon'/>
                {moneyFormat(Math.round(eurER * 100) / 100)}
              </span>
            <span className='cash-account__line'> </span>
          </li>
          <li className='cash-account__item'>
              <span>
                <FontAwesomeIcon icon={faDollarSign} className='cash-account__currency-icon'/>
                {moneyFormat(Math.round(usdER * 100) / 100)}
              </span>
            <span className='cash-account__line'> </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExchangeRates;
