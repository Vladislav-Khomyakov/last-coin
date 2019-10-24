import React from "react";
import './account.scss'
import CashAccount from "../cash-account/cash-account";
import ExchangeRates from "../exchange-rates/exchange-rates";

const AccountPage = () => {
    return (
        <div className='account-page'>
            <CashAccount />
            <ExchangeRates />
        </div>
    )
};

export default AccountPage;
