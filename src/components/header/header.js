import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import "./header.scss"

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <Link to='/' className='header__link'>
          <FontAwesomeIcon icon={faCoins} className='header__icon'/>
          LastCoin
        </Link>
      </h1>
    </header>
  );
};

export default Header;
