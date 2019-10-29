import React from "react";
import './account-page.scss'
import CashAccount from "../cash-account/cash-account";
import ExchangeRates from "../exchange-rates/exchange-rates";
import UserProfile from "../user-profile";

const AccountPage = () => {
  return (
    <div>
      <UserProfile/>
      <div className='account-page'>
        <CashAccount/>
        <ExchangeRates/>
      </div>
    </div>
  )
};

export default AccountPage;
