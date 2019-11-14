import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faDollarSign} from '@fortawesome/free-solid-svg-icons';

const ExchangeRates = ({exchangeRates}) => {
  const {eurER, usdER} = exchangeRates;
  const moneyFormat = (value) => {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
  };

  return (
    <div className='cash-account'>
      <h3 className='cash-account__title'>
        Exchange rates
      </h3>
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
