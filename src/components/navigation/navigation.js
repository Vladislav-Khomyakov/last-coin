import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle, faReceipt, faChartBar, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import './navigation.scss'
import {activationMenu} from "../../actions";

class Navigation extends Component {
  onNavButtonClick = () => {
    this.props.activationMenu();
  };

  render() {
    const {menuActivity} = this.props;

    let spanClassNames = 'nav__burger-button_span';
    let navClassNames = 'nav';
    let burgerButtonClassNames = 'nav__burger-button';
    if (menuActivity) {
      spanClassNames += ' nav__burger-button_span-active';
      navClassNames += ' nav_active';
      burgerButtonClassNames += ' nav__burger-button_active';
    }

    return (
      <nav className={navClassNames}>
        <div className='nav__burger-menu'>
          <button
            className={burgerButtonClassNames}
            onClick={this.onNavButtonClick}>
            <span className={spanClassNames}> </span>
          </button>
        </div>
        <div className="nav__menu">
          <div className='nav__avatar'>
            <FontAwesomeIcon icon={faUserAstronaut} size="7x" className='nav__avatar_icon'/>
          </div>
          <ul className='nav__list'>
            <li className='nav__item'>
              <span className='nav__space'> </span>
              <FontAwesomeIcon icon={faUserCircle} className='nav__icon'/>
              <Link to='/account' className='nav__link'>
                Account
              </Link>
            </li>
            <li className='nav__item'>
              <FontAwesomeIcon icon={faReceipt} className='nav__icon'/>
              <Link to='/transactions' className='nav__link'>
                Transactions
              </Link>
            </li>
            <li className='nav__item'>
              <FontAwesomeIcon icon={faChartBar} className='nav__icon'/>
              <Link to='/history' className='nav__link'>
                History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
}

const mapStateToProps = ({menuActivity}) => ({menuActivity});

const mapDispatchToProps = {activationMenu: activationMenu};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
