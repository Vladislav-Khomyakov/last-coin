import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faDollarSign, faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons';

const ExchangeRates = ({exchangeRates}) => {
  const {eurER, usdER} = exchangeRates;

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
                <FontAwesomeIcon icon={faEuroSign} className='cash-account__currency-icon'/>
                {Math.round(eurER * 100) / 100}
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faDollarSign} className='cash-account__currency-icon'/>
                {Math.round(usdER * 100) / 100}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
