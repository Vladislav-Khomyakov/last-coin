import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRubleSign, faEuroSign, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import "./cash-account.scss";

const CashAccount = ({cardCash}) => {
  const {rubCardCash, eurCardCash, usdCardCash} = cardCash;
  const moneyFormat = (value) => {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
  };

  return (
    <div className='cash-account'>
      <h3 className='cash-account__title'>
        Card
      </h3>
      <div>
        <ul className='cash-account__list'>
          <li className='cash-account__item'>
            <span>
              <FontAwesomeIcon icon={faRubleSign} className='cash-account__currency-icon'/>
              {moneyFormat(rubCardCash)}
            </span>
            <span className='cash-account__line'> </span>
          </li>
          <li className='cash-account__item'>
            <span>
              <FontAwesomeIcon icon={faEuroSign} className='cash-account__currency-icon'/>
              {moneyFormat(eurCardCash)}
            </span>
            <span className='cash-account__line'> </span>
          </li>
          <li className='cash-account__item'>
            <span>
              <FontAwesomeIcon icon={faDollarSign} className='cash-account__currency-icon'/>
              {moneyFormat(usdCardCash)}
            </span>
            <span className='cash-account__line'> </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CashAccount;
