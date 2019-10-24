import React from "react";
import {Link} from 'react-router-dom';
import './navigation.scss'

const Navigation = () => {
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li className='nav__item'>
                    <Link to='/account' className='nav__link'>
                        Account
                    </Link>
                </li>
                <li className='nav__item'>
                    <Link to='/transactions' className='nav__link'>
                        Transactions
                    </Link>
                </li>
                <li className='nav__item'>
                    <Link to='/overview' className='nav__link'>
                        Overview
                    </Link>
                </li>
                <li className='nav__item'>
                    <Link to='/profile' className='nav__link'>
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
