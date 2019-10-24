import React from 'react';
import {Link} from 'react-router-dom';
import "./header.scss"
import Navigation from "../navigation/navigation";

const Header = () => {
    return (
        <header className='header'>
            <h1 className='header__title'>
                <Link to='/' className='header__link'>
                    LastCoin
                </Link>
            </h1>
            <Navigation />
        </header>
    );
};

export default Header;
