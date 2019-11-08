import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import "./header.scss"
import {activationMenu} from "../../actions";
import {connect} from "react-redux";

class Header extends Component {
  render() {
    const {menuActivity} = this.props;

    let titleClassName = 'header__title';
    if (menuActivity) {
      titleClassName += ' header__title_active';
    }

    return (
      <header className='header'>
        <h1 className={titleClassName}>
          <Link to='/' className='header__link'>
            <FontAwesomeIcon icon={faCoins} className='header__icon'/>
            LastCoin
          </Link>
        </h1>
      </header>
    );
  };
}

const mapStateToProps = ({menuActivity}) => ({menuActivity});

const mapDispatchToProps = {activationMenu: activationMenu};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
