import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle, faReceipt, faChartBar} from "@fortawesome/free-solid-svg-icons";
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
          <ul className='nav__list'>
            <li className='nav__item'>
              <div className="nav__icon-container">
                <FontAwesomeIcon icon={faUserCircle} className='nav__icon'/>
              </div>
              <Link to='/account' className='nav__link'>
                Account
              </Link>
            </li>
            <li className='nav__item'>
              <div className="nav__icon-container">
                <FontAwesomeIcon icon={faReceipt} className='nav__icon'/>
              </div>
              <Link to='/transactions' className='nav__link'>
                Transactions
              </Link>
            </li>
            <li className='nav__item'>
              <div className="nav__icon-container">
                <FontAwesomeIcon icon={faChartBar} className='nav__icon'/>
              </div>
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
